$(function () {
  ('use strict');

  //  click btn-authenticated and btn-login
  $('#btn-authenticated').click(function (e) {
    e.preventDefault();
    Login();
  });
  $('.btn-login').click(function (e) {
    e.preventDefault();
    Login();
  });
});

function getDataFromUrl(url, divToUpdate) {
  $.ajax({
    method: 'Get',
    url: url,
    dataType: 'html',
    success: function (data) {
      divToUpdate.innerHTML = data;
    },
  });
}

// ======= send verifyKey ===========
const sendCodeVerify = (number) => {
  setInterval(() => {
    if (parseInt(number) > 0) {
      number = number - 1;

      if (number === 0) {
        clearInterval(number);

        $('#btnResend').removeAttr('disabled');
      }

      document.querySelector('#reSendCode').innerText = number;
    }
  }, 1000);
};

// ========= function Login ===============
function Login() {
  console.log('Login');
  return swal
    .fire({
      title: '<h3 class="card-title float-start">ورود به سایت</h3><hr>',
      width: 600,
      didOpen: () => {
        getDataFromUrl(url, '#Login-Frm');
      },
      html: `
        <p class="alert alert-info">فیلد های اجباری با <span class="text-danger">*</span> مشخص شده است !!!</p>

        <div id="Login-Frm" class="d-flex align-items-center text-start justify-content-center flex-wrap gap-3">
          <form id="frm-login" class="form-horizontal w-100" action="">
          <div class="form-group mb-3">
          <label for="userName" class="form-label float-start">نام کاربری <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="userName" placeholder="نام کاربری">
          </div>
          
          <div class="form-group mb-3">
          <label for="userPass" class="form-label float-start">رمز عبور <span class="text-danger">*</span></label>
          <input type="password" class="form-control" id="userPass" placeholder="رمزعبور">
          </div>
          </form>
        </div>

        <div style="font-size: 15px" class="d-flex w-100 mt-2 text-right align-items-center justify-content-start flex-column gap-3">        
          <div class="input-group rememberMe">           
           <label>
            <input type="checkbox" class="option-input checkbox" checked />
            مرا بخاطر بسپار
          </label>
          </div>

          <a href="#" id="btn-forgotPassword" class="me-auto">فراموشی رمز عبور</a>
        </div>
        
      `,
      footer: `<a href="#" style="font-size:15px;"" id="btn-register">در صورتی که قبلا ثبت نام نکرده اید <strong class="text-danger">اینجا ( عضویت )</strong> کلیک کنید.</a>`,
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'ورود به سایت',
      cancelButtonText: 'بستن',
      preConfirm: () => {
        const userName = $('#userName').val();
        const userPass = $('#userPass').val();
        if (userName || userPass) {
          // Handle return value
        } else {
          Swal.showValidationMessage('لطفا اطلاعات خود را وارد کنید !');
        }
      },
      didOpen: () => {
        // click btn-register
        $('#btn-register').click(function (e) {
          e.preventDefault();
          Register();
        });

        // click btn-forgotPassword
        $('#btn-forgotPassword').click(function (e) {
          e.preventDefault();
          forgotPassword();
        });
      },
    })
    .then((res) => {
      if (res.isConfirmed) {
        return $('#frm-login').submit();
      }
    });
}

// ======= register form and confirm code sender
function Register() {
  console.log('Register');
  swal
    .fire({
      title: '<h3 class="card-title float-start">عضویت در سایت</h3><hr>',
      width: 600,
      html: `
        <p class="alert alert-info">فیلد های اجباری با <span class="text-danger">*</span> مشخص شده است !!!</p>

        <div class="d-flex align-items-center justify-content-center flex-wrap gap-3">
          <form id="frm-register" class="form-horizontal w-100" action="">
          <div class="form-group mb-3">
          <label for="userName" class="form-label float-start">نام کاربری <span class="text-danger">*</span></label>
          <input type="text" class="form-control" id="userName" placeholder="نام کاربری">
          </div>
          
          <div class="form-group mb-3">
          <label for="userPass" class="form-label float-start">رمز عبور <span class="text-danger">*</span></label>
          <input type="password" class="form-control" id="userPass" placeholder="رمزعبور">
          </div>

          <div class="form-group mb-3">
          <label for="userPassConfirm" class="form-label float-start">تکرار رمز عبور <span class="text-danger">*</span></label>
          <input type="password" class="form-control" id="userPassConfirm" placeholder="تکرار رمز عبور">
          </div>
          </form>
        </div>

        
      `,
      footer: `<a href="#" style="font-size:15px;" class="btn-login" id='btn-login'>در صورتی که قبلا ثبت نام کرده اید <strong class="text-danger">اینجا (ورود)</strong> کلیک کنید.</a>`,
      showCloseButton: true,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: ' عضویت',
      cancelButtonText: 'بستن',
      preConfirm: () => {
        const userName = $('#userName').val();
        const userPass = $('#userPass').val();
        const userPassConfirm = $('#userPassConfirm').val();
        if (!userName || !userPass || !userPassConfirm) {
          Swal.showValidationMessage('لطفا اطلاعات خود را وارد کنید !');
        }
      },
      didOpen: () => {
        $('#btn-login').click(function (e) {
          e.preventDefault();
          Login();
        });
      },
    })
    .then((res) => {
      if (res.isConfirmed) {
        sendVerifyKey();
      }
    });
}

// ============ send verifyKey ================
function sendVerifyKey() {
  swal
    .fire({
      showCancelButton: true,
      cancelButtonText: 'انصراف',
      confirmButtonText: 'تایید کد',
      title: '<h3 class="card-title float-start">کد فعالسازی</h3><hr>',
      text: 'لطفا کد پیامک شده را در فیلد زیر وارد نمایید.',
      html: `
          <form id="frm-verifyKey">
          <label for="verifyKey" class="form-label float-start">کد تایید</label>
          <input type="text" class="form-control" id="verifyKey" >
          </form>

          <button disabled id="btnResend" class="btn mt-3 btn-primary">ارسال مجدد کد تایید (<span id="reSendCode">5</span> ثانیه)</button>
          `,
      didOpen: () => {
        let number = $('span#reSendCode').text();
        sendCodeVerify(number);

        $('#btnResend').click(function (e) {
          e.preventDefault();
          $(this).attr('disabled', 'disabled');
          sendCodeVerify(number);
        });
      },
      preConfirm: () => {
        const verifyKey = $('#verifyKey').val();
        if (!verifyKey) {
          Swal.showValidationMessage('لطفا کد پیامک شده را وارد نمائید');
        } else {
          // اجرا با ورودی
          ShowToast(
            'top-right',
            5000,
            true,
            'success',
            'کاربر گرامی به مسیر نجات خوش آمدید.',
          );
        }
      },
    })
    .then(() => {
      // submit form
    });
}

// =============== forgotPassword =============
function forgotPassword() {
  return swal
    .fire({
      showCancelButton: true,
      cancelButtonText: 'انصراف',
      confirmButtonText: 'ارسال کد تایید',
      title: '<h3 class="card-title float-start">فراموشی رمز عبور</h3><hr>',
      text: 'لطفا شماره تماس خود را جهت ارسال کد وارد نمائید',
      html: `
          <form id="frm-sendCodeChangePass">
          <label for="phoneNumber" class="form-label float-start">شماره تماس</label>
          <input type="text" class="form-control" id="phoneNumber" >
          </form>`,
      preConfirm: () => {
        const phoneNumber = $('#phoneNumber').val();
        if (!phoneNumber) {
          Swal.showValidationMessage('لطفا شماره تماس را وارد نمائید');
        } else {
          // submit form
        }
      },
    })
    .then(async () => {
      await ShowToast('top-right', 5000, true, 'info', 'کد فعالسازی ارسال شد');

      setTimeout(() => {
        swal
          .fire({
            title:
              '<h3 class="card-title float-start">فراموشی رمز عبور</h3><hr>',
            html: `
            <p class="alert alert-info">کد فعالسازی برای شما ارسال شده است !!!</p>

                <div class="d-flex align-items-center justify-content-center flex-wrap gap-3">
                <form id="frm-forgotPass" class="form-horizontal w-100" action="">
                <div class="form-group mb-3">
                <label for="confirmCode" class="form-label float-start">کد پیامک شده<span class="text-danger">*</span></label>
                <input type="text" class="form-control" id="confirmCode" placeholder="کد پیامک شده">
                </div>
                
                <div class="form-group mb-3">
                <label for="userPass" class="form-label float-start">رمز عبور <span class="text-danger">*</span></label>
                <input type="password" class="form-control" id="userPass" placeholder="رمزعبور">
                </div>

                <div class="form-group mb-3">
                <label for="userPassConfirm" class="form-label float-start">تکرار رمز عبور <span class="text-danger">*</span></label>
                <input type="password" class="form-control" id="userPassConfirm" placeholder="تکرار رمز عبور">
                </div>
                </form>
              </div>
            `,
            preConfirm: () => {
              const confirmCode = $('#confirmCode').val();
              const userPass = $('#userPass').val();
              const userPassConfirm = $('#userPassConfirm').val();
              if (!confirmCode || !userPass || !userPassConfirm) {
                Swal.showValidationMessage('لطفا اطلاعات خود را وارد کنید !');
              }
            },
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            confirmButtonText: 'ویرایش رمز',
          })
          .then((t) => {
            t.value &&
              ShowToast(
                'top-right',
                5000,
                true,
                'success',
                'رمز عبور با موفقیت ویرایش شد.',
              );
          });
      }, 500);
    });
}
