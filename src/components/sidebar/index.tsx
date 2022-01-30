import React from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../../lib/atom/playlistAtom'

const SideBar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = React.useState<
    SpotifyApi.PlaylistObjectSimplified[] | []
  >([])
  const [playlistId, SetPlaylistId] = useRecoilState(playlistIdState)

  React.useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])
  return (
    <>
      <div className="scrollbar-hide hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 pb-36 text-xs text-gray-500 sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
        <div className="space-y-4">
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 hover:text-white"
          >
            <LogoutIcon className="h-5 w-5" />
            <p>Logout</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <LibraryIcon className="h-5 w-5" />
            <p>My Library</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />
          <button className="flex items-center space-x-2 hover:text-white">
            <PlusCircleIcon className="h-5 w-5" />
            <p>Create Playlist</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <HeartIcon className="h-5 w-5 text-blue-500" />
            <p>Liked Songs</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <RssIcon className="h-5 w-5 text-green-500" />
            <p>Your episodes</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />
          {/* playlist */}
          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              onClick={(_) => SetPlaylistId(playlist.id)}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}

export default SideBar
