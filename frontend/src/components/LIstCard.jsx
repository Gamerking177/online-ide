import React, { useState } from 'react'
import img from '../images/code.png'
import deleteimg from '../images/delete.png'

const LIstCard = () => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false)
  return (
    <>
      <div className="listCard mb-2 w-[full] flex items-center justify-between p-[10px] bg-[#141414] rounded-lg cursor-pointer hover:bg-[#202020]">
        <div className='flex items-center gap-2'>
          <img className='w-[80px]' src={img} alt="" />
          <div>
            <h3 className='text-[20px]'>My first project</h3>
            <p className='text-[gray] text-[14px]'>Created in 11 Nov 2024</p>
          </div>
        </div>
        <div className='w-[20px] cursor-pointer mr-4'>
          <img onClick={() => { setIsDeleteModelShow(true) }} src={deleteimg} alt="" />
        </div>
      </div>

      {
        isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[35vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl'>Do you want to delete <br /> this project</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={() => {setIsDeleteModelShow(false)}} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div> : ""
      }
    </>
  )
}

export default LIstCard