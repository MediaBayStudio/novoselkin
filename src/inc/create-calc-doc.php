<?php

function create_doc() {
  if ( $_POST['action'] === 'create_doc' ) {
    $phpWord = new \PhpOffice\PhpWord\PhpWord();
    var_dump($phpWord);
  }


  if ( $_POST['action'] === 'create_doc' ) {
    die();
  }
}

add_action( 'wp_ajax_nopriv_create_doc', 'create_doc' ); 
add_action( 'wp_ajax_create_doc', 'create_doc' );