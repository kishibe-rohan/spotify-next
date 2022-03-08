import Head from 'next/head'
import Image from 'next/image'

import Dashboard from '../components/Dashboard'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Spotify - Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />
    </div>
  )
}

export default Home
