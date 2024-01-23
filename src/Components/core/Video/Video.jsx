import React from 'react'
import { useState } from 'react'
import "./Video.css"

const Video = ({ link }) => {
  const [ytLink, setytLink] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

  if (link) {
    setytLink(link);
  }

  return (
    <div class='videoContainer'>
      <iframe 
        width="560" 
        height="315" 
        src={ytLink.replace('watch?v=', 'embed/')} 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen>
      </iframe>
    </div>
  )
}

export default Video