<?php
$sect_title = $section['sect_title'];
$cards = $section['cards'] ?>
<section class="index-get-free container">
  <h2 class="index-get-free__title"><?php echo $sect_title ?></h2>
  <div class="index-get-free__cards"> <?php
  foreach ( $cards as $card ) : ?>
    <div class="get-free-card">
      <img src="#" alt="" data-src="<?php echo $card['img'] ?>" class="get-free-card__img lazy">
      <div class="get-free-card__text">
        <div class="get-free-card__title-block">
          <strong class="get-free-card__title"><?php echo $card['title'] ?></strong>
          <span class="get-free-card__free-text">Бесплатно</span>
        </div>
        <p class="get-free-card__descr"><?php echo $card['descr'] ?></p>
      </div>
    </div> <?php
  endforeach ?>
  </div>
</section>