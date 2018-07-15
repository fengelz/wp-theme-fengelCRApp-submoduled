import React from 'react'

function Head(props) {
  return (
    <head>
      <meta charSet={`<?php bloginfo('charset'); ?>`} />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{`<?php bloginfo('title'); ?>`}</title>
      <meta name="description" content={'test'} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="manifest" href="site.webmanifest" />
      <link rel="apple-touch-icon" href="icon.png" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      {'<!-- inject:css --><!-- endinject -->'}
      { props.children }
    </head>
  )
}

export default Head

