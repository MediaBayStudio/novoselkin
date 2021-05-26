<?php

add_action( 'init', function() {

  // Новый тип записи - калькулятор для каждого типа кв
  register_post_type( 'calc_type', [
    'label'  => null,
    'labels' => [
      'name'               => 'Калькулятор',
      'singular_name'      => 'Калькулятор',
      'add_new'            => 'Добавить',
      'add_new_item'       => 'Добавление',
      'edit_item'          => 'Редактирование',
      'new_item'           => 'Новое ',
      'view_item'          => 'Смотреть',
      'search_items'       => 'Искать',
      'not_found'          => 'Не найдено',
      'not_found_in_trash' => 'Не найдено в корзине',
      'parent_item_colon'  => '',
      'menu_name'          => 'Калькулятор',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => null,
    'rest_base'           => null,
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => [ 'title' ],
    'taxonomies'          => [],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true
  ] );
});