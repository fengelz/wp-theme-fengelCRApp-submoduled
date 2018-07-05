import React from 'react'
import Html from '../../atoms/Html'
import Head from '../../atoms/Head'
import Body from '../../atoms/Body'

function MastePage(props) {
  return (
    <Html>
      {`<!--<?php
        /**
         * The main template file
         *
         * This is the most generic template file in a WordPress theme
         * and one of the two required files for a theme (the other being style.css).
         * It is used to display a page when nothing more specific matches a query.
         * E.g., it puts together the home page when no home.php file exists.
         *
         * @link https://codex.wordpress.org/Template_Hierarchy
         *
         * @package WordPress
         * @subpackage Twenty_Seventeen
         * @since 1.0
         * @version 1.0
         */
      ?>-->`}
      <Head title={props.title} />
      <Body className={props.className || ''}>
        { props.children }
      </Body>
    </Html>
  )
}

export default MastePage