import SpotifyWebApi from 'spotify-web-api-node'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Rightbar from './Rightbar'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID
})

function Dashboard() {
  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
     <Sidebar/>
     <Feed spotifyApi={spotifyApi}/>
     <Rightbar spotifyApi={spotifyApi}/>
    </main>
  )
}

export default Dashboard