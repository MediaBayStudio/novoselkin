<?php
$template_directory = get_template_directory_uri();
$template_dir = get_template_directory();
$wp_content_dir = content_url();
$site_url = site_url();
$is_front_page = is_front_page();
$is_404 = is_404();
$is_category = is_category();
$is_admin = is_admin();

$address = get_option( 'contacts_address' );
$tel = get_option( 'contacts_tel' );
$tel_dry = preg_replace( '/\s/', '', $tel );
$email = get_option( 'contacts_email' );

$extname_regExp = '/[^.]+$/';
$img_width_regExp = '/(?<=\.)[0-9]{3,4}(?=\.|\-|\_)/';

// Проверка поддержки webp браузером
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false ) {
  $webp_support = true; // webp поддерживается
} else {
  $webp_support = false; // webp не поддерживается
}

// Запрет обновления плагинов
add_filter( 'site_transient_update_plugins', function( $value ) {
  unset(
    $value->response['contact-form-7/wp-contact-form-7.php'],
    $value->response['contact-form-7-honeypot/honeypot.php'],
    $value->response['advanced-custom-fields-pro/acf.php']
  );

  return $value;
} );


// Удаляем ненужные пункты в меню админки
require $template_dir . '/inc/disable-menu-items-in-admin.php';

// Регистрация калькуятора как типа записей
require $template_dir . '/inc/register-post-type.php';

// Удаление разных скриптов и стилей от wp
// Отключаем гутенберг
// Отключаем emoji
// Отключаем весь css-файл CF7
// Отключаем генерацию некоторых лишнех тегов
require $template_dir . '/inc/disable-wp-scripts-and-styles.php';

// Поддержки темой, настройка thumbnails
require $template_dir . '/inc/theme-support-and-thumbnails.php';

// Подключение стилей и скриптов, чистка лишнего в html-тегах, настройка атрибутов
require $template_dir . '/inc/enqueue-styles-and-scripts.php';

// Настройка доп. полей в панели настройки->общее
require $template_dir . '/inc/options-fields.php';

// Подключение и настройка меню, атрибутов, классов, id
require $template_dir . '/inc/menus.php';

// Формирование src для изображения - webp или png/jpg
require $template_dir . '/inc/get-image-src.php';

// Разбор изображений и возврат массива [data-src => '...', data-media => '...']
require $template_dir . '/inc/parse-gallery.php';

// Создание шаблона документа
require $template_dir . '/inc/create-calc-doc.php';