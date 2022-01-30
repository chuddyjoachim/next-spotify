import {
  ReplyIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline'
import {
  RewindIcon,
  PauseIcon,
  PlayIcon,
  FastForwardIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid'
import { debounce } from 'lodash'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import useSongInfo from '../../hooks/useSongInfo'
import useSpotify from '../../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../../lib/atom/songAtom'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()

  const [currentTrackid, setCurrentTrackid] =
    useRecoilState<any>(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const [volume, setVolume] = React.useState(50)

  const songInfo: any = useSongInfo()

  const fetchCurrentSongs = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackid(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  React.useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackid) {
      // fetch songs
      fetchCurrentSongs()
      setVolume(50)
    }
  }, [currentTrackid, spotifyApi, session])

  //   playPause fn
  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause()
        setIsPlaying(false)
      } else {
        spotifyApi.play()
        setIsPlaying(true)
      }
    })
  }

  React.useEffect(() => {
    if (volume > 0 && volume < 100) {
        debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = React.useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
      })
    }, 500),
    []
  )

  return (
    <>
      <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-sm text-white md:px-8 md:text-base">
        {/* left */}
        <div className="flex flex-row items-center space-x-4">
          <img
            className="hidden h-10 w-10 md:inline"
            src={songInfo?.album?.images?.[0]?.url as string}
            alt=""
          />
          <div className="">
            <h3 className="">{songInfo?.name}</h3>
            <p className="">{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>
        {/* center */}
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="hidden md:inline button" />
          <RewindIcon className="button" />

          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button h-10 w-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button h-10 w-10" />
          )}

          <FastForwardIcon className="button" />

          <ReplyIcon className="hidden md:inline button" />
        </div>

        {/* right */}
        <div className="flex px-3 items-center justify-end space-x-3 md:space-x-4">
          <VolumeDownIcon
            className="button"
            onClick={() => {
              volume > 0 && setVolume(volume - 10)
            }}
          />
          <input
            type="range"
            name="volume range"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            id=""
            min={0}
            max={100}
          />
          <VolumeUpIcon
            className="button"
            onClick={() => {
              volume < 100 && setVolume(volume + 10)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Player
