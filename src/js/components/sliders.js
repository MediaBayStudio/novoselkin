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
    teamLoadMoreBtn = id('team-more-btn'),

    // cases
    casesSect = q('.cases-sect');

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
          if (slidesLength && slidesLength > 1) {
            $teamSlider.slick({
              infinite: false,
              prevArrow: createArrow('team__prev', arrowSvg),
              nextArrow: createArrow('team__next', arrowSvg)
            });
          }
        }
      };
    buildTeamSlider();
    windowFuncs.resize.push(buildTeamSlider);
    teamLoadMoreBtn.addEventListener('click', function() {
      teamSlider.style.maxHeight = teamSlider.scrollHeight + 'px';
      teamLoadMoreBtn.classList.add('hidden');
    });
  }

  if (casesSect) {
    let casesSlider = q('.cases-sect__cases', casesSect),
      casesGallery = $('.case__gallery', casesSlider),
      casesLoadmoreBtn = q('.cases-sect__loadmore', casesSect),
      $casesSlider = $(casesSlider),
      counter = q('.cases-sect__counter', casesSect),
      buildCaseGallerySlider = function() {
        if (hasSlickClass(casesGallery)) {
          // слайдер уже создан
          return;
        }
        casesGallery.slick({
          infinite: false,
          arrows: false,
          dots: true,
          dotsClass: 'case__gallery-dots',
          mobileFirst: true,
          customPaging: () => dot,
          responsive: [{
            breakpoint: 767.98,
            settings: {
              arrows: true,
              prevArrow: createArrow('case__gallery-prev', arrowSvg),
              nextArrow: createArrow('case__gallery-next', arrowSvg)
            }
          }]
        });
      },
      buildCasesSlider = function() {
        if (media('(max-width:767.98px)')) {
          if (hasSlickClass($casesSlider)) {
            unslick($casesSlider);
            return;
          }
        } else {
          if (hasSlickClass($casesSlider)) {
            // слайдер уже создан
            return;
          }
          $casesSlider.slick({
            accessibility: false,
            fade: true,
            infinite: false,
            slide: '.cases-sect__case',
            draggable: false,
            swipe: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            appendArrows: $('.cases-sect__nav'),
            prevArrow: '<button type="button" class="cases-sect__arrow cases-sect__prev"><svg class="cases-sect__arrow-svg" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.7071 8.7071C31.0976 8.31658 31.0976 7.68341 30.7071 7.29289L24.3431 0.92893C23.9526 0.538406 23.3195 0.538406 22.9289 0.92893C22.5384 1.31945 22.5384 1.95262 22.9289 2.34314L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.7071ZM8.74228e-08 9L30 9L30 7L-8.74228e-08 7L8.74228e-08 9Z" fill="#F73C4A"/></svg></button>',
            nextArrow: '<button type="button" class="cases-sect__arrow cases-sect__next"><svg class="cases-sect__arrow-svg" viewBox="0 0 31 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.7071 8.7071C31.0976 8.31658 31.0976 7.68341 30.7071 7.29289L24.3431 0.92893C23.9526 0.538406 23.3195 0.538406 22.9289 0.92893C22.5384 1.31945 22.5384 1.95262 22.9289 2.34314L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.7071ZM8.74228e-08 9L30 9L30 7L-8.74228e-08 7L8.74228e-08 9Z" fill="#F73C4A"/></svg></button>'
          });
        }
      };

    $casesSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
      if (event.target.classList.contains('cases-sect__cases') && slick.slideCount) {
        let number = (currentSlide ? currentSlide : 0) + 1;
        counter.textContent = 'Объект ' + number + '/' + (slick.slideCount - slick.options.slidesToShow + slick.options.slidesToScroll);
      }
    });


    buildCaseGallerySlider();
    buildCasesSlider();
    windowFuncs.resize.push(buildCaseGallerySlider, buildCasesSlider);
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