import React from 'react';

function LinkifyText({ text }) {
  // Regular expression to match URLs
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // Split the text into parts based on URL matches
  const parts = text.split(urlPattern);

  // Map the parts to render either text or clickable links
  const renderedText = parts.map((part, index) => {
    if (part.match(urlPattern)) {
      // It's a URL, render it as a clickable link
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    } else {
      // It's regular text, render it as-is
      return <span key={index}>{part}</span>;
    }
  });

  return <div>{renderedText}</div>;
}

export default LinkifyText;