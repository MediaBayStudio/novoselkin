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
  let aboutHeroBtn = id('about-hero-btn');

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