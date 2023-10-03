$(function () {
  'use strict';

  //=========== نمایش Toast ===============
  $('.show-toast').click(function (e) {
    e.preventDefault();

    // اجرا بدون ورودی دیتا
    // ShowToast();

    // اجرا با ورودی
    ShowToast('bottom-left', 2000, true, 'error', 'ارور نمایش داده شد');
  });
});

//============== نمایش Toast =================
const ShowToast = async (position, timer, progressBar, icon, text) => {
  if (
    position == '' ||
    timer == null ||
    progressBar == null ||
    icon == null ||
    text == null
  ) {
    this.position = 'top-end';
    this.timer = 3000;
    this.progressBar = true;
    this.icon = 'success';
    this.text = 'با موفقیت اجرا شد !!!';
  } else {
    this.position = position;
    this.timer = timer;
    this.progressBar = progressBar;
    this.icon = icon;
    this.text = text;
  }

  const Toast = await Swal.mixin({
    toast: true,
    position: `${this.position}`,
    showConfirmButton: false,
    timer: this.timer,
    timerProgressBar: this.progressBar,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: `${this.icon}`,
    title: `${this.text}`,
  });
};
//============== نمایش Toast =================
