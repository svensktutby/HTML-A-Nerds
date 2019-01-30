(function () {
  function $(el) {
    return document.querySelector(el);
  }

  function $$(el) {
    return document.querySelectorAll(el);
  }

  /* Slider
   ******************************/
  var slides = $$('.feature');
  var btnSlides = $$('.features__control');
  var slideIndex = 0;
  
  toggleSlides(slideIndex);

  if (btnSlides) {
    for (var i = 0; i < btnSlides.length; i++) {
      currentBtn(i);
    }
  }

  function currentBtn(n) {
    btnSlides[n].addEventListener('click', function (event) {
      event.preventDefault();

      currentSlide(n);
    });
  }

  function currentSlide(n) {
    toggleSlides(slideIndex = n);
  }

  function toggleSlides(n) {
    if (n > slides.length - 1) {
      slideIndex = 0;
    }
    if (n < 0) {
      slideIndex = slides.length - 1;
    }
    for (var j = 0; j < slides.length; j++) {
      var slide = slides[j];

      if (slide.classList.contains('feature--current')) {
        slide.classList.remove('feature--current');
      }
    }
    for (var i = 0; i < btnSlides.length; i++) {
      var btn = btnSlides[i];

      if (btn.classList.contains('features__control--current')) {
        btn.classList.remove('features__control--current');
      }
    }
    if (slides[slideIndex]) {
      slides[slideIndex].classList.add('feature--current');
    }
    if (btnSlides[slideIndex]) {
      btnSlides[slideIndex].classList.add('features__control--current');
    }
  }


  /* Modal Write us
   ******************************/
  var openWriteUs = $('.contacts__btn');
  var modalOverlay = $('.modal-overlay');
  var modalWriteUs = $('.modal-write-us');

  if (modalWriteUs) {
    var formWriteUs = modalWriteUs.querySelector('.modal-write-us__form');
    var closeWriteUs = modalWriteUs.querySelector('.modal-close');
    var userNameWriteUs = formWriteUs.querySelector('#user-name-write-us');
    var emailWriteUs = formWriteUs.querySelector('#email-write-us');
    var messageWriteUs = formWriteUs.querySelector('#message-write-us');
    var storageName = localStorage.getItem('userNameWriteUs');
    var storageEmail = localStorage.getItem('emailWriteUs');

    openWriteUs.addEventListener('click', function (event) {
      event.preventDefault();

      openWriteUsWindow();
    });

    formWriteUs.addEventListener('submit', function () {
      fillFieldsForm();
      errorFillForm();
    });

    closeWriteUs.addEventListener('click', function (event) {
      event.preventDefault();

      closeWriteUsWindow();
    });

    modalOverlay.addEventListener('click', function () {
      closeWriteUsWindow();
    });

    modalWriteUs.addEventListener('click', function (event) {
      event.stopPropagation();
    });

    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        closeWriteUsWindow();
      }
    });
  }

  function openWriteUsWindow() {
    if (!modalOverlay.classList.contains('modal-overlay--shown')) {
      modalOverlay.classList.add('modal-overlay--shown');

      if (storageName && !storageEmail) {
        userNameWriteUs.value = storageName;
        emailWriteUs.focus();
      } else if (storageName && storageEmail) {
        userNameWriteUs.value = storageName;
        emailWriteUs.value = storageEmail;
        messageWriteUs.focus();
      } else {
        userNameWriteUs.focus();
      }
    }
  }

  function fillFieldsForm() {
    if (userNameWriteUs.value || emailWriteUs.value || messageWriteUs.value) {
      localStorage.setItem('userNameWriteUs', userNameWriteUs.value);
      localStorage.setItem('emailWriteUs', emailWriteUs.value);
    }
  }

  function errorFillForm() {
    if (!userNameWriteUs.value || !emailWriteUs.value || !messageWriteUs.value) {
      event.preventDefault();

      modalWriteUs.classList.remove('modal-write-us--error');
      modalWriteUs.offsetWidth = modalWriteUs.offsetWidth;
      modalWriteUs.classList.add('modal-write-us--error');
    }
    console.log(userNameWriteUs.value, emailWriteUs.value, messageWriteUs.value);
  }

  function closeWriteUsWindow() {
    if (modalOverlay.classList.contains('modal-overlay--shown')) {
      modalOverlay.classList.remove('modal-overlay--shown');
      modalOverlay.classList.add('modal-overlay--hidden');

      if (modalWriteUs.classList.contains('modal-write-us--error')) {
        modalWriteUs.classList.remove('modal-write-us--error');
      }

      setTimeout(function () {
        modalOverlay.classList.remove('modal-overlay--hidden');
      }, 450);
    }
  }
})();