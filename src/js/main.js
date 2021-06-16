//polyfills
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
var
  // Размреы экранов для медиазапросов
  mediaQueries = {
    's': '(min-width:575.98px)',
    'm': '(min-width:767.98px)',
    'lg': '(min-width:1023.98px)',
    'xl': '(min-width:1439.98px)'
  },
  // Определяем бразуер пользователя
  browser = {
    // Opera 8.0+
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    // Firefox 1.0+
    isFirefox: typeof InstallTrigger !== 'undefined',
    // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    // Internet Explorer 6-11
    isIE: /*@cc_on!@*/ false || !!document.documentMode,
    // Edge 20+
    isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
    // Chrome 1+
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isYandex: !!window.yandex,
    isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
  },
  /*
Объединение слушателей для window на события 'load', 'resize', 'scroll'
Все слушатели на окно следует задавать через него, например:
  window.resize.push(functionName)
Все ф-ии, добавленные в [] window.resize, будут заданы одним слушателем
*/
  windowFuncs = {
    load: [],
    resize: [],
    scroll: [],
    call: function(event) {
      let funcs = windowFuncs[event.type] || event;
      for (let i = funcs.length - 1; i >= 0; i--) {
        // console.log('call', funcs[i].name);
        funcs[i]();
      }
    }
  },
  
  firstCalc,
  tinkoffBtn,

  mask, // ф-я маски телефонов в поля ввода (в файле telMask.js)
  lazy,
  menu,
  hdr,
  // overlay,
  routePopup,
  callbackPopup,
  orderForm,
  // mapBlock,
  calcBlock,
  body = document.body,
  templateDir = body.getAttribute('data-template-dir'),
  siteUrl = body.getAttribute('data-site-url'),
  fakeScrollbar,
  // Сокращение записи querySelector
  q = function(selector, element) {
    element = element || body;
    return element.querySelector(selector);
  },
  // Сокращение записи querySelectorAll + перевод в массив
  qa = function(selectors, element, toArray) {
    element = element || body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // Сокращение записи getElementById
  id = function(selector) {
    return document.getElementById(selector);
  },
  // Фикс 100% высоты экрана для моб. браузеров
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  // Сокращение записи window.matchMedia('query').matches
  media = function(media) {
    return window.matchMedia(media).matches;
  },
  // Кроссбраузерный кастомный эвент, который мы отключим в IE
  dispatchEvent = function(element, eventName) {
    if (!browser.isIE && typeof window.CustomEvent === "function") {
      let evt = new CustomEvent(eventName);
      element.dispatchEvent(evt);
    }
  },
  // Функция запрета/разрешения прокрутки страницы
  pageScroll = function(disallow) {
    fakeScrollbar.classList.toggle('active', disallow);
    body.classList.toggle('no-scroll', disallow);
    body.style.paddingRight = disallow ? fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px' : '';
  },
  // Липкий элемент средствами js
  sticky = function($el, fixThresholdDir, className) {
    $el = typeof $el === 'string' ? q($el) : $el;
    className = className || 'fixed';
    fixThresholdDir = fixThresholdDir || 'bottom';

    let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + pageYOffset,
      $elClone = $el.cloneNode(true),
      $elParent = $el.parentElement,
      fixElement = function() {
        if (!$el.classList.contains(className) && pageYOffset >= fixThreshold) {
          $elParent.appendChild($elParent.replaceChild($elClone, $el));
          $el.classList.add(className);

          window.removeEventListener('scroll', fixElement);
          window.addEventListener('scroll', unfixElement);
        }
      },
      unfixElement = function() {
        if ($el.classList.contains(className) && pageYOffset <= fixThreshold) {
          $elParent.replaceChild($el, $elClone);
          $el.classList.remove(className);

          window.removeEventListener('scroll', unfixElement);
          window.addEventListener('scroll', fixElement);
        }
      };

    $elClone.classList.add('clone');
    fixElement();
    window.addEventListener('scroll', fixElement);
  },
  // Функция табов-переключателей с accessibillity
  initTabs = function($btnsBlock, $textBlock) {
    if ($btnsBlock || $textBlock) {
      let tabsContents = $textBlock.constructor === Array ? $textBlock : $textBlock.children,
        tabs = $btnsBlock.children,
        tabFocus = 0,
        changeTabs = function(event) {
          let target = event.target;

          if (target.tagName === 'BUTTON') {
            let parent = target.parentNode,
              grandparent = parent.parentNode,
              tabContent = q('#' + target.getAttribute('aria-controls'), grandparent.parentNode);

            // Убираем выделение с кнопок
            qa('[aria-selected="true"]', parent, true)
              .forEach(function(el) {
                el.setAttribute('aria-selected', false);
                el.classList.remove('is-active');
              });

            // Скрываем все тексты
            qa('[role="tabpanel"]', grandparent, true)
              .forEach(function(el) {
                el.setAttribute('aria-hidden', true);
                el.classList.remove('is-active');
              });

            // Делаем активной текущую кнопку-таб
            target.setAttribute('aria-selected', true);
            target.classList.add('is-active');

            // Показываем контент переключателя
            tabContent.removeAttribute('aria-hidden');
            tabContent.classList.add('is-active');

            // Устанавливаем фокус
            for (let i = tabs.length - 1; i >= 0; i--) {
              if (tabs[i] === target) {
                tabFocus = i;
                break;
              }
            }
          }
        }

      $btnsBlock.addEventListener('click', changeTabs);
      $btnsBlock.addEventListener('keydown', function(event) {
        // Двигаемся вправо
        if (event.keyCode === 39 || event.keyCode === 37) {
          tabs[tabFocus].setAttribute('tabindex', -1);
          if (event.keyCode === 39) {
            tabFocus++;
            // Если дошли до конца, то начинаем сначала
            if (tabFocus >= tabs.length) {
              tabFocus = 0;
            }
            // Двигаемся влево
          } else if (event.keyCode === 37) {
            tabFocus--;
            // Если дошли до конца, то начинаем сначала
            if (tabFocus < 0) {
              tabFocus = tabs.length - 1;
            }
          }

          tabs[tabFocus].setAttribute('tabindex', 0);
          tabs[tabFocus].focus();
        }
      });
    }

  },
  // Прокрутка до элемента при помощи requestAnimationFrame
  scrollToTarget = function(event, target) {
    event.preventDefault();

    target = target || this.getAttribute('data-target');

    if (target.constructor === String) {
      target = q(target);
    }

    if (!target) {
      console.warn('Scroll target not found');
      return;
    }

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  };

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
          for (var i = faqBlocks.length - 1; i >= 0; i--) {
            faqBlocks[i].style.maxHeight = faqBlocks[i].children[0].scrollHeight + 'px';
          }
          return;
        }

        let parent = element.parentElement,
          activeElement = q('.active', faqList);

        parent&&parent.classList.add('active');
        activeElement&&activeElement.classList.remove('active');
        parent&&(parent.style.maxHeight = parent.scrollHeight + 'px');
        activeElement&&(activeElement.style.maxHeight = activeElement.children[0].scrollHeight + 'px');

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
  ;
  (function() {
    let mobileMenu = function(_) {
        let setMenuStyles = function(trf, trs) {
            let args = [trf, trs],
              props = ['transform', 'transition'],
              values = ['translate3d(' + trf + ', 0px, 0px)', 'transform ' + trs];
  
            for (let i = args.length - 1; i >= 0; i--) {
              if (args[i] !== 0) {
                if (args[i] === '') {
                  args[i] = '';
                } else {
                  args[i] = values[i];
                }
                menuCnt.style[props[i]] = args[i];
              }
            }
          },
          checkForString = function(variable) {
            return variable.constructor === String ? q(variable) : variable;
          },
          openMenu = function() {
            if (!opened) {
              menu.classList.add('active');
              openBtn.classList.add('active');
              menuCnt.scrollTop = 0;
  
              if (!fade) {
                setMenuStyles('0px', '.5s');
                menuWidth = menuCnt.offsetWidth;
              }
              if (!allowPageScroll) {
                pageScroll(true);
              }
            }
          },
          closeMenu = function(e, forSwipe) {
            if (opened) {
              let target = e && e.target;
              // Если меню открыто и произошел свайп или нет события (закрыто вызовом функции close()) или есть евент и его св-ва
              if (forSwipe || !e || (e.type === 'keyup' && e.keyCode === 27 || target === menu || target === closeBtn)) {
                menu.classList.remove('active');
                openBtn.classList.remove('active');
  
                if (!fade) {
                  setMenuStyles(initialTransformX, '.5s');
                }
              }
            }
          },
          swipeStart = function(e) {
            if (allowSwipe) {
              let evt = e.touches[0] || window.e.touches[0];
  
              isSwipe = isScroll = false;
              posInitX = posX1 = evt.clientX;
              posInitY = posY1 = evt.clientY;
              swipeStartTime = Date.now();
  
              menuCnt.addEventListener('touchend', swipeEnd);
              menuCnt.addEventListener('touchmove', swipeAction);
              setMenuStyles(0, '');
            }
          },
          swipeAction = function(e) {
            if (allowSwipe) {
              let evt = e.touches[0] || window.e.touches[0],
                style = menuCnt.style.transform,
                transform = +style.match(trfRegExp)[0];
  
              posX2 = posX1 - evt.clientX;
              posX1 = evt.clientX;
  
              posY2 = posY1 - evt.clientY;
              posY1 = evt.clientY;
  
              // Если еще не определено свайп или скролл (двигаемся в бок или вверх/вниз)
              if (!isSwipe && !isScroll) {
                let posY = Math.abs(posY2),
                  posX = Math.abs(posX2);
  
                if (posY > 7 || posX2 === 0) {
                  isScroll = true;
                } else if (posY < 7) {
                  isSwipe = true;
                }
              }
  
              if (isSwipe) {
                // Если двигаемся влево или вправо при уже открытом меню, фиксируем позицию
                if ((toLeft && posInitX > posX1) || (toRight && posInitX < posX1)) {
                  setMenuStyles('0px', 0);
                  return;
                }
                setMenuStyles(transform - posX2 + 'px', 0);
              }
            }
          },
          swipeEnd = function(e) {
            posFinal = posInitX - posX1;
  
            let absPosFinal = Math.abs(posFinal);
  
            swipeEndTime = Date.now();
  
            if (absPosFinal > 1 && isSwipe) {
              if (toLeft && posFinal < 0 || toRight && posFinal > 0) {
                if (absPosFinal >= menuWidth * swipeThreshold || swipeEndTime - swipeStartTime < 300) {
                  closeMenu(e, true);
                } else {
                  opened = false;
                  openMenu(e, true);
                }
              }
              allowSwipe = false;
            }
  
            menu.removeEventListener('touchend', swipeEnd);
            menu.removeEventListener('touchmove', swipeAction);
  
          },
          transitionEnd = function(e) {
            if (fade) {
              if (e.propertyName === 'opacity') {
                transitionEndEvents();
              }
            } else {
              if (e.propertyName === 'transform') {
                transitionEndEvents();
              }
            }
            allowSwipe = true;
          },
          transitionEndEvents = function() {
            if (opened) {
              opened = false;
              openBtn.addEventListener('click', openMenu);
              closeBtn.removeEventListener('click', closeMenu);
              if (!allowPageScroll) {
                pageScroll(false);
              }
            } else {
              opened = true;
              openBtn.removeEventListener('click', openMenu);
              closeBtn.addEventListener('click', closeMenu);
            }
          },
          init = function() {
            menu = checkForString(_.menu);
            menuCnt = checkForString(_.menuCnt);
            openBtn = checkForString(_.openBtn);
            closeBtn = checkForString(_.closeBtn);
            allowPageScroll = options.allowPageScroll;
            toRight = options.toRight;
            toLeft = options.toLeft;
            initialTransformX = toLeft ? '100%' : toRight ? '-100%' : 0;
            fade = options.fade;
  
            setListeners('add');
  
            if (fade) {
              toRight = toLeft = false;
            } else {
              setMenuStyles(initialTransformX, 0);
              menu.addEventListener('touchstart', swipeStart);
            }
          },
          setListeners = function(action) {
            openBtn[action + 'EventListener']('click', openMenu);
            menu[action + 'EventListener']('click', closeMenu);
            menu[action + 'EventListener']('transitionend', transitionEnd);
            document[action + 'EventListener']('keyup', closeMenu);
          },
          destroy = function() {
            if (opened) {
              closeMenu();
            }
  
            if (fade) {
              toRight = toLeft = false;
            } else {
              setMenuStyles('', '');
              menu.removeEventListener('touchstart', swipeStart);
            }
  
            setListeners('remove');
            menu = null;
            menuCnt = null;
            openBtn = null;
            closeBtn = null;
          },
          applyMediaParams = function() {
            // console.log('applyMediaParams');
            if (targetMediaQuery) {
              // console.log('set ' + targetMediaQuery + ' params');
              for (let option in responsive[targetMediaQuery]) {
                options[option] = responsive[targetMediaQuery][option];
              }
              currentMediaQuery = targetMediaQuery;
            } else { // set initial params
              for (let option in initialOptions) {
                options[option] = initialOptions[option];
              }
              currentMediaQuery = null;
            }
            if (menu) {
              destroy();
              init();
            }
          },
          checkMedia = function() {
            if (responsive) {
              targetMediaQuery = null;
              for (let mediaQuery in responsive) {
                if (media(mediaQuery)) {
                  targetMediaQuery = mediaQuery;
                }
              }
              if (targetMediaQuery !== currentMediaQuery) {
                applyMediaParams();
              }
            }
            if (!menu) {
              init();
            }
          },
          options = JSON.parse(JSON.stringify(_)),
          initialOptions = JSON.parse(JSON.stringify(_)),
          responsive = _.responsive,
          targetMediaQuery = null,
          currentMediaQuery = null,
          menu,
          menuCnt,
          openBtn,
          closeBtn,
          swipeStartTime,
          swipeEndTime,
          allowPageScroll,
          swipeThreshold = 0.5,
          toRight,
          toLeft,
          initialTransformX,
          fade,
          startPageY = pageYOffset,
          trfRegExp = /([-0-9.]+(?=px))/,
          isSwipe = false,
          isScroll = false,
          allowSwipe = false,
          opened = false,
          posX1 = 0,
          posX2 = 0,
          posY1 = 0,
          posY2 = 0,
          posInitX = 0,
          posInitY = 0,
          posFinal = 0,
          menuWidth = 0;
  
        if (_.menu) {
          // Элементы не изменяются через responsive
          checkMedia();
  
          windowFuncs.resize.push(checkMedia);
  
          // Если разрешена прокрутка, то закрываем при прокрутке
          // if (allowPageScroll) {
          //   windowFuncs.scroll.push(closeMenu);
          // }
  
          return {
            options: options,
            menu: menu,
            menuCnt: menuCnt,
            openBtn: openBtn,
            closeBtn: closeBtn,
            open: openMenu,
            close: closeMenu,
            destroy: destroy
          };
        }
      },
      burger = id('hdr-burger'),
      menuClose = id('menu-close');
  
  
    menu = mobileMenu({
      menu: id('menu'),
      menuCnt: q('.menu__cnt'),
      openBtn: burger,
      closeBtn: menuClose,
      fade: true,
      allowPageScroll: false
    });
  })();
  (function() {
    orderPopup = new Popup('.order-popup', {
      openButtons: '#calc-order-btn',
      closeButtons: '.order-popup__close'
    });
  
    orderPopup.addEventListener('popupbeforeclose', firstCalc);
  
    callbackPopup = new Popup('.callback-popup', {
      openButtons: '.hdr__callback, .ftr__callback, .about-step__btn, .menu__callback',
      closeButtons: '.callback-popup__close'
    });
  
    // orderPopup.openPopup();
  
    // thanksPopup.addEventListener('popupbeforeopen', function() {
    //   clearTimeout(thanksPopupTimer);
    // });
  
  // Закрытие всех попапов вместе с закрытием окна спасибо
    // thanksPopup.addEventListener('popupbeforeclose', function() {
    //   let otherPopups = [callbackPopup, orderPopup];
  
    //   for (let i = 0; i < otherPopups.length; i++) {
    //     if (otherPopups[i].classList.contains('active')) {
    //       otherPopups[i].closePopup();
    //     }
    //   }
    // });
  })()
  ;
  (function() {
    let $forms = [
      id('discount-form'),
      id('callback-form'),
      orderForm
    ];
  
    let formValidator = function(params) {
      let $form = params.form,
        $formBtn = params.formBtn,
        $uploadFilesBlock = params.uploadFilesBlock,
        errorsClass = 'invalid',
        $filesInput = params.filesInput,
        // Правила проверки форм, аналогично jquery.validate
        rules = {
          name: {
            required: true
          },
          tel: {
            required: true,
            pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
            or: 'email'
          },
          email: {
            required: true,
            pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
            or: 'tel'
          },
          msg: {
            required: true,
            pattern: /[^\<\>\[\]%\&'`]+$/
          },
          policy: {
            required: true
          }
        },
        messages = {
          tel: {
            required: 'Введите ваш телефон или E-mail',
            pattern: 'Укажите верный телефон'
          },
          name: {
            required: 'Введите ваше имя',
          },
          email: {
            required: 'Введите ваш E-mail или телефон',
            pattern: 'Введите верный E-mail'
          },
          msg: {
            required: 'Введите ваше сообщение',
            pattern: 'Введены недопустимые символы'
          },
          policy: {
            required: 'Согласитель с политикой обработки персональных данных'
          }
        },
        /*
          Функция получения значения полей у текущей формы.
          Ищет только те элементы формы, именя которых указаны в rules.
          Возвращает объект: 
          {название-поля: значение-поля}
          Например:
          {'user-email': 'mail@mail.ru'}
        */
        getFormData = function($form) {
          let formElements = $form.elements,
            values = {};
  
          for (let rule in rules) {
            let formElement = formElements[rule];
  
            if (formElement) {
              values[rule] = formElement.value;
            }
          }
  
          return values;
        },
        /*
          Функция проверки правильности заполнения формы.
        */
        validationForm = function(event) {
          let errors = {},
            thisForm = $form,
            values = getFormData(thisForm);
  
          for (let elementName in values) {
            let rule = rules[elementName],
              $formElement = thisForm[elementName],
              elementValue = values[elementName],
              or = rule.or,
              $orFormElement = thisForm[or];
  
            if (rule) {
              if ($formElement.hasAttribute('required') || rule.required === true) {
                let elementType = $formElement.type,
                  pattern = rule.pattern;
  
                // Если элемент не чекнут или пустой
                if (((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked) ||
                  elementValue === '') {
  
                  if (or && $orFormElement) {
                    if ($orFormElement.value === '') {
                      errors[elementName] = messages[elementName].required;
                      continue;
                    }
                  } else {
                    errors[elementName] = messages[elementName].required;
                    continue;
                  }
                }
  
                // Если текстовый элемент, у которого есть щаблон для заполнения
                if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
                  if (elementValue !== '' && pattern.test(elementValue) === false) {
                    errors[elementName] = messages[elementName].pattern;
                    continue;
                  }
                }
  
                hideError($formElement);
              }
            }
          }
  
          if (Object.keys(errors).length == 0) {
            thisForm.removeEventListener('change', validationForm);
            thisForm.removeEventListener('input', validationForm);
            $form.validatie = true;
          } else {
            thisForm.addEventListener('change', validationForm);
            thisForm.addEventListener('input', validationForm);
            showErrors(thisForm, errors);
            $form.validatie = false;
          }
  
        },
        showErrors = function($form, errors) {
          let $formElements = $form.elements;
  
          for (let elementName in errors) {
            let errorText = errors[elementName],
              $errorElement = `<label class="${errorsClass}">${errorText}</label>`,
              $formElement = $formElements[elementName],
              $nextElement = $formElement.nextElementSibling;
  
            if ($nextElement && $nextElement.classList.contains(errorsClass)) {
              if ($nextElement.textContent !== errorText) {
                $nextElement.textContent = errorText;
              }
              continue;
            } else {
              $formElement.insertAdjacentHTML('afterend', $errorElement);
            }
  
            $formElement.classList.add(errorsClass);
          }
  
        },
        hideError = function($formElement) {
          let $nextElement = $formElement.nextElementSibling;
          $formElement.classList.remove(errorsClass);
          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            $nextElement.parentElement.removeChild($nextElement);
          }
        },
        submitHandler = function(event) {
          let $form = event.target,
            eventType = event.type;
  
          if (!$form || $form && $form.tagName !== 'FORM') {
            $form = q('#' + event.detail.id + '>form');
          }
  
          if (eventType === 'wpcf7mailsent') {
            let $formElements = $form.elements;
  
            for (let i = 0; i < $formElements.length; i++) {
              hideError($formElements[i]);
              $formElements[i].classList.remove('filled');
            }
  
            // $form.reset();
            if ($uploadFilesBlock) {
              $uploadFilesBlock.innerHTML = '';
            }
            if ($form.classList.contains('order-form')) {
              let inputs = $form.elements;
  
              for (let i = 0, len = inputs.length; i < len; i++) {
                let inputName = inputs[i].name,
                  inp = inputs[i];
  
                if ((inputName === 'work[]' || inputName === 'extra-work[]' || inputName === 'added[]') && inp.hasAttribute('data-value')) {
                  inp.value = inp.getAttribute('data-value');
                  inp.removeAttribute('data-value');
                } else if (inputName === 'type') {
                  // Ищем селект, с дата-атрибутом
                  let selectedOption = q('option[data-value]', inp);
                  selectedOption.value = selectedOption.getAttribute('data-value');
                  selectedOption.removeAttribute('data-value');
                }
              }
  
              setTimeout(function() {
                $form.classList.remove('sent');
                orderPopup.closePopup();
                firstCalc();
              }, 3000);
            } else if ($form.classList.contains('callback-form')) {
              setTimeout(function() {
                callbackPopup.closePopup();
              }, 3000);
            }
            // if ($form === $quizForm) {
            //   id('quiz').resetQuiz();
            // }
            console.log('отправлено');
          }
  
          console.log('event', event);
  
          $form.classList.remove('loading');
  
          setTimeout(function() {
            $form.classList.remove('sent');
          }, 3000);
  
        },
        toggleInputsClass = function() {
          let $input = event.target,
            type = $input.type,
            files = $input.files,
            classList = $input.classList,
            value = $input.value;
  
          if (type === 'text' || $input.tagName === 'TEXTAREA') {
            if (value === '') {
              classList.remove('filled');
            } else {
              classList.add('filled');
            }
          } else if (type === 'file') {
            // $input.filesArray = [];
  
            let uploadedFiles = '';
            for (let i = 0, len = files.length; i < len; i++) {
              // $input.filesArray[i] = files[i];
              uploadedFiles += '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' + files[i].name + '</span></span>';
            }
            $uploadFilesBlock.innerHTML = uploadedFiles;
          }
        };
  
      $form.setAttribute('novalidate', '');
      $form.validatie = false;
      $formBtn.addEventListener('click', function() {
        validationForm();
        if ($form.validatie === false) {
          event.preventDefault();
        } else {
          $form.classList.add('loading');
          if ($form.classList.contains('order-form')) {
            let inputs = $form.elements;
  
            for (let i = 0, len = inputs.length; i < len; i++) {
              let inputName = inputs[i].name;
  
              if (inputName === 'work[]' || inputName === 'extra-work[]' || inputName === 'added[]') {
                inputs[i].setAttribute('data-value', inputs[i].value);
                inputs[i].value = inputs[i].parentElement.textContent;
              } else if (inputName === 'type') {
                let selectedOption = inputs[i][inputs[i].selectedIndex];
                selectedOption.setAttribute('data-value', selectedOption.value);
                selectedOption.value = selectedOption.textContent;
              }
            }
          }
  
        }
      });
      if (!document.wpcf7mailsent) {
        document.addEventListener('wpcf7mailsent', submitHandler);
        document.wpcf7mailsent = true;
      }
      $form.addEventListener('input', toggleInputsClass);
    };
  
    for (var i = $forms.length - 1; i >= 0; i--) {
      if ($forms[i]) {
        let id = $forms[i].id,
          eventName;
  
        formValidator({
          form: $forms[i],
          formBtn: q('button', $forms[i]),
          uploadFilesBlock: q('.uploadedfiles', $forms[i]),
          filesInput: q('input[type="file"]', $forms[i])
        });
  
        switch (id) {
          // Форма "оформить заявку" в калькуляторе
          case 'order-form':
            eventName = 'submit_form';
            break;
            // Фрма "Получите консультацию по ремонту"
          case 'discount-form':
            eventName = 'submit_consult';
            break;
            // Форма "Закажите обратный звонок" в попапе
          case 'callback-form':
            eventName = 'submit_call_back';
            break;
        }
  
        $forms[i].addEventListener('submit', function() {
          ym(32819272, 'reachGoal', eventName);
        });
      }
    }
  })();
  ;(function() {
    let setCursorPosition = function(pos, inputElement) {
      inputElement.focus();
      if (inputElement.setSelectionRange) {
        inputElement.setSelectionRange(pos, pos);
      } else if (inputElement.createTextRange) {
        let range = inputElement.createTextRange();
  
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
  
    mask = function() {
      let pattern = '+7(___)___-__-__',
        i = 0,
        def = pattern.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
  
      if (def.length >= val.length) {
        val = def;
      }
  
      this.value = pattern.replace(/./g, function(match) {
        return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
      });
  
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
          this.classList.remove('filled');
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    };
  
    let input = qa('[name=tel]');
  
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener('input', mask);
      input[i].addEventListener('focus', mask);
      input[i].addEventListener('blur', mask);
    }
  
  })();
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
  ;(function() {
    let pricesSect = q('.prices-sect');
    if (pricesSect) {
      let pricesBlocks = qa('.price-table-block__title', pricesSect);
  
      for (let i = 0, len = pricesBlocks.length; i < len; i++) {
        pricesBlocks[i].addEventListener('click', function() {
          let parent = pricesBlocks[i].parentElement,
            maxHeight = parent.classList.contains('active') ? 60 : parent.scrollHeight;
          parent.style.maxHeight = maxHeight + 'px';
          parent.classList.toggle('active');
        });
      }
    }  
  })();
  (function() {
    'use strict';
  
    var words = [
      [
        '', 'один', 'два', 'три', 'четыре', 'пять', 'шесть',
        'семь', 'восемь', 'девять', 'десять', 'одиннадцать',
        'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
        'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
      ],
      [
        '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
        'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
      ],
      [
        '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
        'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
      ]
    ];
  
    var rusRubles = ['рубль', 'рубля', 'рублей'];
  
    var belRubles = ['белорусский рубль', 'белорусских рубля', 'белорусских рублей'];
  
    var toFloat = function(number) {
      return parseFloat(number);
    };
  
    var plural = function(count, options) {
      if (options.length !== 3) {
        return false;
      }
  
      count = Math.abs(count) % 100;
      var rest = count % 10;
  
      if (count > 10 && count < 20) {
        return options[2];
      }
  
      if (rest > 1 && rest < 5) {
        return options[1];
      }
  
      if (rest === 1) {
        return options[0];
      }
  
      return options[2];
    };
  
    var parseNumber = function(number, count, currCode) {
      var first;
      var second;
      var numeral = '';
  
      if (number.length === 3) {
        first = number.substr(0, 1);
        number = number.substr(1, 3);
        numeral = '' + words[2][first] + ' ';
      }
  
      if (number < 20) {
        numeral = numeral + words[0][toFloat(number)] + ' ';
      } else {
        first = number.substr(0, 1);
        second = number.substr(1, 2);
        numeral = numeral + words[1][first] + ' ' + words[0][second] + ' ';
      }
  
      if (count === 0) {
        switch (currCode) {
          case 'BYN': {
            numeral = numeral + plural(number, belRubles);
            break;
          }
          case 'RU':
          default: {
            numeral = numeral + plural(number, rusRubles);
          }
        }
      } else if (count === 1) {
        if (numeral !== '  ') {
          numeral = numeral + plural(number, ['тысяча ', 'тысячи ', 'тысяч ']);
          numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
        }
      } else if (count === 2) {
        if (numeral !== '  ') {
          numeral = numeral + plural(number, ['миллион ', 'миллиона ', 'миллионов ']);
        }
      } else if (count === 3) {
        numeral = numeral + plural(number, ['миллиард ', 'миллиарда ', 'миллиардов ']);
      }
  
      return numeral;
    };
  
    var parseDecimals = function(number) {
      var text = plural(number, ['копейка', 'копейки', 'копеек']);
  
      if (number === 0) {
        number = '00';
      } else if (number < 10) {
        number = '0' + number;
      }
  
      return ' ' + number + ' ' + text;
    };
  
    var rubles = function(number, currCode) {
      if (!number) {
        return false;
      }
  
      var type = typeof number;
      if (type !== 'number' && type !== 'string') {
        return false;
      }
  
      if (type === 'string') {
        number = toFloat(number.replace(',', '.'));
  
        if (isNaN(number)) {
          return false;
        }
      }
  
      if (number <= 0) {
        return false;
      }
  
      var splt;
      var decimals;
  
      number = number.toFixed(2);
      if (number.indexOf('.') !== -1) {
        splt = number.split('.');
        number = splt[0];
        decimals = splt[1];
      }
  
      var numeral = '';
      var length = number.length - 1;
      var parts = '';
      var count = 0;
      var digit;
  
      while (length >= 0) {
        digit = number.substr(length, 1);
        parts = digit + parts;
  
        if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
          numeral = parseNumber(parts, count, currCode) + numeral;
          parts = '';
          count++;
        }
  
        length--;
      }
  
      numeral = numeral.replace(/\s+/g, ' ');
  
      if (decimals) {
        numeral = numeral + parseDecimals(toFloat(decimals));
      }
  
      return numeral;
    };
  
    var globals;
  
    if (typeof module !== 'undefined' && module !== null) {
      globals = exports;
    } else {
      globals = window;
    }
  
    globals.rubles = rubles;
  
  })();
  ;
  (function() {
    let calcSect = q('.calc-sect'),
      calcTourBtn = q('.calc__tour-btn'),
      calcScript = id('calc-script'),
      docForm = id('doc-form'),
      docFormBtn = id('doc-form-btn'),
      docFormLink = id('doc-form-link'),
      indexHeroBtn = q('.index-hero__btn');
  
  
    if (calcScript) {
      body.removeChild(calcScript);
  
      [calcTourBtn, indexHeroBtn].forEach(function(btn) {
        btn.addEventListener('click', function() {
          introJs().setOptions({
            steps: [{
              intro: 'Это калькулятор стоимости ремонта. С его помощью вы можете посчитать итоговую стоимость и&nbsp;сроки работ.',
              element: q('.calc-sect__title', calcSect)
            }, {
              intro: 'Выберете тип своей квартиры.',
              element: id('calc-group-type')
            }, {
              intro: 'Выберете необходимые вам работы. По нажатию на вопрос можно почитать описание.',
              element: id('calc-group-work')
            }, {
              intro: 'Вы так же можете выбрать дополнительные работы – штукатурку всех стен или ровнитель для пола.',
              element: id('calc-group-extra-work')
            }, {
              intro: 'А еще к стоимости можно добавить черновые или чистовые материалы.',
              element: id('calc-group-added')
            }, {
              intro: 'Стоимость и срок выполнения работ для выбранных вами услуг отображается здесь и фиксируется в договоре.',
              element: q('.calc-result__price-block', calcSect)
            }, {
              intro: 'Здесь можно оформить заявку.',
              element: id('calc-order-btn')
            }, {
              intro: 'А тут оформить кредит в Тинькоф Банке.',
              element: id('tinkoff-btn')
            }, {
              intro: 'Если нужно сразу создать договор – скачать его можно здесь.',
              element: id('doc-form-btn')
            }, {
              intro: '<span style="display:block;font-size:18px;text-align:center;margin:0 0 10px;">Оформляйте заявку и&nbsp;наслаждайтесь ремонтом!</span><img src="https://media.giphy.com/media/WYEWpk4lRPDq0/giphy.gif" alt="#" class="intro-js-image" />',
              element: id('calc')
            }]
          }).start();
        });
      });
  
      // https://i.giphy.com/media/E6jscXfv3AkWQ/giphy.webp
  
      // calcSect.addEventListener('lazyloaded', function() {
      // let script = document.createElement('script');
      // script.onload = function() {
      // calcTourBtn.addEventListener('click', function() {
      // if (media('(min-width:767.98px)')) {
      //   let step9 = q('.hdr.fixed .hdr__callback');
      //   if (step9) {
      //     step9.setAttribute('data-step', '9');
      //     step9.setAttribute('data-intro', 'А если вы запутались и не знаете, что вам нужно – закажите обратный звонок. Оставьте свои контакты здесь.');
      //   }
      // }
      // introJs().start();
      // });
      // calcTourBtn.classList.remove('disabled');
      // }
      // script.src = templateDir + '/js/intro.min.js';
      // calcSect.appendChild(script);
      // });
  
      docFormBtn.addEventListener('click', function(e) {
        docForm.classList.add('loading');
      });
  
      let randomInteger = function(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
      };
  
      firstCalc = function() {
        let calcResult = id('calc-result'),
          calcImg = id('calc-img'),
          calcPeriod = id('calc-period'),
          orderPopupType = id('order-popup-type'),
          orderPopupPrice = id('order-popup-price'),
          orderPopupPeriod = id('order-popup-term'),
          // checkedOption = q('.radio__inp[checked]', calcBlock),
          checkedOption = q('option[checked]', calcBlock),
          resultNumber = q('.calc-result__price-number'),
          imgNameTemplate = '%number%-%ceiling%-%floor%-%tile%-%plumbing%-%walls%-%windows%',
  
          docFormNumberInp = q('[name="number"]', docForm),
          docFormDateInp = q('[name="date"]', docForm),
          docFormSumInp = q('[name="sum"]', docForm),
          docFormSumTextInp = q('[name="sum-text"]', docForm),
          docFormTermInp = q('[name="term"]', docForm),
  
          appendixNumberInp = q('[name="appendix-number"]', docForm),
          appendixInputsBlock = q('.appendix-inputs', docForm),
          appendixInputsBlockChilds = appendixInputsBlock.children,
          appendixWorkInputs = qa('[name^="appendix-work"]', appendixInputsBlock),
          appendixPriceInputs = qa('[name^="appendix-price"]', appendixInputsBlock),
          appendixCostInputs = qa('[name^="appendix-cost"]', appendixInputsBlock),
          appendixTotalInp = q('[name="appendix-total"]', docForm),
          appendixTotalPriceInp = q('[name="appendix-total-price"]', docForm),
  
          imgName = '',
          imgSrc = '',
          flatType,
          checkedType,
          checkedWorks = {},
          checkedExtraWorks = {},
          term,
          sum,
          draftSum,
          finishSum,
          beautifyDigitsRegExp = /(\d)(?=(\d{3})+(?!\d))/g,
          // Окончания для вывода количества дней
          days = ['день', 'дня', 'дней'],
          workDays = ['рабочий', 'рабочих', 'рабочих'],
          beautifySum = function(input) {
            return (input + '').replace(beautifyDigitsRegExp, '$1 ');
          },
          calc = function(e) {
            docFormBtn.classList.remove('hide');
            docFormLink.classList.add('hide');
            let target = e.target || e,
              targetParent = target.parentElement,
              targetName = target.name || targetParent.name, // Родительский элемент для select
              targetValue = target.value,
              targetChecked = target.checked,
              targetText = target.textContent || targetParent.textContent,
              flatType = q('.calc__select').selectedOptions[0].textContent,
              checkedWorksInputs = qa('[name="work[]"]:checked, [name="extra-work[]"]:checked', calcBlock),
              checkedExtraWorksInputs = qa('[name="added[]"]:checked', calcBlock),
              allInputs = qa('input', calcBlock),
              checkedExtraWorksInputsLength = checkedExtraWorksInputs.length,
              checkedWorksInputsLength = checkedWorksInputs.length,
              calcValue = function(input) {
                let price = input['price'],
                  draft = input['draft'],
                  finish = input['finish'],
                  sum = 0;
  
                if (typeof input['price'] === 'string') {
                  // Добавляем стоимость
                  sum += +price;
                  // Добавляем стоимость черновых работ
                  if (checkedExtraWorks['draft'] === true) {
                    sum += +draft;
                    draftSum += +draft;
                  }
                  // Добавляем стоимость чистовых работ
                  if (checkedExtraWorks['finish'] === true) {
                    sum += +finish;
                    finishSum += +finish;
                  }
                  term += +input['term'];
                } else {
                  for (let i = 0, len = input.length; i < len; i++) {
                    sum += calcValue(input[i]);
                  }
                }
  
                return sum;
              };
  
            // Если нажимаем радио-кнопки
            if (targetName === 'type') {
              if (target.tagName === 'SELECT') {
                targetText = target[target.selectedIndex].textContent;
              }
              checkedType = calcTable[targetText];
              // Ставим номер квартиры (0 - студия. 1 - 1к кв и т.д.)
              imgName = imgNameTemplate.replace('%number%', targetValue);
              // Обновляем объект виды работ
              if (checkedWorksInputsLength > 0) {
                checkedWorks = {};
                for (let i = 0; i < checkedWorksInputsLength; i++) {
                  let text = checkedWorksInputs[i].parentElement.textContent,
                    value = checkedWorksInputs[i].value;
                  checkedWorks[text] = checkedType[text];
                  imgName = imgName.replace('%' + value + '%', value);
                }
              }
              // Обновляем объект дополнительных работ
              if (checkedExtraWorksInputsLength > 0) {
                checkedExtraWorks = {};
                for (let i = 0; i < checkedExtraWorksInputsLength; i++) {
                  let text = checkedExtraWorksInputs[i].parentElement.textContent;
                  checkedExtraWorks[checkedExtraWorksInputs[i].value] = true;
                }
              }
              // Если нажимаем чекбоксы "виды работ"
            } else if ((targetName === 'work[]' || targetName === 'extra-work[]') && checkedType) {
              if (targetChecked) {
                checkedWorks[targetText] = checkedType[targetText];
                imgName = imgName.replace('%' + targetValue + '%', targetValue);
              } else {
                delete checkedWorks[targetText];
                imgName = imgName.replace(targetValue, '%' + targetValue + '%');
              }
  
              // console.log(target.value);
            }
            // Если нижимаем чекбоксы "добавить к стоимости"
            else if (targetName === 'added[]' && checkedType) {
              checkedExtraWorks[targetValue] = targetChecked;
            }
  
            // Очищаем инпуты для приложения
            for (let i = 0, len = appendixInputsBlockChilds.length; i < len; i++) {
              appendixInputsBlockChilds[i].value = appendixInputsBlockChilds[i].name.indexOf('work') === -1 ? '&#8212;&#8212;&#8212;&#8212;&#8212;' : '__________________________________________';
            }
  
            // Ставим стоимость в калькулятор
            sum = 0;
            term = 0; // кол-во дней (сроки работ)
            draftSum = 0; // сумма черновых работ
            finishSum = 0; // сумма чистовых рабтот
            for (let key in checkedWorks) {
              sum += calcValue(checkedWorks[key]);
            }
            let k = (term % 100 > 4 && term % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(term % 10 < 5) ? term % 10 : 5];
  
            orderPopupType.textContent = flatType;
            orderPopupPeriod.innerHTML = calcPeriod.innerHTML = term + '&nbsp' + workDays[k] + '&nbsp' + days[k];
            calcResult.value = beautifySum(sum);
            orderPopupPrice.innerHTML = resultNumber.innerHTML = calcResult.value.replace(' ', '&nbsp;');
  
            docFormNumberInp.value = docFormNumberInp.getAttribute('data-initial-value') + randomInteger(1, 9);
            docFormSumInp.value = calcResult.value + ' рублей';
            docFormSumTextInp.value = rubles(sum);
            docFormTermInp.value = term;
  
            appendixNumberInp.value = docFormNumberInp.value;
            appendixTotalInp.value = calcResult.value;
            appendixTotalPriceInp.value = calcResult.value + ' рублей';
  
            tinkoffBtn.onclick = function() {
              tinkoff.create({
                shopId: '7250c9d5-4a56-400e-9a8c-e881c31ad707',
                showcaseId: 'd81c22d1-03e4-49d3-a208-5a6a7761be67',
                demoFlow: 'sms',
                items: [{
                  name: 'Услуга «Ремонт в ' + flatType.toLowerCase()
                    .replace('квартира', 'квартире')
                    .replace('студия', 'студии')
                    .replace('комнатная', 'комнатной') + '»',
                  price: sum,
                  quantity: 1
                }, ],
                sum: sum
              });
            }
  
            imgSrc = templateDir + '/img/calc/' + imgName.replace(/-%.*?%/g, '') + '.jpg';
  
            if (calcImg.src !== imgSrc) {
              if (calcImg.src[calcImg.src.length - 1] === '#') {
                let observer = new IntersectionObserver(function(entries, observer) {
                  if (entries[0].isIntersecting) {
                    calcImg.src = imgSrc;
                    observer.unobserve(calcImg);
                  }
                }, { threshold: 0.5 });
                observer.observe(calcImg);
              } else {
                calcImg.src = imgSrc;
              }
            }
  
            for (let i = 0, j = 0, len = allInputs.length; i < len; i++) {
              let inputParent = allInputs[i].parentElement,
                parentNextEl = inputParent.nextElementSibling,
                inputIsCheked = allInputs[i].checked,
                hint = parentNextEl,
                price;
  
              inputParent.classList.toggle('checked', inputIsCheked);
  
              if (inputIsCheked) {
                // ! Чистовые и черновые работы считаются в функции calcValue()
  
                if (hint.hasAttribute('data-hint')) {
                  hint = hint.getAttribute('data-hint');
  
                  price = calcTable[flatType][inputParent.textContent];
  
                  if (price) {
                    if (typeof price.price === 'string') {
                      price = price.price;
                    } else {
                      let tempPrice = 0;
                      for (let k = 0, len = price.length; k < len; k++) {
                        tempPrice += +price[k].price;
                      }
                      price = tempPrice;
                    }
                  } else {
                    if (inputParent.textContent.indexOf('Черн') !== -1) {
                      price = draftSum;
                    } else if (inputParent.textContent.indexOf('Чист') !== -1) {
                      price = finishSum;
                    }
                  }
  
                }
  
                appendixWorkInputs[j].value = inputParent.textContent + ' (' + hint.toLowerCase() + ')';
                appendixPriceInputs[j].value = beautifySum(price);
                appendixCostInputs[j].value = beautifySum(price);
                j++;
              }
            }
  
            // for (el of docForm.elements) {
            //   console.log(el.value);
            // }
          };
  
        calc(checkedOption);
        calcBlock.addEventListener('change', calc);
      }
  
  
      firstCalc();
    }
  
  })();



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