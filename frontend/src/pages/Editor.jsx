import React, { useEffect, useState } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import { default as MonacoEditor } from '@monaco-editor/react'; // Renamed to avoid conflict
import { MdLightMode } from "react-icons/md";
import { AiOutlineExpandAlt } from "react-icons/ai";

const Editor = () => {
  const [tab, setTab] = useState("html")
  const [isLightMode, setIsLightMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const changeTheme = () => {
    if (isLightMode) {
      document.querySelector('.EditorNavbar').style.background = "#141414";
      document.body.classList.remove("lightMode");
      setIsLightMode(false);
    } else {
      document.querySelector('.EditorNavbar').style.background = "#f4f4f4";
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
    iframe.srcdoc = html + css + js
  }

  useEffect(() => {
    setTimeout(() => {
      run();
    }, 200)
  }, [htmlCode, cssCode, jsCode])


  return (
    <>
      <EditorNavbar />
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
                <MonacoEditor onChange={(e) => {
                  setHtmlCode(e)
                  run()
                }} height="81vh" theme={isLightMode ? "vs-light" : "vs-dark"} language="html" value={htmlCode} />
              </> : tab == "css" ?
                <>
                  <MonacoEditor onChange={(e) => {
                    setCssCode(e)
                    run()
                  }} r height="81vh" theme={isLightMode ? "vs-light" : "vs-dark"} language="css" value={cssCode} />
                </> : <>
                  <MonacoEditor onChange={(e) => {
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

export default Editor;
