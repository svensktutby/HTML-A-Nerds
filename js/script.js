window.addEventListener('DOMContentLoaded', function() {
  function $(el) {
    return document.querySelector(el);
  }

  function $$(el) {
    return document.querySelectorAll(el);
  }

  /* Slider
   ******************************/
  var slidesBlock = $('.features'),
      slides = $$('.features__item'),
      slidesBtn = $$('.features__control');

  function hideSlide (a) {
    for (var i = a; i < slides.length; i++) {
      slides[i].classList.remove('feature--current');
      slidesBtn[i].classList.remove('features__control--current');
    }
  }

  hideSlide(1);

  function showSlide(b) {
    if (!slides[b].classList.contains('feature--current')) {
      hideSlide(0);
      slides[b].classList.add('feature--current');
      slidesBtn[b].classList.add('features__control--current');
    }
  }

  if (slidesBlock) {
    slidesBlock.addEventListener('click', function(event) {
      var target = event.target;
      for (var i = 0; i < slidesBtn.length; i++) {
        if (target.matches('.features__control') && target == slidesBtn[i]) {
          showSlide(i);
          break;
        }
      }
    });
  }

  /* Modal Write us
   ******************************/
  var openWriteUs = $('.contacts__btn'),
      modalOverlay = $('.modal-overlay'),
      modalWriteUs = $('.modal-write-us');

  if (modalWriteUs) {
    var formWriteUs = modalWriteUs.querySelector('.modal-write-us__form');
    var closeWriteUs = modalWriteUs.querySelector('.modal-close');
    var userNameWriteUs = formWriteUs.querySelector('#user-name-write-us');
    var emailWriteUs = formWriteUs.querySelector('#email-write-us');
    var messageWriteUs = formWriteUs.querySelector('#message-write-us');
    var isStorageSupport = true;
    var storageName = '';
    var storageEmail = '';

    try {
      storageName = localStorage.getItem('userNameWriteUs');
      storageEmail = localStorage.getItem('emailWriteUs');
    } catch (error) {
      isStorageSupport = false;
    }

    openWriteUs.addEventListener('click', function (event) {
      event.preventDefault();

      openWriteUsWindow();
    });

    modalOverlay.addEventListener('click', function (event) {
      if (event.target === modalOverlay || event.target === closeWriteUs) {
        closeWriteUsWindow();
      } else {
        event.stopPropagation();
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.keyCode === 27) {
        closeWriteUsWindow();
      }
    });

    if (formWriteUs) {
      formWriteUs.addEventListener('submit', function (event) {
        if (userNameWriteUs.value && emailWriteUs.value && messageWriteUs.value) {
          if (isStorageSupport) {
            localStorage.setItem('userNameWriteUs', userNameWriteUs.value);
            localStorage.setItem('emailWriteUs', emailWriteUs.value);
          }
        } else {
          event.preventDefault();

          modalWriteUs.classList.remove('modal--error');
          modalWriteUs.offsetWidth = modalWriteUs.offsetWidth;
          modalWriteUs.classList.add('modal--error');
        }
      });
    }
  }

  function openWriteUsWindow() {
    if (modalOverlay.classList.contains('visually-hidden')) {
      modalOverlay.classList.remove('visually-hidden');

      if (modalOverlay.classList.contains('modal-overlay--hidden')) {
        modalOverlay.classList.remove('modal-overlay--hidden');
      }
      
      modalOverlay.classList.add('modal-overlay--shown');
      document.body.style.overflow = 'hidden';

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

  function closeWriteUsWindow() {
    if (!modalOverlay.classList.contains('visually-hidden')) {
      modalOverlay.classList.remove('modal-overlay--shown');
      modalOverlay.classList.add('modal-overlay--hidden');
      document.body.style.overflow = '';

      if (modalWriteUs.classList.contains('modal--error')) {
        modalWriteUs.classList.remove('modal--error');
      }

      window.setTimeout(function () {
        modalOverlay.classList.add('visually-hidden');
      }, 1190);
    }
  }
});