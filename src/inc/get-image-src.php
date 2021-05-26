<?php
// Проверяет на существование такого же файла в webp и вставляет
function get_image_src( $img_object=null ) {
  global $webp_support, $extname_regExp;

  $img_id = $img_object['ID'];
  $img_url = $img_object['url'];
  $img_path = get_attached_file( $img_id );

  if ( $webp_support ) {
    $img_webp_path = preg_replace( $extname_regExp, 'webp', $img_path );
    $webp_exists = file_exists( $img_webp_path );
  }

  if ( $webp_exists ) {
    $img_url = preg_replace( $extname_regExp, 'webp', $img_url );
  }

  return $img_url;
}