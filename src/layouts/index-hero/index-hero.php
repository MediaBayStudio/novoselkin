<?php
$section_title = $section['sect_title'];
$marked_title = $section['marked_title'];
$list = $section['list'];
$gallery = $section['gallery'] ?>
<section class="index-hero container">
  <picture class="index-hero__pic"> <?php

  foreach ( $gallery as $img ) {
      $img_title = $img['title'];

      if ( $webp_support ) {
        $url = str_replace( '.jpg', '.webp', $img['url'] );
        $type = 'webp';
      } else {
        $url = $img['url'];
        $type = 'jpeg';
      }

      $src_tag = '<source type="image/' . $type . '" media="';

      if ( strpos( $img_title, '1920' ) !== false ) {
        $src_tag .= '(min-width:1439.98px) and (max-width:1919.98px)" srcset="' . $url . '">';
        $src_1920 = $src_tag;
      } else if ( strpos( $img_title, '768' ) !== false ) {
        $src_tag .= '(min-width:575.98px) and (max-width:767.98px)" srcset="' . $url . '">';
        $src_768  = $src_tag;
      } else if ( strpos( $img_title, '1024' ) !== false ) {
        $src_tag .= '(min-width:767.98px) and (max-width:1023.98px)" srcset="' . $url . '">';
        $src_1024 = $src_tag;
      } else if ( strpos( $img_title, '1440' ) !== false ) {
        $src_tag .= '(min-width:1023.98px) and (max-width:1439.98px)" srcset="' . $url . '">';
        $src_1440 = $src_tag;
      } else if ( strpos( $img_title, '2560' ) !== false ) {
        $src_tag .= '(min-width:1919.98px)" srcset="' . $url . '">';
        $src_2560 = $src_tag;
      } else {
        $img_tag = '<img src="' . $url . '" alt="#" class="index-hero__img">';
      }

    }
    echo $src_768;
    echo $src_1024;
    echo $src_1440;
    echo $src_1920;
    echo $src_2560;
    echo $img_tag ?>
  </picture>
  <h1 class="index-hero__title"><?php echo $section_title; #if ( $marked_title ) echo "<span class=\"index-hero__title-marked\">" . $marked_title . "</span>" ?></h1>
  <ul class="index-hero__ul"> <?php
    foreach ( $list as $li ) : ?>
      <li class="index-hero__li">• <?php echo $li['li'] ?></li> <?php
    endforeach ?>
  </ul>
  <button type="button" class="index-hero__btn btn btn_white">Рассчитать</button>
</section>