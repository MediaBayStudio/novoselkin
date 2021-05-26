<?php
add_action('admin_menu', function() {
  remove_menu_page('tools.php'); // Инструменты
  remove_menu_page('edit.php'); // Посты блога
  remove_menu_page('edit-comments.php'); // Комментарии 
});