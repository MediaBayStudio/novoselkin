<?php
function parse_gallery( $images ) {
  global $img_width_regExp;
  // Формируем data-src и data-media
  foreach ( $images as $img ) {
    $img_src = get_image_src( $img );

    preg_match( $img_width_regExp, $img_src, $matches );

    $screen_width = $matches[0] - 0.02;

    $media_query = '(min-width:' . $screen_width . 'px)';

    // Формируем удобный массив 575 => (min-width:575.98) ...
    $media[ $screen_width ] = ['query' => $media_query, 'src' => $img_src];
  }

  // Соритруем в порядке возрастания
  ksort( $media, SORT_REGULAR );

  // Перебираем еще раз, уже формируя src и media
  $i = 0;
  foreach ( $media as $m ) {
    if ( $i === 0 ) {
      $data_src = 'url(' . $m['src'] . ')';
      $prev_media = $m['query'];
    } else {
      $data_media .= $prev_media . '{url(' . $m['src'] . ')}';
      $prev_media = $m['query'];
    }
    $i++;
  }

  return [
    'data-src' => ' data-src="' . $data_src . '"',
    'data-media' => ' data-media="' . $data_media . '"'
  ];
}