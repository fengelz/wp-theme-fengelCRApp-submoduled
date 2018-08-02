<?php 
  function register_my_menu() {
    register_nav_menu('top-menu',__( 'Top Menu' ));
    register_nav_menu('social',__( 'Socials' ));
  }
  add_action( 'init', 'register_my_menu' );
  