import React from 'react';
import 'semantic-ui-css/semantic.min.css';

function Meetup() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <p>Here is some text to describe the first video.</p>
        </div>
        <div style={{ flex: 1 }}>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/{FIRST_VIDEO_ID}"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <p>Here is some text to describe the second video.</p>
        </div>
        <div style={{ flex: 1 }}>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/{SECOND_VIDEO_ID}"
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Meetup;
