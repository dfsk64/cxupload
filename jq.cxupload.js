$.extend({
    cxupload: function (settings) {
        var form = $("<form id='cxuploadform_" + settings.id + "' method='POST' enctype='multipart/form-data'></form>");
        var file = $('#' + settings.id);
        $(file).appendTo(form);
        $(form).appendTo('body');
        file.on('change', function () {
            var options = {
                url: settings.url,
                beforeSubmit: function () { },  //提交前处理 
                success: function (data) {
                    settings.success(data);
                },
                resetForm: true,
                dataType: 'json'
            };

            form.ajaxSubmit(options);
            return false;
        });
    }
})