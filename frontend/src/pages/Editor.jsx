import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EditiorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react'; // Renamed to avoid conflict
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { api_base_url } from '../helper';

const Editior = () => {
  let {projectId} = useParams()
  

  const [tab, setTab] = useState("html")
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const changeTheme = () => {
    const editiornavbar = document.querySelector('.EditiorNavbar')
    if (isLightMode) {
      editiornavbar.style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      editiornavbar.style.background = "#f4f4f4";
      document.body.classList.add("lightMode");
      setIsLightMode(true);
    }
  }

  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>")
  const [cssCode, setCssCode] = useState("body { color: red; }")
  const [jsCode, setJsCode] = useState("console.log('Hello World')")

  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`
    const js = `<script>${jsCode}</script>`
    const iframe = document.getElementById("iframe")
    if (iframe) {
      iframe.srcdoc = html + css + js
    }
  }

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200)
  }, [htmlCode, cssCode, jsCode])

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projId: projectId,
      })
    }).then(res => res.json()).then(data => {
      setHtmlCode(data.project.htmlCode);
      setCssCode(data.project.cssCode);
      setJsCode(data.project.jsCode);
    })
  }, [projectId])
  

  return (
    <>
      <EditiorNavbar />
      <div className='flex'>
        <div className={`left ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className='tabs flex items-center justify-between gap-2 w-full bg-[#1A1919] h-[50px] px-[40px]'>
            <div className='tabs flex items-center gap-2'>
              <div onClick={() => setTab("html")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">HTML</div>
              <div onClick={() => setTab("css")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">CSS</div>
              <div onClick={() => setTab("js")} className="tab cursor-pointer p-[6px] bg-[#1E1E1E] px-[10px] text-[15px]">JAVASCRIPT</div>
            </div>
            <div className='flex items-center gap-2'>
              <i className='text-[20px] cursor-pointer' onClick={changeTheme}><MdLightMode /></i>
              <i className='text-[20px] cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}><AiOutlineExpandAlt /></i>
            </div>
          </div>
          {
            tab == "html" ?
              <>
                <Editor onChange={(e) => {
                  setHtmlCode(e)
                  run()
                }} height="81vh" theme={isLightMode ? "vs-light" : "vs-dark"} language="html" value={htmlCode} />
              </> : tab == "css" ?
                <>
                  <Editor onChange={(e) => {
                    setCssCode(e)
                    run()
                  }} r height="81vh" theme={isLightMode ? "vs-light" : "vs-dark"} language="css" value={cssCode} />
                </> : <>
                  <Editor onChange={(e) => {
                    setJsCode(e)
                    run()
                  }} r height="81vh" theme={isLightMode ? "vs-light" : "vs-dark"} language="javascript" value={jsCode} />
                </>
          }
        </div>
        <iframe id='iframe' className={`${isExpanded ? "hidden" : "w-1/2"} min-h-[81vh] bg-[#fff] text-black`}></iframe>
      </div>
    </>
  );
};

export default Editior;
