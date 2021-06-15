<?php
$section_title = $section['sect_title'];
$marked_title = $section['marked_title'];
$list = $section['list'];
$gallery = parse_gallery( $section['gallery'] );
$src = preg_replace( '/data-src=\"|\"$/', '', $gallery['data-src'] ) ?>
<section<?php echo $gallery['data-src'] . $gallery['data-media'] ?> class="index-hero container lazy">
  <h1 class="index-hero__title"><?php echo $section_title; if ( $marked_title ) echo "<span class=\"index-hero__title-marked\">" . $marked_title . "</span>" ?></h1>
  <ul class="index-hero__ul"> <?php
    foreach ( $list as $li ) : ?>
      <li class="index-hero__li">• <?php echo $li['li'] ?></li> <?php
    endforeach ?>
  </ul>
  <a href="#calc" class="index-hero__btn btn btn_white">Рассчитать</a>
</section>