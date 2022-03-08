import Head from 'next/head'
import Image from 'next/image'

import { getProviders, useSession } from 'next-auth/react'

function Signin({ providers }) {
  const { data: session } = useSession()

  return (
    <div className="flex h-screen flex-col items-center space-y-8 bg-black pt-40">
      <Head>
        <title>Login - Spotify Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="rounded-full border border-transparent bg-[#1db954] py-4 px-6 text-xs font-bold uppercase tracking-wider text-white transition duration-300 ease-out hover:scale-105 hover:bg-[#0db146] md:text-base">
            Sign In With {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Signin

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
