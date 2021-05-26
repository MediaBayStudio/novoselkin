<?php
$sect_visible = $section['visible'];
if ( $sect_visible ) :
  $sect_title = $section['sect_title'];
  $team = array_fill ( 0, 12, $section['team'][0] );
  #$team = $section['team'] ?>
  <section data-src="#" class="about-team container lazy">
    <h2 class="about-team__title"><?php echo $sect_title ?></h2>
    <div class="team" id="team-slider"> <?php
      foreach ( $team as $person ) :
        $person_photo = $person['img'];
        if ( !$person_photo ) {
          $person_photo = $template_directory . '/img/img-placeholder.svg';
        } ?>
        <div class="person">
          <img src="#" alt="" data-src="<?php echo $person_photo ?>" class="person__img lazy">
          <span class="person__title">
            <span class="person__name"><?php echo $person['title'] ?></span>
            <span class="person__pos"><span class="person__pos-text"><?php echo $person['pos'] ?></span></span>
          </span> <?php
          if ( $person['descr'] ) : ?>
            <p class="person__descr"><?php echo $person['descr'] ?></p> <?php
          endif ?>
        </div> <?php
      endforeach ?>
    </div> <?php
    if ( count( $team ) > 2 ) : ?>
      <button type="submit" class="about-team__more-btn hidden" id="team-more-btn"><span>Показать еще</span></button> <?php
    endif ?>
  </section> <?php
endif ?>