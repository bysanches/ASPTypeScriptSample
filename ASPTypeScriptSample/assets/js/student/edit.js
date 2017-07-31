jQuery(function ($) {
    $('#studentForm').validate({
        errorClass: 'has-danger',
        validClass: 'has-success',
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass(validClass).addClass(errorClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').addClass(validClass).removeClass(errorClass);
        },
        errorPlacement: function (error, element) {
            error.addClass('form-control-feedback');
            element.closest('.form-group').append(error);
        }
    });
});