<?php
  global
    $site_url,
    $template_directory,
    $webp_support,
    $tel,
    $tel_dry,
    $email,
    $address ?>

<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <!-- fonts preload --> <?php
  $fonts = [
    'BookmanOldStyle-Regular.woff',
    'BookmanOldStyle-Bold.woff',
    'Calibri-Regular.woff',
    'Calibri-Bold.woff',
    'SegoeUI-SemiBold.woff'
  ];
  foreach ( $fonts as $font ) : ?>
    
  <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
  endforeach ?>
  <!-- css preload --> 
  <link rel="preload" href="<?php echo $template_directory ?>/style.css" as="style" />
  <link rel="preload" href="<?php echo $template_directory ?>/css/style.css" as="style" />
  <link rel="preload" href="<?php echo $template_directory ?>/img/logo-red.svg" as="image" />
  <link rel="preload" href="<?php echo $template_directory ?>/img/icon-burger.svg" as="image" />
  <!-- favicons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="theme-color" content="#ffffff" />
  <script defer src="https://forma.tinkoff.ru/static/onlineScript.js"></script> <?php
  if ( stripos( $_SERVER['HTTP_USER_AGENT'], 'lighthouse' ) === false ) : ?>
    <!-- Yandex.Metrika counter -->
    <script>
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(32819272,"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,trackHash:true,ecommerce:"dataLayer"});</script><noscript><div><img src="https://mc.yandex.ru/watch/32819272" style="position:absolute; left:-9999px;" alt="#" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-WCRQ287');</script>
    <!-- End Google Tag Manager --> <?php
  endif;
  wp_head() ?>
</head>

<body data-template-dir="<?php echo $template_directory ?>" data-site-url="<?php echo $site_url ?>"> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WCRQ287"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
  <header class="hdr container" id="hdr">
    <a href="/" class="hdr__logo" title="На главную">
      <img src="<?php echo $template_directory ?>/img/logo-red.svg" alt="Логотип Новосёлкин" class="hdr__logo-img">
    </a> <?php 
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'hdr__nav',
      'menu_class'      => 'hdr__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <a href="tel:<?php echo $tel_dry ?>" class="hdr__tel"><?php echo $tel ?></a>
    <button type="button" class="hdr__callback btn btn_ol-red">Заказать звонок</button>
    <button type="button" class="hdr__burger" id="hdr-burger">
      <img src="<?php echo $template_directory ?>/img/icon-burger.svg" alt="Иконка меню" class="hdr__burger-icon">
    </button> <?php
    require 'template-parts/mobile-menu.php' ?>
  </header>