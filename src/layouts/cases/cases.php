<?php
if ( $section['manual'] ) {
  $cases = $section['cases'];
} else {
  $cases = get_posts( [
    'post_type' => 'case',
    'numberposts' => -1,
    'orderby' => 'meta_value_num',
    'meta_key' => 'index',
    'order' => 'ASC'
  ] );
}

// $loadmore_class = count( $cases ) > 3 ? '' : ' hidden';

// if ( $cases ) : ?>
  <!-- <section class="cases-sect container"> -->
    <!-- <h2 class="cases-sect__title"><?php #echo $section['title'] ?></h2> -->
    <!-- <div class="cases-sect__cases"> --> <?php
      // foreach ( $cases as $case ) :
        // $case_id = $case->ID;
        // $case_fields = get_fields( $case_id ) ?>
        <!-- <div class="cases-sect__case"> -->
          <!-- <div class="case__gallery"> --> <?php
            // foreach ( $case_fields['gallery'] as $img ) : ?>
              <!-- <img src="#" data-src="<?php #echo $img['url'] ?>" alt="#" class="case__img lazy"> --> <?php
            // endforeach ?>
          <!-- </div> -->
          <!-- <div class="case__bottom"> -->
            <!-- <span class="case__title"><?php #echo $case->post_title ?></span> -->
            <!-- <ul class="case__ul"> --> <?php
              // foreach ( $case_fields['props'] as $li ) : ?>
                <!-- <li class="case__li"> -->
                  <!-- <span class="case__li-left"><?php #echo $li['left'] ?></span> -->
                  <!-- <span class="case__li-right"><?php #echo $li['right'] ?></span> -->
                <!-- </li> --> <?php
              // endforeach ?>
            <!-- </ul> -->
          <!-- </div> -->
        <!-- </div> --> <?php
      // endforeach ?>
      <!-- <div class="cases-sect__nav"> -->
        <!-- <span class="cases-sect__counter"></span> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <button type="button" class="cases-sect__loadmore btn btn_ol-red<?php #echo $loadmore_class ?>">Загрузить еще</button> -->
  <!-- </section> --> <?php
// endif ?>



<section class="cases-sect container"<?php echo $section_id ?>>
  <!-- <div class="cases-sect__heading"> -->
  <h2 class="cases-sect__title"><?php echo $section['title'] ?></h2>
  <!-- <div class="cases-sect__arrows"></div> -->
  <!-- </div> -->
  <div class="cases-sect__cases"> <?php
    $i = 0;
    foreach ( $cases as $case ) :
      $case_id = $case->ID;
      $case_fields = get_fields( $case_id );
      $case_title = $case->post_title;

      $case_gallery = $case_fields['gallery'];
      $case_text = '';
      $preview_text = '';

      foreach ( $case_fields['props'] as $prop ) {
        $case_text .= '<li class="case__li"><span class="case__li-left">' . $prop['left'] . '</span><span class="case__li-right">' . $prop['right']. '</span></li>';
        if ( stripos( $prop['left'], 'Метраж' ) !== false || stripos( $prop['left'], 'Стоимость' ) !== false ) {
          $preview_text .= '<div class="case__text-props"><span class="case__text-left">' . $prop['left'] . '</span><span class="case__text-right">' . $prop['right'] . '</span></div>';
        }
      }

      $case_thumbnail = $case_gallery[0]['url'];
      // $case_area = str_replace( 'м2', 'м<sup class="case__title-sup">2</sup>', $case_text['area'] );
      // if ( $case_area ) {
        // $case_area = ' | ' . $case_area;
      // } ?>
      <div class="case" data-title="<?php echo $case_title ?>">
        <div class="case__text" style="display:none"> <?php
          echo $case_text ?>
        </div>
        <div class="case__images"> <?php
          foreach ( $case_gallery as $case_img ) : ?>
            <a href="<?php echo $case_img['url'] ?>" class="case__link">
              <img src="#" alt="#" class="case__img lazy" data-src="<?php echo $case_img['url'] ?>">
            </a> <?php
          endforeach ?>
        </div>
        <div class="case__text">
          <strong class="case__title"><?php echo $case_title . $case_area ?></strong>
          <div class="case__arrow">
            <img src="#" alt="Стрелка" class="case__arrow-img lazy" data-src="<?php echo $template_directory ?>/img/icon-case-arrow.svg" >
          </div> <?php
          echo $preview_text ?>
        </div>
      </div> <?php
      $i++;
    endforeach ?>
  </div>
  <!-- <button type="button" class="cases-sect__more-btn btn btn_blue btn_ol">Показать еще</button> -->
  <div class="cases-sect__arrows"></div>
</section>