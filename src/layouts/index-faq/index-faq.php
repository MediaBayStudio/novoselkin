<section class="index-faq container">
  <h1 class="index-faq__title"><?php echo $section['sect_title'] ?></h1>
  <ul class="index-faq__list"> <?php
    $i = 1;
    foreach ( $section['faq'] as $li ) :
      if ( $li['faq_question'] && $li['faq_answer'] ) : ?>
        <li class="index-faq__li">
          <span class="index-faq__question"><span class="index-faq__question-number"><?php echo $i ?>.</span><span class="index-faq__question-text"><?php echo $li['faq_question'] ?></span></span>
          <p class="index-faq__answer"><?php echo $li['faq_answer'] ?></p>
        </li> <?php
        $i++;
      endif;
    endforeach ?>
  </ul>
</section>