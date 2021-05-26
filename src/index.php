<?php
// Template name: Главная

get_header();

$sections = get_field( 'sections' );

if ( $sections ) {
  foreach ( $sections as $section ) {
    $section_name = $section['acf_fc_layout'];
    require 'template-parts/' . $section_name . '.php';
  }
}

get_footer();