import React from 'react'

const Poster = ({track}) => {
  return (
    <div className='w-[260px] h-[360px] rounded-[50px] overflow-hidden relative  text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-auto group mx-auto '>
      <img src={track.albumUrl} alt="" className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"/>
      <div className='absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5'>
        <div className='text-[15px]'>
          <h4 className="font-extrabold truncate w-44">{track.title}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  )
}

export default Poster
