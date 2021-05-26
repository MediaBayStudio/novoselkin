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