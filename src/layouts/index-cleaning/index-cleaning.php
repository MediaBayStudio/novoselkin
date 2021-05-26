<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];
$list = $section['list'];
$sign = $section['sign'];
$gallery = parse_gallery( $section['gallery'] ) ?>
<section<?php echo $gallery['data-src'] . $gallery['data-media'] ?> class="index-cleaning container lazy">
  <div class="index-cleaning__text">
    <h2 class="index-cleaning__title"><?php echo $sect_title ?></h2>
    <p class="index-cleaning__descr"><?php echo $sect_descr ?></p>
    <ul class="index-cleaning__ul"> <?php
      foreach ( $list as $li ) : ?>
        <li class="index-cleaning__li">– <?php echo $li['li'] ?></li> <?php
      endforeach ?>
    </ul>
    <p class="index-cleaning__sign"><?php echo $sign ?></p>
  </div>
</section>