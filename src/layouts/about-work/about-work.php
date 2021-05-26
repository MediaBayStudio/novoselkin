<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];
$stages = $section['steps'] ?>
<section data-src="#" class="about-stages container lazy">
  <h2 class="about-stages__title"><?php echo $sect_title ?></h2>
  <p class="about-stages__descr"><?php echo $sect_descr ?></p>
  <div class="stages"> <?php
    $i = 1;
    foreach ( $stages as $stage ) : ?>
      <div class="about-stage">
        <div class="about-stage__img-block">
          <img src="#" alt="" data-src="<?php echo $stage['img'] ?>" class="about-stage__img lazy">
          <span class="about-stage__title"><?php echo $stage['title'] ?></span>
        </div>
        <div class="about-stage__text">
          <span class="about-stage__num"><span class="about-stage__num-text"><?php echo $i ?></span></span>
          <p class="about-stage__descr"><?php echo $stage['descr'] ?></p>
        </div>
      </div> <?php
      $i++;
    endforeach ?>
  </div>
</section>