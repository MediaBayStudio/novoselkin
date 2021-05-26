<?php
$section_title = $section['sect_title'];
$btn_text = $section['btn_text'];
$btn_target = $section['btn_target'];
$gallery = parse_gallery( $section['gallery'] ) ?>
<section<?php echo $gallery['data-src'] . $gallery['data-media'] ?> class="about-hero container lazy">
  <h1 class="about-hero__title"><span class="about-hero__title-text"><?php echo $section_title ?></span></h1> <?php
  if ( $btn_text && $btn_target ) : ?>
    <button type="button" class="about-hero__btn btn btn_red" data-target="#<?php echo $btn_target ?>" id='about-hero-btn'><?php echo $btn_text ?></button> <?php
  endif ?>
</section>