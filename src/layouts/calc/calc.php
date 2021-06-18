<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];
$calc = get_posts( [
  'post_type' => 'calc_type',
  'numberposts' => -1
] );

$tooltips = [];

// Формируем удобный объект
// {1-комнатная квартира => ['Пол' => ...]}
foreach ( $calc as $item ) {
  $table = get_field( 'calc_prices', $item );
  $table_hdr = $table['header'];
  $table_body = $table['body'];

  for ( $i = 0, $len = count( $table_body ); $i < $len; $i++ ) {

    // Формируем подсказки, берем только из кв студии
    if ( strpos( $item->post_title, 'студи' ) !== false) {
      // Если есть повторяющийся вид работ (окна, окна и т.д.)
      if ( $tooltips[ $table_body[ $i ][3]['c']] ) {
        if ( $tooltips[ $table_body[ $i ][3]['c'] ] !== $table_body[ $i ][5]['c'] ) {
          $tooltips[ $table_body[ $i ][3]['c'] ] .= ', ' . mb_strtolower( $table_body[ $i ][5]['c'] );
        }
      } else {
        $tooltips[ $table_body[ $i ][3]['c'] ] = $table_body[ $i ][5]['c'];
      }
    }
    
    $work = [
      // Стоимость работ
      'price' => $table_body[ $i ][0]['c'],
      // Черновые материалы
      'draft' => $table_body[ $i ][1]['c'],
      // Чистовые материалы
      'finish' => $table_body[ $i ][2]['c'],
      // Срок работ
      'term' => $table_body[ $i ][4]['c']
    ];

    // Если в таблице 2 одинаковых поля "вид работ", то создаем 2 массива
    if ( $works[ $table_body[ $i ][3]['c'] ] ) {
      $exists_work = $works[ $table_body[ $i ][3]['c'] ];
      // Если это уже массив и есть первый элемент
        // Для 3+ совпадений по виду работ
      if ( $exists_work[0] ) {        
        foreach ( $exists_work as $key => $value ) {
          $exists_works[] = $value;
        }
        $exists_works[] = $work;
        $works[ $table_body[ $i ][3]['c'] ] = $exists_works;
      } else {
        $works[ $table_body[ $i ][3]['c'] ] = [ $exists_work, $work ];
      }
    } else {
      $works[ $table_body[ $i ][3]['c'] ] = $work;
    }

  }

  $calc_prices[ $item->post_title ] = $works;
  unset( $work ); 
  unset( $exists_work ); 
  unset( $works );
  unset( $table );
  unset( $table_hdr );
  unset( $table_body );
} ?>
<section data-src="#" class="calc-sect container lazy">
  <h2 class="calc-sect__title"><?php echo $sect_title ?></h2> <?php
  if ( $sect_descr ) : ?>
    <p class="calc-sect__descr"><?php echo $sect_descr ?></p> <?php
  endif ?>
  <div class="calc" id="calc">
    <button type="button" class="calc__tour-btn"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-info.svg" class="calc__tour-btn-icon lazy"><span class="calc__tour-btn-text">Посмотреть как это работает</span></button>
    <div class="calc__group" id="calc-group-type">
      <span class="calc__group-title">Выберите тип помещения:</span>
      <div class="calc__inputs">
        <input type="text" name="price" tabindex="-1" form="order-form" readonly id="calc-result" style="display:none">
        <div class="calc__input-wrap">
          <select name="type" class="calc__select" form="order-form">
            <option value="0" checked>Квартира-студия</option>
            <option value="1">1-комнатная квартира</option>
            <option value="2">2-комнатная квартира</option>
            <option value="3">3-комнатная квартира</option>
          </select>
        </div>
      </div>
    </div>
    <div class="calc__group" id="calc-group-work">
      <span class="calc__group-title">Выберите необходимые виды работ:</span>
      <div class="calc__inputs">
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="work[]" value="ceiling" form="order-form" class="check__inp" checked><span class="check__text">Потолок</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Потолок'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="work[]" value="floor" form="order-form" class="check__inp" checked><span class="check__text">Пол</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Пол'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="work[]" value="tile" form="order-form" class="check__inp" checked><span class="check__text">Кафель</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Кафель'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="work[]" value="walls" form="order-form" class="check__inp" checked><span class="check__text">Стены</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Стены'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="work[]" value="windows" form="order-form" class="check__inp" checked><span class="check__text">Окна</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Окна'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="work[]" value="plumbing" form="order-form" class="check__inp" checked><span class="check__text">Сантехника</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Сантехника'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
      </div>
    </div>
    <div class="calc__group" id="calc-group-extra-work">
      <span class="calc__group-title">Дополнительные работы:</span>
      <div class="calc__inputs">
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="extra-work[]" value="plaster" form="order-form" class="check__inp"><span class="check__text">Штукатурка</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Штукатурка'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="extra-work[]" value="dry" form="order-form" class="check__inp"><span class="check__text">Ровнитель</span></label>
          <div class="calc__input-hint" data-hint="<?php echo $tooltips['Ровнитель'] ?>"><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
      </div>
    </div>
    <div class="calc__group" id="calc-group-added">
      <span class="calc__group-title">Добавить к стоимости:</span>
      <div class="calc__inputs">
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="added[]" value="draft" form="order-form" class="check__inp"><span class="check__text">Черновые материалы</span></label>
          <div class="calc__input-hint" data-hint="Матералы общестрительного назначения - грунтовки, шпаклевки, клеи, трубы для сантехники и прочее."><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
        <div class="calc__input-wrap">
          <label class="calc__checkbox check check_tick check_red"><input type="checkbox" name="added[]" value="finish" form="order-form" class="check__inp"><span class="check__text">Чистовые материалы</span></label>
          <div class="calc__input-hint" data-hint="Обои, краска, ламинат, сантехника и прочее. Качественные, в среднем ценовом диаопазоне."><img src="#" alt="#" data-src="<?php echo $template_directory ?>/img/icon-question.svg" class="calc__input-hint-img lazy"></div>
        </div>
      </div>
    </div>
    <img src="#" alt="#" class="calc__input-hint-img" id="calc-img">
  </div>
  <div class="calc-result">
    <div class="calc-result__price-block">
      <span class="calc-result__price-title">Стоимость ремонта</span>
      <span class="calc-result__price"><span class="calc-result__price-number">0</span> руб.</span>
      <p class="calc-result__price-period">Срок выполнения работ&nbsp;- <span id="calc-period"></span></p>
    </div>
    <div class="calc-result__guarantee-block">
      <span class="calc-result__guarantee-title">Гарантия на ремонт 5 лет</span>
      <p class="calc-result__guarantee-descr">Все дополнительные пожелания оформляются в&nbsp;виде сметы, согласно утвержденным расценкам.</p>
      <!-- <a href="/" target="_blank" class="calc-result__guarantee-doc" id="calc-result-doc">Скачать шаблон договора</a> --> <?php
      $months_list = [
        '1' => 'января',
        '2' => 'февраля',
        '3' => 'марта',
        '4' => 'апреля',
        '5' => 'мая',
        '6' => 'июня',
        '7' => 'июля',
        '8' => 'августа',
        '9' => 'сентября',
        '10' => 'октября',
        '11' => 'ноября',
        '12' => 'декабря'
      ];
      $document_number = date('dmY') . '/';
      $document_date = date( '"d" ' ) . $months_list[date( 'n' )] . date( ' Y' ) . ' г.' ?>
      <form action="#" method="POST" class="calc-result__doc-form" id="doc-form">
        <input type="text" name="number" class="doc-form__input" data-initial-value="<?php echo $document_number ?>">
        <input type="text" name="date" class="doc-form__input" value='<?php echo $document_date ?>'>
        <input type="text" name="sum" class="doc-form__input">
        <input type="text" name="sum-text" class="doc-form__input">
        <input type="text" name="term" class="doc-form__input">

        <input type="text" name="appendix-number" class="doc-form__input">
        <div class="appendix-inputs">
          <textarea name="appendix-work-1" class="doc-form__input"></textarea>
          <textarea name="appendix-price-1" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-1" class="doc-form__input"></textarea>
          <textarea name="appendix-work-2" class="doc-form__input"></textarea>
          <textarea name="appendix-price-2" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-2" class="doc-form__input"></textarea>
          <textarea name="appendix-work-3" class="doc-form__input"></textarea>
          <textarea name="appendix-price-3" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-3" class="doc-form__input"></textarea>
          <textarea name="appendix-work-4" class="doc-form__input"></textarea>
          <textarea name="appendix-price-4" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-4" class="doc-form__input"></textarea>
          <textarea name="appendix-work-5" class="doc-form__input"></textarea>
          <textarea name="appendix-price-5" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-5" class="doc-form__input"></textarea>
          <textarea name="appendix-work-6" class="doc-form__input"></textarea>
          <textarea name="appendix-price-6" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-6" class="doc-form__input"></textarea>
          <textarea name="appendix-work-7" class="doc-form__input"></textarea>
          <textarea name="appendix-price-7" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-7" class="doc-form__input"></textarea>
          <textarea name="appendix-work-8" class="doc-form__input"></textarea>
          <textarea name="appendix-price-8" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-8" class="doc-form__input"></textarea>
          <textarea name="appendix-work-9" class="doc-form__input"></textarea>
          <textarea name="appendix-price-9" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-9" class="doc-form__input"></textarea>
          <textarea name="appendix-work-10" class="doc-form__input"></textarea>
          <textarea name="appendix-price-10" class="doc-form__input"></textarea>
          <textarea name="appendix-cost-10" class="doc-form__input"></textarea>
        </div>
        <input type="text" name="appendix-total" class="doc-form__input">
        <input type="text" name="appendix-total-price" class="doc-form__input">

        <div class="doc-form__buttons">
          <button type="submit" class="doc-form__btn" id="doc-form-btn">Создать шаблон договора</button>
          <a href="#" target="_blank" class="doc-form__link hide" id="doc-form-link">Скачать шаблон договора</a>
        </div>
        <div class="loader">
          <div class="loader__circle"></div>
        </div>
      </form>
    </div>
    <div class="calc-result__buttons-block">
      <button type="button" class="btn btn_red" id="calc-order-btn">Оформить заявку</button>
      <button type="button" class="btn btn_yellow" id="tinkoff-btn">Оформить в кредит</button>
    </div>
    <span class="calc-result__info">*Информация является публичной офертой</span>
  </div>
</section>
<script id="calc-script">
  let calcTable = <?php echo json_encode( $calc_prices ) ?>;
</script>