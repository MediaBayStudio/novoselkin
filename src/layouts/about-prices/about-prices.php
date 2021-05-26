<?php
$section_title = $section['sect_title'];
$prices = $section['prices'] ?>
<section class="about-prices container">
  <h2 class="about-prices__title"><?php echo $section_title ?></h2>
  <div class="about-prices__prices"> <?php
    foreach ( $prices as $price ) : ?>
      <div data-src="url(<?php echo $price['bg'] ?>)" class="about-price lazy">
        <span class="about-price__title"><?php echo $price['title'] ?></span>
        <span class="about-price__price"><?php echo $price['price'] ?></span>
      </div> <?php
    endforeach ?>
  </div>
</section>