import React from 'react'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { BuiltInProviderType } from 'next-auth/providers'

type provider = {
  callbackUrl: string
  id: string
  name: string
  signinUrl: string
  type: string
}

interface props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}

const login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const pro = Object.values(providers)
  return (
    <>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center
      bg-black"
      >
        <img
          className="mb-5 w-52"
          src="https://links.papareact.com/9xl"
          alt=""
        />

        <div className="">
          {pro.map((provider: any) => {
            return (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  className="rounded-full bg-[#18D860] p-5 text-white"
                >
                  Login with {''}
                  {provider.name}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

// http://localhost:3000/api/auth/callback/spotify

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default login
