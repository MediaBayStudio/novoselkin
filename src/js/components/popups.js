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