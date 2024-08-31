import { useState } from 'react'
import './Video.css'

export const Video = (props: { link: string }) => {
  const { link } = props
  const [ytLink, setytLink] = useState(
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  )

  if (link) {
    setytLink(link)
  }

  return (
    <div className="videoContainer">
      <iframe
        width="560"
        height="315"
        src={ytLink.replace('watch?v=', 'embed/')}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}
