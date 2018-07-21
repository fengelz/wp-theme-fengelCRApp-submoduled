import React from 'react'

function Head(props) {
  return (
    <head>
      <meta charSet={`<?php bloginfo('charset'); ?>`} />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{`<?php bloginfo('name'); ?><?php wp_title(); ?>`}</title>
      <meta name="description" content={'test'} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="manifest" href="site.webmanifest" />
      <link rel="apple-touch-icon" href="icon.png" />
      <meta property="og:title" content="The Rock" />
      <meta property="og:type" content="video.movie" />
      <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
      <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      {'<!-- inject:css --><!-- endinject -->'}
      { props.children }
    </head>
  )
}

export default Head

