import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../../lib/atom/playlistAtom'
import Song from './song'

const Songs = () => {
  const playlist: any = useRecoilValue(playlistState)
  return (
    <>
      <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
        {playlist?.tracks.items.map((track: any, i: any) => (
          <Song key={track.track.name} trackProp={track} order={i + 1} />
        ))}
      </div>
    </>
  )
}

export default Songs
