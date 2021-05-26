<?php
global $template_directory, $tel, $tel_dry, $address, $email;
wp_footer() ?>
<footer data-src="#" class="ftr container lazy">
  <div class="ftr__top">
    <a href="/" class="ftr__logo" title="На главную">
      <img src="#" alt="Логотип Новосёлкин" data-src="<?php echo $template_directory ?>/img/logo-red.svg" class="ftr__logo-img lazy">
    </a>
    <p class="ftr__copy">&copy; ООО &#171;Новоселкин&#187;, <?php echo date( 'Y' ) ?>.</p>
    <div class="ftr__dev">Разработка – <a href="https://media-bay.ru" target="_blank" class="ftr__dev-link" title="Перейти на сайт разработчика">media bay</a></div>
  </div> <?php 
  wp_nav_menu( [
    'theme_location'  => 'footer_menu',
    'container'       => 'nav',
    'container_class' => 'ftr__nav',
    'menu_class'      => 'ftr__nav-list',
    'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
  ] ) ?>
  <div class="ftr__phones">
    <a href="tel:<?php echo $tel_dry ?>" class="ftr__tel"><?php echo $tel ?></a>
    <button type="button" class="ftr__callback btn btn_ol-red">Заказать звонок</button>
    <span class="ftr__work-hours">Ежедневно с 10:00 до 20:00</span>
  </div>
  <div class="ftr__contacts">
    <p class="ftr__address"><span class="ftr__address-text"><?php echo $address ?></span></p>
    <a href="mailto:<?php echo $email ?>" class="ftr__email"><?php echo $email ?></a>
  </div>
</footer>
<div class="site-info container">
  <p>Информация, указанная на данном сайте, является публичной офертой</p>
  <a href="/policy.pdf" target="_blank" title="Посмотреть политику конфиденциальности" class="policy">Политика конфиденциальности</a>
</div> <?php
require 'template-parts/thanks-popup.php';
require 'template-parts/order-popup.php';
require 'template-parts/callback-popup.php' ?>
<div id="fake-scrollbar"></div>
	</body>
</html>