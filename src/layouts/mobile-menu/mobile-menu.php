<?php global $template_directory, $tel, $tel_dry ?>
<aside class="menu" id="menu">
  <div class="menu__cnt">
    <div class="menu__hdr">
      <a href="/" class="menu__logo" title="На главную">
        <img src="<?php echo $template_directory ?>/img/logo-red.svg" alt="Логотип Новосёлкин" class="menu__logo-img">
      </a>
      <button type="button" class="menu__close" id="menu-close">
        <img src="#" alt="Иконка закрытия" data-src="<?php echo $template_directory ?>/img/icon-menu-close.svg" class="menu__close-icon lazy">
      </button>
    </div> <?php
    wp_nav_menu( [
      'theme_location'  => 'mobile_menu',
      'container'       => 'nav',
      'container_class' => 'menu__nav',
      'menu_class'      => 'menu__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <a href="tel:<?php echo $tel_dry ?>" class="menu__tel"><?php echo $tel ?></a>
    <button type="button" class="menu__callback btn btn_ol-red">Заказать звонок</button>
  </div>
</aside>