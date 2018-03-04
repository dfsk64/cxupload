$.extend({
    cxupload: function (settings) {
        $('#' + settings.id).on('change', function () {
            var fileList = $(this)[0].files;
            var fd = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                fd.append(settings.file, fileList[i]);
            }
            $.ajax({
                type: "post",
                url: settings.url,
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    settings.success(data);
                },
                error: function () {
                    settings.error();
                }
            });
        });
    }
})