import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { PhotographIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistState } from '../../lib/atom/playlistAtom'
import useSpotify from '../../hooks/useSpotify'
import Songs from '../songs'

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
  const spotifyApi = useSpotify()

  const [color, setColor] = React.useState<string | null>(null)

  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState)


  React.useEffect(() => {
    setColor(() => {
      return shuffle(colors).pop()!
    })
  }, [playlistId])

  React.useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => {
      })
  }, [spotifyApi, playlistId])


  return (
    <>
      <div className="scrollbar-hide h-screen flex-grow overflow-y-scroll">
        <header className="absolute top-5 right-8">
          <div className="flex items-center space-x-3 rounded-full bg-black p-1 pr-2 text-sm text-white opacity-90 hover:opacity-80 ">
            {imageUrl ? (
              <img
                className="h-10 w-10 rounded-full"
                src={imageUrl}
                alt="user image"
              />
            ) : (
              <PhotographIcon className="h-5 w-5 rounded-full" />
            )}
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>
        <section
          className={`flex h-80 w-full items-end space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
        >
          <img
            className="h-44 w-44 shadow-2xl"
            src={playlist?.images?.[0]?.url}
            alt=""
          />
          <div className="">
            <p className="">PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl">{playlist?.name}</h1>
          </div>
        </section>
        {/* songs */}
        <div className="">
          <Songs />
        </div>
      </div>
    </>
  )
}

export default Center
