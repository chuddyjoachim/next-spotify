import Head from 'next/head'
import Center from '../src/components/center'
import SideBar from '../src/components/sidebar'

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex'>
        {/* side bar */}
        <SideBar />
        {/* mainscreen */}
        <Center />
      </main>
      {/* <div className="">player</div> */}
    </div>
  )
}
