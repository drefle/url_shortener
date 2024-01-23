import {useState } from 'react'
import '../App.css'

export default function Button({urlShort}) {
  const [isClicked,setIsClicked] = useState(false);

  
  function copyLink(link){
    navigator.clipboard.writeText(link);
    setIsClicked(!isClicked);
  }

  return (
    <>
      <button onClick={()=>copyLink(urlShort)} className={`${isClicked && "bg-darkViolet" } font-poppins text-white font-semibold rounded bg-cyan py-2 px-6 hover:bg-[#91e8e8] w-full md:ml-6 md:w-fit md:px-10`}>{isClicked ? "Copied!":"Copy"}</button>
    </>
  )
}