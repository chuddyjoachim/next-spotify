import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../src/components/center'
import Player from '../src/components/player'
import SideBar from '../src/components/sidebar'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Next Spotify clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/* side bar */}
        <SideBar />
        {/* mainscreen */}
        <Center />
      </main>
      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
