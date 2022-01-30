import React from 'react'
import { useRecoilState } from 'recoil'
import useSpotify from '../../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../../lib/atom/songAtom'
import { millisToMinutesAndSeconds } from '../../lib/time'

interface SongProps {
  order: any
  trackProp: any
}
/* single song component */
const Song: React.FC<SongProps> = ({ order, trackProp }) => {
  const spotifyApi = useSpotify()
  const [currentTrackid, setCurrentTrackid] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackid(trackProp.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [trackProp.track.uri],
    })
  }

  const imgUrl = trackProp.track.album.images[0].url as string
  const SN: number = order

  return (
    <div
      onClick={playSong}
      className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900"
    >
      <div className="flex flex-row items-center space-x-4 py-3">
        <p className="">{SN}</p>
        <img src={imgUrl} alt="" className="h-10 w-10" />
        <div className="">
          <p className="w-36 truncate text-white lg:w-64">
            {trackProp?.track.name}
          </p>
          <p className="w-40">{trackProp.track.artists[0].name}</p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{trackProp.track.album.name}</p>
        <p className="">
          {millisToMinutesAndSeconds(trackProp.track.duration_ms)}
        </p>
      </div>
    </div>
  )
}

export default Song
