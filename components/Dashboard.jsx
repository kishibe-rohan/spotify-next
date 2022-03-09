import SpotifyWebApi from 'spotify-web-api-node'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Rightbar from './Rightbar'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID
})

function Dashboard() {
  return (
    <main>
     <Sidebar/>
     <Feed spotifyApi={spotifyApi}/>
     <Rightbar/>
    </main>
  )
}

export default Dashboard