import React from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../lib/atom/songAtom'
import useSpotify from './useSpotify'

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentTrackid, setCurrentTrackid] =
    useRecoilState(currentTrackIdState)

  const [songInfo, setSongInfo] = React.useState(null)

  React.useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackid) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackid}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())
        setSongInfo(trackInfo)
      }
    }

    fetchSongInfo()
  }, [currentTrackid, spotifyApi])

  return songInfo
}

export default useSongInfo
