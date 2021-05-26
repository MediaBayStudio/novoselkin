<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];
$sect_img_text = $section['img_text'] ?>
<section class="about container">
  <div class="about__text">
    <h2 class="about__title"><?php echo $sect_title ?></h2> <?php
    foreach ( $sect_descr as $p ) : ?>
      <p class="about__descr"><?php echo $p['p'] ?></p> <?php
    endforeach ?>
  </div>
  <div class="about-img-block">
    <img src="#" alt="" data-src="<?php echo $section['img'] ?>" class="about__img lazy">
    <div class="about-img-text">
      <span class="about__number"><?php echo $sect_img_text['number'] ?></span>
      <div class="about-img-descr-block">
        <span class="about__top-text"><?php echo $sect_img_text['text_top'] ?></span>
        <span class="about__bottom-text"><?php echo $sect_img_text['text_bottom'] ?></span>
      </div>
    </div>
  </div>
</section>