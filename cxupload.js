$.extend({
    cxupload: function (conf) {
        $('#' + conf.fileId).on('change', function () {
            var fileList = $(this)[0].files;
            var fd = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                fd.append(conf.file, fileList[i]);
            }
            $.ajax({
                type: "post",
                url: conf.url,
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    conf.success(data);
                },
                error: function () {
                    conf.error();
                }
            });
        });
    }
})