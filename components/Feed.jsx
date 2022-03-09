import {useSession} from 'next-auth/react'
import { useState,useEffect } from 'react';
import Search from './Search'
import Poster from './Poster'

const Feed = ({spotifyApi}) => {

    const {data:session} = useSession();
    const {accessToken} = session;

    const [search,setSearch] = useState(null);
    const [searchResults,setSearchResults] = useState([]);
    const [newReleases,setNewReleases] = useState([]);

    //set access token
    useEffect(() => {
        if(!accessToken)
        return;

        spotifyApi.setAccessToken(accessToken);
    },[accessToken])

    //fetch search results
    useEffect(() => {
        if(!search) 
        return setSearchResults([]);

        if(!accessToken)
        return;

        let cancel = false;

        spotifyApi.searchTracks(search).then((res) => {
          if(cancel) return;
          setSearchResults(
            res.body.tracks.items.map((track) => {
              return{
                id: track.id,
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: track.album.images[0].url,
                popularity: track.popularity
              }
            })
          )
        })

        return () => (cancel = true);
    },[search,accessToken])

    //fetch new releases
    useEffect(() => {
    if(!accessToken)
    return;

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
            return{
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
            }
        })
      )
    })


    },[accessToken])

  return (
    <section className="bg-black ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <Search search={search} setSearch={setSearch}/>
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
         {
           searchResults.length === 0 ? newReleases.slice(0,4).map((track) => (
             <Poster key={track.id} track={track}/>
           )):searchResults.slice(0,4).map((track) => (
             <Poster key={track.id} track={track}/>
           ))
         }
      </div>

      <div className="flex gapx-8 absolute min-w-full md:relative ml-6">
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex flex-wrap gap-x-2 gap-y-2.5 mb-3">
          <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="text-[#CECECE] bg-[#1A1A1A] text-[13px] py-3.5 px-4 rounded-2xl w-full font-bold bg-opacity-80 hover:bg-opacity-100 transition ease-out">
            All Genres
          </button>
        </div>
      </div>
    </section>
  )
}

export default Feed
