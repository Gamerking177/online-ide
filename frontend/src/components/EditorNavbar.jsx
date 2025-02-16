import React from 'react'
import logo from '../images/logo.png'
import { FiDownload } from "react-icons/fi";
import { Link } from 'react-router-dom';

const EditiorNavbar = () => {
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="h-[50px]" />
          </Link>
        </div>
        <p>File / <span className='text-[gray]'>My first project</span></p>
        <i className='p-[8px] bg-black rounded-[5px] text-[20px]'><FiDownload /></i>
      </div>
    </>
  )
}

export default EditiorNavbar
