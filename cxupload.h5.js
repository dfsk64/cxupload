var cxupload = function (settings) {
    var input = document.getElementById(settings.id),
        fd = new FormData(),
        req;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //上传进度条
    req.upload.addEventListener('progress', function (e) {
        if (e.lengthComputable) {
            console.log('uploading...' + Math.round((e.loaded / e.total) * 100));
        }
    });
    //上传完成
    req.upload.addEventListener('load', function (e) {
        console.log('completed');
    });
    //错误事件
    req.upload.addEventListener('error', function (e) {
        console.log('error');
    });
    //请求回调
    req.addEventListener('readystatechange', function (e) {
        if (this.readyState === 4) {
            if (this.status === 200) {
                settings.success(JSON.parse(req.responseText));
            } else {
                settings.error();
            }
        }
    });
    //发送请求
    input.addEventListener('change', function () {
        var i = 0,
            files = input.files;
        for (i = 0; i < files.length; i++) {
            fd.append(settings.name, files[i]);
        }
        req.open('POST', settings.url, true);
        req.setRequestHeader('Cache-Control', 'no-cache');
        req.send(fd);
    });

}