import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import logo from '../images/logo.png'
import { MdLightMode } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";
import { api_base_url, toggleClass } from '../helper';

const NavBar = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user)
      } else {
        setError(data.message)
      }
    })
  }, [])

  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
          <img className='w-[150px] cursor-pointer' src={logo} alt="" />
        </div>
        <div className="links flex items-center gap-2">
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact Us</Link>
          <Link>Serices</Link>
          <Avatar onClick={() => toggleClass(".dropDownNavbar", "hidden")} className='cursor-pointer ml-2' name={data ? data.name : ""} size="50" round="50%" />
        </div>
        <div className="dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#1A1919] w-[150px] h-[160px]">
          <div className='py-[10px] border-b-[1px] border-b-[#fff]'>
            <h3 className='text-[17px]' style={{ lineHeight: 1 }}>Aksh</h3>
          </div>
          <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><MdLightMode className='text-[20px]' /><p>Light Mode</p></i>
          <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><BsFillGridFill className='text-[20px]' /><p>Toogle Grid</p></i>
        </div>
      </div>
    </>
  )
}

export default NavBar
