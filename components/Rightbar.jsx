import {useState,useEffect} from 'react'
import { useSession } from "next-auth/react";

import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";

import Profile from './Profile'

const Rightbar = ({spotifyApi}) => {

  const {data:session} = useSession();
  const {accessToken} = session;
  const [recentlyPlayed,setRecentlyPlayed] = useState([]);

  //fetch recently played tracks
  useEffect(() => {
    if(!accessToken)
    return;

    spotifyApi.getMyRecentlyPlayedTracks({limit:20}).then((res) => {
      setRecentlyPlayed(
        res.body.items.map(({track}) => {
          return{
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
          }
        })
      )
    })
  },[accessToken])

  return (
    <section className="p-4 space-y-8 pr-8">
      <div className="flex space-x-2 items-center justify-between">
        {/*Icons*/}
        <div className="flex items-center space-x-4 border-2 border-[#262626] rounded-full h-12 py-3 px-4">
          <HiOutlineShieldCheck className='text-[#CCCCCC] text-xl'/>
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <div>
            <BiBell className="text-[#CCCCCC] text-xl" />
          </div>
        </div>
        <Profile/>
      </div>

      {/* Recently Played */}
      
    </section>
  )
}

export default Rightbar
