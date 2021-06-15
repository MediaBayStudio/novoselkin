//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

document.addEventListener('DOMContentLoaded', function() {

  fakeScrollbar = id('fake-scrollbar');
  hdr = id('hdr');
  orderForm = id('order-form');
  calcBlock = id('calc');
  tinkoffBtn = id('tinkoff-btn');
  let aboutHeroBtn = id('about-hero-btn'),
    casesBlock = q('.cases-sect__cases'),
    casesLoadmore = q('.cases-sect__loadmore'),
    faqList = q('.index-faq__list');

  if (faqList) {
    let faqBlocks = faqList.children,
      dropdownText = function(element) {

        if (!element) {
          faqBlocks[0].classList.add('active');
          for (var i = faqBlocks.length - 1; i >= 1; i--) {
            faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
          }
          return;
        }

        let parent = element.parentElement,
          activeElement = q('.active', faqList);

        parent.classList.add('active');
        activeElement.classList.remove('active');
        parent.style.maxHeight = parent.scrollHeight + 'px';
        activeElement.style.maxHeight = activeElement.children[0].scrollHeight + 'px';

      };

    dropdownText();

    faqList.addEventListener('click', function() {
      let target = event.target;
      if (target.classList.contains('index-faq__question')) {
        dropdownText(target);
      }
    });

  }


  if (casesBlock && casesLoadmore) {
    if (!casesLoadmore.classList.contains('hidden') && media('(max-width:767.98px)')) {
      let childs = casesBlock.children,
        height = 0;

      for (let i = 0, len = childs.length; i < 3; i++) {
        // Один раз не нужно прибавлять нижний отступ
        let mb = i === 0 ? 0 : parseInt(getComputedStyle(childs[i]).marginBottom);

        height += childs[i].offsetHeight + mb;
      }

      casesBlock.style.maxHeight = height + 'px';

      casesLoadmore.addEventListener('click', function() {
        casesBlock.style.maxHeight = casesBlock.scrollHeight + 'px';
        casesLoadmore.classList.add('hidden');
      });
    }
  }

  if (aboutHeroBtn) {
    aboutHeroBtn.addEventListener('click', scrollToTarget);
  }

  // Инициализируем поддержку svg (в основном это надо для svg use в IE)
  svg4everybody();


  //includes
  //=include menu.js
  //=include popups.js
  //=include forms.js
  //=include telMask.js
  //=include sliders.js
  //=include price.js
  //=include calc-doc.js
  //=include calc.js



  // Делаем глобальный lazy, чтобы потом можно было обновлять его через lazy.refresh()
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  // Задаем обработчики событий 'load', 'resize', 'scroll'
  // Для объекта window (если массивы не пустые)
  windowFuncs.resize.push(setVh);
  for (let eventType in windowFuncs) {
    if (eventType !== 'call') {
      let funcsArray = windowFuncs[eventType];
      if (funcsArray.length > 0) {
        windowFuncs.call(funcsArray);
        window.addEventListener(eventType, windowFuncs.call);
      }
    }
  }

  sticky(hdr);
});