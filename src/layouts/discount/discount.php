<?php
$sect_title_red = $section['sect_title_red'];
$sect_title_black = $section['sect_title_black'];
$gallery = parse_gallery( $section['gallery'] ) ?>
<section<?php echo $gallery['data-src'] . $gallery['data-media'] ?> class="discount container lazy">
  <div class="discount__cnt">
    <h2 class="discount__title"><span class="discount__title-red"><?php echo $sect_title_red ?></span> <span class="discount__title-black"><?php echo $sect_title_black ?></span></h2>
    <div class="discount-form-wrap"> <?php
      echo do_shortcode( '[contact-form-7 id="9" html_id="discount-form" html_class="discount-form"]' ) ?>
    </div>
  </div>
</section>