// 图片上传demo
jQuery(function() {
    var $ = jQuery,
	    $modPic = $('#modPic'),
		$upArea = $modPic.find('.uploader-area'),
		$upList = $modPic.find('.uploader-list'),
        $list = $('#fileList'),
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,

        // 缩略图大小
        thumbnailWidth = 530 * ratio,
        thumbnailHeight = 360 * ratio,

        // Web Uploader实例
        uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({

        // 自动上传。
        auto: true,

        // swf文件路径
        swf: './flash/Uploader.swf',

        // 文件接收服务端。
        server: Cfg.contextPath + '/tpl/001/server/fileupload.php',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',
		fileNumLimit : 1,

        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        }
    });

    // 当有文件添加进来的时候
    uploader.on( 'fileQueued', function( file ) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                '</div>'
                ),
            $img = $li.find('img');

        $list.append( $li );

        // 创建缩略图
        uploader.makeThumb( file, function( error, src ) {
            if ( error ) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr( 'src', src );
        }, thumbnailWidth, thumbnailHeight );
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on( 'uploadProgress', function( file, percentage ) {
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo( $li )
                    .find('span');
        }

        $percent.css( 'width', percentage * 100 + '%' );
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on( 'uploadSuccess', function( file ) {
        $( '#'+file.id ).addClass('upload-state-done');
    });

    // 文件上传失败，现实上传出错。
    uploader.on( 'uploadError', function( file ) {
        var $li = $( '#'+file.id ),
            $error = $li.find('div.error');

        // 避免重复创建
        if ( !$error.length ) {
            $error = $('<div class="error"></div>').appendTo( $li );
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on( 'uploadComplete', function( file ) {
        $( '#'+file.id ).find('.progress').remove();
		$upArea.hide();
		$upList.show();
        result_width = $upList.find('img').eq(0).width();
        result_height = $upList.find('img').eq(0).height();
        $('#crop1 .crop-img img')[0].src = $upList.find('img')[0].src;
        $('#crop2 .crop-img img')[0].src = $upList.find('img')[0].src;
        $('#crop3 .crop-img img')[0].src = $upList.find('img')[0].src;
        
		initJcrop();
       
    });
	

	function initJcrop(){
			
			$upList.find('img').Jcrop({
                minSize: [30, 30],
                maxSize: [400, 400],
                aspectRatio: 1,
                setSelect: [0, 0, 100, 100],
                onChange: updatePreview,
                onSelect: updatePreview
            });
		
	}

    function updatePreview(c){
    
        //180*180px
        if (parseInt(c.w) > 0){
            var rx = 180 / c.w;
            var ry = 180 / c.h;
            $('#crop1 .crop-img img').css({
                width: Math.round(rx * parseInt(result_width)) + 'px',
                height: Math.round(ry * parseInt(result_height)) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }

        //60*60px
        if (parseInt(c.w) > 0){
            var rx = 60 / c.w;
            var ry = 60 / c.h;
            $('#crop2 .crop-img img').css({
                width: Math.round(rx * parseInt(result_width)) + 'px',
                height: Math.round(ry * parseInt(result_height)) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }

        //30*30px
        if (parseInt(c.w) > 0){
            var rx = 30 / c.w;
            var ry = 30 / c.h;
            $('#crop3 .crop-img img').css({
                width: Math.round(rx * parseInt(result_width)) + 'px',
                height: Math.round(ry * parseInt(result_height)) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }
    };

    var result_width = 0;
    var result_height = 0;
    jQuery.fn.LoadImage = function(scaling, width, height, loadpic) {
        return this.each(function() {
            var t = $(this),
                src = $(this).attr("src"),
                img = new Image();
                //alert("Loading") 
                img.src = src;

            //自动缩放图片 
            var autoScaling = function() {
                if (scaling) {

                    if (img.width > 0 && img.height > 0) {
                        if (img.width / img.height >= width / height) {
                            if (img.width > width) {
                                t.width(width);
                                t.height((img.height * width) / img.width);
                            } else {
                                t.width(img.width);
                                t.height(img.height);
                            }
                        } else {
                            if (img.height > height) {
                                t.height(height);
                                t.width((img.width * height) / img.height);
                            } else {
                                t.width(img.width);
                                t.height(img.height);
                            }
                        }
                    }
                }
            }
            //处理ff下会自动读取缓存图片 
            if (img.complete) {
                //alert("getToCache!"); 
                autoScaling();
                return;
            }
            $(this).attr("src", "");
            var loading = $("<img alt=\"加载中\" title=\"图片加载中\" src=\"" + loadpic + "\" />");

            t.hide();
            t.after(loading);
            $(img).load(function() {
                autoScaling();
                loading.remove();
                t.attr("src", this.src);
                t.show();
                //alert("finally!") 
                $("#cropbox").width(t.width());
                $("#cropbox").height(t.height());
                result_width = t.width();
                result_height = t.height();
            });

        });
    }
});