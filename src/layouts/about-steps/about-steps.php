<?php
$sect_title = $section['sect_title'];
$steps = $section['steps'] ?>
<section data-src="#" class="about-steps container lazy">
  <h2 class="about-steps__title"><?php echo $sect_title ?></h2>
  <div class="steps"> <?php
    $i = 1;
    foreach ( $steps as $step ) : ?>
      <div class="about-step">
        <span class="about-step__num"><span class="about-step__num-text"><?php echo $i ?></span></span>
        <div class="about-step__right">
          <img src="#" alt="" data-src="<?php echo $step['img'] ?>" class="about-step__img lazy">
          <p class="about-step__descr"><?php echo $step['descr'] ?></p> <?php
            if ( $step['btn'] ) : ?>
              <button type="button" class="about-step__btn btn btn_red"><?php echo $step['btn_text'] ?></button> <?php
            endif ?>
        </div>
      </div> <?php
      $i++;
    endforeach ?>
  </div>
</section>