$(function() {
  $(document).ready(function() {
    const pathName = window.location.pathname;
    $('.nav-treeview .nav-item a').each(function() {
      const href = $(this).attr('href');
      if (pathName === href) {
        $(this).addClass('active-staff-info');
      }
    })
  });

  $.validator.addMethod('is_valid_password', function (value = '', element) {
    if (!value) {
      return true;
    }

    if (!value.match(/[0-9]/g)) {
      return false;
    }

    if (!value.match(/[a-z]/g)) {
      return false;
    }

    if (!value.match(/[A-Z]/g)) {
      return false;
    }

    if (!value.match(/[!@#$%^&*()?]/g)) {
      return false;
    }

    if (value.length < 8) {
      return false;
    }

    return true;
  }, 'Invalid password format.')
});
