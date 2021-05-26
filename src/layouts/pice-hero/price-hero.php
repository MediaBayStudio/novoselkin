<?php
$hero_title = $section['sect_title'];
$sect_bg = get_image_src( $section['bg'] );
$prices_blocks = $section['tables'] ?>
<section data-src="url(<?php echo $sect_bg ?>)" class="price-hero container lazy">
  <h1 class="price-hero__title"><?php echo $hero_title ?></h1>
</section>
<section class="prices-sect container">
  <div class="prices-block"> <?php
    foreach ( $prices_blocks as $price_block ) :
      foreach ( $price_block['tables_blocks'] as $price ) : ?>
        <div class="price-block">
          <span class="price-block__title"><?php echo $price['tables_block_title'] ?></span>
          <div class="tables-block"> <?php
            $i = 1;
            foreach ( $price['tables'] as $table ) : ?>
              <div class="price-table-block"> <?php
              $table_header = $table['table']['header'];
              $table_body = $table['table']['body'];
              if ( !$table_body ) continue ?>
              <span class="price-table-block__title"><?php echo $i . '. ' . $table['table_title'] ?></span> <?php
              echo '<table class="price-table">';
              echo '<thead class="price-table__hdr">';
                echo '<tr class="price-table__tr">';
                  foreach ( $table_header as $th ) {
                    echo '<th class="price-table__th">';
                      echo $th['c'];
                    echo '</th>';
                  }
                echo '</tr>';
              echo '</thead>';
              echo '<tbody class="price-table__body">';
                foreach ( $table_body as $tr ) {
                  echo '<tr class="price-table__tr">';
                    foreach ( $tr as $td ) {
                      echo '<td class="price-table__td">';
                        echo str_replace( [
                          'м2',
                          'м3',
                          'см2',
                          'см3'
                        ], [
                          'м<sup>2</sup>',
                          'м<sup>3</sup>',
                          'см<sup>2</sup>',
                          'см<sup>3</sup>'
                        ], $td['c'] );
                      echo '</td>';
                    }
                  echo '</tr>';
                }
              echo '</tbody>';
              echo '</table>';
              $i++ ?>
              </div> <?php
            endforeach ?>
          </div>
        </div> <?php
      endforeach;
    endforeach ?>
  </div>
  <p class="prices-block__text"><?php echo $section['text'] ?></p>
</section>
