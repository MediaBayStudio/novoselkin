;
(function() {
  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    dot = '<button type="button" class="dot"></button>',
    arrowSvg = '<svg class="arrow__svg" width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.13191 17.6171L9.61719 9.13184L1.48546 1.00011" stroke="currentColor"/></svg>',
    createArrow = function(className, inside) {

      className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;

      return '<button type="button" class="arrow arrow_' + className + '">' + inside + '</button>';
    },

    // Функции slick для сокращения записи
    // Чем больше слайдеров, тем актуальнее эти функции
    hasSlickClass = function($el) {
      return $el.hasClass('slick-slider');
    },
    unslick = function($el) {
      $el.slick('unslick');
    },

    // Слайдеры
    teamSlider = id('team-slider'),
    teamLoadMoreBtn = id('team-more-btn');

  if (teamSlider) {
    let slides = qa('.person', teamSlider),
      slidesLength = slides.length,
      $teamSlider = $(teamSlider),
      buildTeamSlider = function() {
        // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // Ограничиваем высоту блока
        if (media(mediaQueries.s)) {
          if (hasSlickClass($teamSlider)) {
            unslick($teamSlider);
          }
          let coeff = media(mediaQueries.m) ? 2 : 1;

          $teamSlider.css('max-height', (slides[0].offsetHeight + +(getComputedStyle(slides[0]).marginTop).slice(0, -2)) * coeff + 'px');

          if (media(mediaQueries.lg)) {
            if (slidesLength > 9) {
              teamLoadMoreBtn.classList.remove('hidden');
            } else {
              teamLoadMoreBtn.classList.add('hidden');
            }
          } else if (media(mediaQueries.m)) {
            if (slidesLength > 6) {
              teamLoadMoreBtn.classList.remove('hidden');
            } else {
              teamLoadMoreBtn.classList.add('hidden');
            }
          } else if (media(mediaQueries.s)) {
            if (slidesLength > 2) {
              teamLoadMoreBtn.classList.remove('hidden');
            } else {
              teamLoadMoreBtn.classList.add('hidden');
            }
          }
        } else {
          if (hasSlickClass($teamSlider)) {
            // слайдер уже создан
            return;
          }
          if (slidesLength && slidesLength> 1) {
            console.log();
            $teamSlider.slick({
              infinite: false,
              prevArrow: createArrow('team__prev', arrowSvg),
              nextArrow: createArrow('team__next', arrowSvg)
            });
          }
        }
      }
    buildTeamSlider();
    windowFuncs.resize.push(buildTeamSlider);
    teamLoadMoreBtn.addEventListener('click', function() {
      teamSlider.style.maxHeight = teamSlider.scrollHeight + 'px';
      teamLoadMoreBtn.classList.add('hidden');
    });
  }


  // настройки grab курсора на всех слайдерах
  $('.slick-list.draggable').on('mousedown', function() {
    $(this).addClass('grabbing');
  });

  $('.slick-list.draggable').on('beforeChange', function() {
    $(this).removeClass('grabbing');
  });

  $(document).on('mouseup', function() {
    $('.slick-list.draggable').removeClass('grabbing');
  });


})();