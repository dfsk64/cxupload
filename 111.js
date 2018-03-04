  function doObjUploadExplorer(url, lnk_id, file, progress, success, content, frm, div_dlg, start_func){
    var file_input = null,
      frm_data = new FormData(),
      req;

    try {
        //firefox, chrome, safari etc
        req = new XMLHttpRequest();
    }

    catch (e) {
        // Internet Explorer Browsers
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }


if (document.getElementById(file)) {
    file_input = document.getElementById(file);

    for (var i = 0; i < file_input.files.length; ++i) {
        frm_data.append(file, file_input.files[i]);
    }
}

req.upload.addEventListener('progress', function(e) {  //Event called while upload is in progress
    if (progress !== undefined
            && e.lengthComputable) {
        $('#' + progress).html('<font>Uploading... ' + Math.round((e.loaded / e.total) * 100) + '%</font>');
    }
});

req.upload.addEventListener('load', function(e) {  //Event called when upload is completed
    $('#' + progress).html('<font>Retrieving updated data...</font>');
});

req.upload.addEventListener('error', function(e) {  //Event called when an error is returned by the server
    alert('An error has occurred...');
});

req.addEventListener('readystatechange', function(e) {        
    if (this.readyState === 4) {
        if (this.status === 200) {
            if (content !== undefined) {
                $('#' + content).html(this.response);
            }

            if (success !== undefined) {
                showChkMark(success);
            }
        } else {
            console.log('Server replied with HTTP status: ' + this.status);
        }


        if (progress !== undefined) {
            $('#' + progress).hide();
        }

        if (div_dlg !== undefined) {
            $('#' + div_dlg).dialog('close');
        }

        $('#' + file)
        .attr('disabled', false)
        .val('');
    }
});

if (progress !== undefined) {
    $('#' + progress).show();
}

$('#' + file).attr('disabled', true);
url += (
        url.indexOf('?') === -1
        ? '?'
        : '&'
    );
url += 'lnk_id=' + lnk_id + '&file=' + file;
req.open('POST', url);
req.setRequestHeader('Cache-Control', 'no-cache');

if (start_func !== undefined) {
    start_func.apply();
    setTimeout(function() {
        req.send(frm_data);
    }, 500);
} else {
    req.send(frm_data);
}}