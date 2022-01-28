import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { PhotographIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
]

const Center = () => {
  const { data: session, status } = useSession()
  const imageUrl = session?.user.image
  console.log({session: session})
  console.log({user: session?.user})

  const [color, setColor] = React.useState<string | null>(null)

  React.useEffect(() => {
    setColor(() => {
      return shuffle(colors).pop()!
    })
  }, [])

  return (
    <>
      <div className="flex flex-grow ">
        {/* <div className="text-white"> */}
        <header className="absolute top-5 right-8">
          <div className="flex items-center space-x-3 rounded-full bg-red-300 p-1 pr-2 text-white opacity-90 hover:opacity-80 ">
            {imageUrl ? (
              <img
                className="h-10 w-10 rounded-full"
                src={imageUrl}
                alt="imageurl"
              />
            ) : (
              <PhotographIcon className="h-8 w-8 rounded-full" />
            )}
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>
        <section
          className={`h-88 pading-8 flex w-full items-end space-x-7 bg-gradient-to-b ${color} to-black text-white`}
        ></section>
        {/* </div> */}
      </div>
    </>
  )
}

export default Center
