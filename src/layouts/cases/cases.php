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

$loadmore_class = count( $cases ) > 3 ? '' : ' hidden';

if ( $cases ) : ?>
  <section class="cases-sect container">
    <h2 class="cases-sect__title"><?php echo $section['title'] ?></h2>
    <div class="cases-sect__cases"> <?php
      foreach ( $cases as $case ) :
        $case_id = $case->ID;
        $case_fields = get_fields( $case_id ) ?>
        <div class="cases-sect__case">
          <div class="case__gallery"> <?php
            foreach ( $case_fields['gallery'] as $img ) : ?>
              <img src="#" data-src="<?php echo $img['url'] ?>" alt="#" class="case__img lazy"> <?php
            endforeach ?>
          </div>
          <div class="case__bottom">
            <span class="case__title"><?php echo $case->post_title ?></span>
            <ul class="case__ul"> <?php
              foreach ( $case_fields['props'] as $li ) : ?>
                <li class="case__li">
                  <span class="case__li-left"><?php echo $li['left'] ?></span>
                  <span class="case__li-right"><?php echo $li['right'] ?></span>
                </li> <?php
              endforeach ?>
            </ul>
          </div>
        </div> <?php
      endforeach ?>
      <div class="cases-sect__nav">
        <span class="cases-sect__counter"></span>
      </div>
    </div>
    <button type="button" class="cases-sect__loadmore btn btn_ol-red<?php echo $loadmore_class ?>">Загрузить еще</button>
  </section> <?php
endif ?>