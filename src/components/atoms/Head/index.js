import React from 'react'

function Head(props) {
  return (
    <head>
      <meta charSet={`<?php bloginfo('charset'); ?>`} />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{`<?php bloginfo('name'); ?><?php wp_title(); ?>`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="manifest" href="site.webmanifest" />
      <link rel="apple-touch-icon" href="icon.png" />
      <meta name="google-site-verification" content="M8QltlH4XIp9dUDuBIrhr7KtHka9d0bYFCw7ZUAxx7s" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      {'<!-- inject:css --><!-- endinject -->'}
      { props.children }
      {`<?php wp_head(); ?>`}
    </head>
  )
}

export default Head

