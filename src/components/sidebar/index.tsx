import React from 'react'
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../../hooks/useSpotify'

const SideBar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = React.useState<
    SpotifyApi.PlaylistObjectSimplified[] | []
  >([])
  const [playlistId, SetPlaylistId] = React.useState<string | null>(null)

  console.log({playlistId});
  

  React.useEffect(() => {
    console.log({ access: spotifyApi.getAccessToken() })

    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        // const items = data.body.items
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])
  console.log(playlists)
  return (
    <>
      <div className="h-screen overflow-y-scroll border-r border-gray-900 p-5 text-sm text-gray-500 scrollbar-hide">
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
            <HeartIcon className="h-5 w-5" />
            <p>Liked Songs</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-white">
            <RssIcon className="h-5 w-5" />
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
