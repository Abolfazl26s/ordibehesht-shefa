$(function () {
  let lang = localStorage.getItem('languagePage');

  if (lang === null) {
    localStorage.setItem('languagePage', 'ar');
    window.location.reload();
  }

  $('html').attr('lang', lang);
  if (lang === 'en') {
    $('html').attr('dir', 'ltr');

    // change style to LTR style
    $('[data-name="bootstarp"]').attr('href', 'assets/css/bootstrap.min.css');
    $('[data-name="meanmenu"]').attr('href', 'assets/css/meanmenu-ltr.css');
    if ($('[href="assets/css/rtl.css"]')) {
      $('[href="assets/css/rtl.css"]').remove();
    }

    // for arrow in accordion
    $('.accordion-header .accordion-button').addClass('active');

    $('.footer-area').css(
      'background-image',
      'url("/assets/images/footer-bg-ltr.jpg")',
    );

    $('[src="assets/js/main.js"]').remove();
    let script = document.createElement('script');
    script.src = 'assets/js/main-ltr.js';
    document.body.appendChild(script);
  }
  //================== direction TO RTL=============
  else {
    $('html').attr('dir', 'rtl');

    // change style to RTL style
    $('[data-name="bootstarp"]').attr(
      'href',
      'assets/css/bootstrap.rtl.min.css',
    );
    $('[data-name="meanmenu"]').attr('href', 'assets/css/meanmenu.css');
    // append rtl style to head
    $('head').append('<link rel="stylesheet" href="assets/css/rtl.css">');

    // for arrow in accordion
    if ($('.accordion-header .accordion-button').hasClass('active')) {
      $('.accordion-header .accordion-button').removeClass('active');
    }

    $('.footer-area').css(
      'background-image',
      'url("/assets/images/footer-bg.jpg")',
    );

    $('[src="assets/js/main-ltr.js"]').remove();
    let script = document.createElement('script');
    script.src = 'assets/js/main.js';
    document.body.appendChild(script);
  }
  $('.changeLang').val(lang);
  $('.changeLang').niceSelect('update');

  $('.changeLang').on('change', function () {
    window.location.reload();
    localStorage.removeItem('languagePage');
    localStorage.setItem('languagePage', this.value);
  });
});
