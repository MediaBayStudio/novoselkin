;
(function() {
  let calcSect = q('.calc-sect'),
    calcTourBtn = q('.calc__tour-btn'),
    calcScript = id('calc-script'),
    docForm = id('doc-form'),
    docFormBtn = id('doc-form-btn'),
    docFormLink = id('doc-form-link'),
    indexHeroBtn = q('.index-hero__btn') || id('about-hero-btn');


  if (calcScript) {
    console.log(calcScript);
    body.removeChild(calcScript);

    [calcTourBtn, indexHeroBtn].forEach(function(btn) {
      btn.addEventListener('click', function() {
        introJs().setOptions({
          scrollTo: 'tooltip',
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
            element: id('calc-group-type')
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