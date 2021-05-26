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