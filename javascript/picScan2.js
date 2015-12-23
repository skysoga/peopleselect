
function picSwiper (g,options) {
/*	this.options = {
		gallery: true,
		comment: true,
		clicklarge: true,
	};*/
	this.loaded(g);
	this.begin(g);


	$(g + ' .figure-side .figure-side-hd').hide();

	$('.gallery-thumbs .swiper-slide').css('width','150px');
	var toHeight=window.matchMedia('(max-height:478px)');
	if(toHeight.matches){
			$('.swiper-button-next').css({'display':'none'});
		    $('.swiper-button-prev').css({'display':'none'});}
	var toWidth=window.matchMedia('(min-width:769px)');
	if(toWidth.matches){
		$('.comment-active-list').click(function(){
			$('.image-head').css({'background':'none','padding-left':'2%'});
		})
	};
	var contWidth=window.matchMedia('(max-width:768px)');
		$('.comment-active-list').click(function(){
			if(contWidth.matches) {
				$('.pos-title').css('line-height', 'inherit');
				$('.gallery').css('height', '100vh');
			}
			else{
				//$('.gallery').css('height', '100%');
			}
		})
		var picWidth=window.matchMedia('(max-width:1024px)');
		if(picWidth.matches){
			$('.gallery-thumbs').css('display','none');
		}



	$('.comment_list').click(function(){
		var dWidth=window.matchMedia('(max-width:768px)');
		if(dWidth.matches){
			$('.header').css('display','none');
			$('.pos-title').css('padding-bottom','0px');
		}

	})
	$('.image-head-back .back').click(function(){
		var dWidth=window.matchMedia('(max-width:768px)');
		if(dWidth.matches){
			$('.header').css('display','block');

			$('.gallery').css('height','100%');

		}

	})
	$('.image-head-back .back').click(function(){
		var dWidth=window.matchMedia('(min-width:769px)');
		if(dWidth.matches){


			$('#layout .header').css('margin-right','0px');


		}

	})
};
picSwiper.prototype = {
	loaded: function(g){
		/*评论区滚动条*/
		rScroll = new IScroll(g + ' #wrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true
		});
		/*图片简介滚动条
		$(g + ' .wrapper-text').each(function(i) {
			textScroll = new IScroll(this, {
				scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: false
			});
		});*/
		/*图片简介是否为空*/
		$(g + ' .movie-text').each(function(i){
			var a = $(this).children('h1')[0];
			if($(a).html() === ''){
				$(this).css('background','none');
			}
		});
	},
	begin: function(g) {
		var top = g + ' .gallery-top';
		var thumbs = g + ' .gallery-thumbs';
		var mtext = g + ' .movie-text';
		var n = $(top + " .swiper-slide").size();
		var galleryThumbs = new Swiper(thumbs, {
			spaceBetween: 8,
			centeredSlides: false,
			slidesPerView : 8,
			touchRatio: 0.2,
			grabCursor : true,
			slidesPerGroup:5,

			slideToClickedSlide: true,
/*modify*/
			watchSlidesProgress : true,
			watchSlidesVisibility : true,
			onTap: function(){
				galleryTop.slideTo( galleryThumbs.clickedIndex)
			}
		});
		var galleryTop = new Swiper(top, {
			initialSlide :0,
			nextButton: g + ' .swiper-button-next',
			prevButton: g + ' .swiper-button-prev',
			spaceBetween: 10,
			preloadImages: false,
			//lazyLoading: true,
			keyboardControl : true,
			grabCursor : true,
			longSwipesRatio : 0.1,
			threshold : 1,
			//swipeHandler : g + ' .swiper-lazy',
			//mousewheelControl : true,
			onInit: function(){
				var lazy = top + ' .swiper-slide .swiper-lazy';
				var totalnum = g + ' .total-number';
				var currentnum = g + ' .current-number';
				var i=$(lazy).size();
				$(totalnum).html(''+"/18");
				$(currentnum).html(+1);
				detectEq();
				var _imgHrefId = n-1;
				viewOriginalImg(_imgHrefId);
			},
			onSlideChangeStart: function(galleryTop){
				$(g + ' .exif-info .original').show();
				$(g + ' .exif-info-out .original').hide();
/*modify*/
				if (document.body.scrollWidth > 768) {
					updateNavPosition();
				}
			},
			onSlideChangeEnd: function(galleryTop){
				changePages();
				var _imgHrefId = galleryTop.activeIndex;
				viewOriginalImg(_imgHrefId);
			},
			onTap: function(galleryTop,event){
				var m = $(mtext);
				var h = $(g + ' .handle-tab-wrap');
				var p = $(g + ' .swiper-button-white');
				var a = $(g + ' .gallery-thumbs');
				if(event.target.className.match('swiper-button-white') == null){
					if (document.body.scrollWidth < 640 || document.body.scrollWidth == 640){
						//$(h).css('bottom') == '-45px' ? $(h).css('bottom','0px') : $(h).css('bottom','-45px');
						//$(m).css('bottom') == '-200px' ? $(m).css('bottom','40px') : $(m).css('bottom','-200px');
						//$(a).css('display') == 'block' ? $(a).css('display','none') : $(a).css('display','block');
					} else {
						//$(h).css('top') == '10px' ? $(h).css('top','-100px') : $(h).css('top','10px');
						//$(m).css('bottom') == '-200px' ? $(m).css('bottom','0px') : $(m).css('bottom','-200px');
						//$(a).css('display') == 'none' ? $(a).css('display','block') : $(a).css('display','none');
					};
					//if(navigator.userAgent.match(/Android/i) || (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
					//	$(p).css('display','none');
					//} else if(document.body.scrollWidth > 768){
					//	$(p).css('display') == 'block' ? $(p).css('display','none') : $(p).css('display','block');
					//};
				};
				closeDropdown();
			},
			onSliderMove: function(galleryTop,event){
				var m = $(mtext);
				tapToggle(m)
				closeDropdown();
				$(g + ' .exif-info .original').show();
				$(g + ' .exif-info-out .original').hide();
			},
			onSetTransition: function(galleryTop, transition){
				var m = $(mtext);
				tapToggle(m);
			},
			onTransitionEnd: function(galleryTop, transition){
				$(g + ' .exif-info .original').hide();
				$(g + ' .exif-info-out .original').show();
			}
		});
/*modify*/
//		galleryTop.params.control = galleryThumbs;
//		galleryThumbs.params.control = galleryTop;
		function updateNavPosition(){
			$('.gallery-thumbs .active-nav').removeClass('active-nav');
			var activeNav = $('.gallery-thumbs .swiper-slide').eq(galleryTop.activeIndex);
			activeNav.addClass('active-nav');
			if (!activeNav.hasClass('swiper-slide-visible')) {
				if (activeNav.index()>galleryThumbs.activeIndex) {
					var thumbsPerNav = Math.floor(galleryThumbs.width/activeNav.width())-1
					galleryThumbs.slideTo(activeNav.index()-thumbsPerNav)
				}
				else {
					galleryThumbs.slideTo(activeNav.index())
				}	
			}
		}

		function changePages(){
			var j = $(top + " .swiper-slide-active").index() + 1;
			$(g + " .current-number").html(j );
		};

		/*设备检测*/
		function detectEq(){
			var p = $(g + ' .swiper-button-white');
			if(navigator.userAgent.match(/Android/i) || (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
//			if (document.body.scrollWidth < 640 || document.body.scrollWidth == 640){
				$('.wrapper').css({'overflow':'hidden','height':'100%'});
				$('.swiper-container').css({'z-index':'0'})
				//$('body').css({'background':'#000'});
				$(p).css('display','none');
			} else {
				//$('body').css('overflow','hidden');
			}
		}
		/*左右切换箭头点击事件*/
		$(g + ' .swiper-button-white').bind('click',function(){
			var m = $(mtext);
			tapToggle(m);
			closeDropdown();
		});
		//查看原图
		function viewOriginalImg(imgId) {
			var _imgHrefId = imgId;
			var _imgHrefTarget = $(g + ' .swiper-slide')[_imgHrefId];
			var _imgHrefActive = $(_imgHrefTarget).find('.original').attr('href');
			$(g + ' .exif-info .original').hide();
			$(g + ' .exif-info-out .original').show().attr('href',_imgHrefActive);
		}
		/*喜欢-心形效果*/
		$(g + ' .like').click(function(){
			closeDropdown();
			if(this.getAttribute('title') === '喜欢'){
				this.setAttribute('title','取消喜欢');
				this.innerHTML = '<i class="icon-m fa fa-fw fa-heart font-alert no-heart"><span></span><span></span></i>&nbsp;43';
			}else{
				this.setAttribute('title','喜欢');
				this.innerHTML = '<i class="icon-m fa fa-fw fa-heart-o red-heart"><span></span><span></span></i>&nbsp;43';
			}
		});
		function tapToggle(m){
			var h = $(g + ' .handle-tab-wrap');
			var p = $(g + ' .swiper-button-white');
			if (document.body.scrollWidth < 640 || document.body.scrollWidth == 640){
				//$(h).css('bottom') == '-45px' ? $(h).css('bottom','-45px') : $(h).css('bottom','0px');
				//$(m).css('bottom') == '-200px' ? $(m).css('bottom','-200px') : $(m).css('bottom','40px');
			} else {
				//$(h).css('top') == '10px' ? $(h).css('top','10px') : $(h).css('top','-100px');
				//$(m).css('bottom') == '-200px' ? $(m).css('bottom','-200px') : $(m).css('bottom','0px');
			};
			if (document.body.scrollWidth > 768){
				$(p).css('display') == 'block' ? $(p).css('display','block') : $(p).css('display','none');
			} else {
				$(p).css('display','none');
			};
		};

		/*图片信息和分享*/
		$(g + ' .handle-tab-info').bind('click',function(){
			$(g + ' .handle-tab-share').removeClass('show');
			$(this).toggleClass("show");
			var dd = $(this).next('.info-dropdown');
			dd.slideToggle('normal');
			$(g + ' .share-dropdown').hide();
		});
		$(g + ' .handle-tab-share').bind('click',function(){
			$(g + ' .handle-tab-info').removeClass('show');
			$(this).toggleClass("show");
			var dd = $(this).next('.share-dropdown');
			dd.slideToggle('normal');
			$(g + ' .info-dropdown').hide();
		});
		if (document.body.scrollWidth < 768 || document.body.scrollWidth == 768){
			$(g + ' .comment_list').bind('click',function(){
				/*小屏下评论列表的显示*/
				deActiveIcon();
				$(g + ' .down').hide();
				$(g + ' .album').css('left','-500px');
				$(g + ' .figure-side').attr('id','out');
				$(g + ' .image-head-back').show();

				$(g + ' .photo_layer').css('top','0px');
			});
		} else {
			$(g + ' .comment_list').bind('click',function(){
				/*大屏下评论右侧弹出*/
				deActiveIcon();
				galleryTop.disableKeyboardControl();
				if($(g + ' .figure-side').attr('id') == 'out'){
					$('#layout .header').css('margin-right','0px');
					$(this).children().removeClass('show');
					closeComment();
				} else {
					$('#layout .header').css('margin-right','400px');
					resizeSwiper();
					$(this).children().addClass('show');
					$(g + ' .down').hide();
					$(g + ' .photo_layer').css('top','0');
					$(g + ' .figure-side').attr('id','out');
	/*				$(g + ' .photo_layer').on('click',function(event){
						$(g + ' .photo_layer').removeAttr('style');
						$(g + ' .figure-side').removeAttr('id');
						event.stopPropagation();
					});
	*/
					$(g + ' .figure-side').on('click',function(event){
						event.stopPropagation();
					});
				}
			});
		}

		/*返回观看图片*/
		$(g + ' .image-head-back .back').bind('click',function(){
			if (document.body.scrollWidth < 768 || document.body.scrollWidth == 768){
				$(g + ' .image-head-back').hide();
				$(g + ' .album').removeAttr('style');
				$(g + ' .figure-side .figure-side-hd').hide();
				$(g + ' .photo_layer').attr('style','');
				$(g + ' .figure-side').removeAttr('id');
			} else {
				closeComment();
				galleryTop.enableKeyboardControl();
			}
		});

		/*上拉菜单收起*/
		function closeDropdown(){
			$(g + ' .down').hide();
			deActiveIcon();
		};

		function deActiveIcon(){
			$(g + ' .handle-tab-share').removeClass('show');
			$(g + ' .handle-tab-info').removeClass('show');
		}

		/*右侧评论弹出，图片swiper宽度重置*/
		function resizeSwiper(){
			var width = parseInt($(document.body).outerWidth(true)) - 400 + 'px';
			$(g + ' .handle-tab-wrap').css('right','400px');
			$(g + ' .image-head').css('width',width);
			$(g + ' .swiper-button-next').css('right','400px');
			$(g + ' .exif-info-out a.original').css('right','460px');
			$(top).css({'width':width,'margin-left':'0'});
			galleryTop.onResize();
		}
		function closeComment(){
			$(g + ' .down').hide();
			$(g + ' .handle-item').removeClass('show');
			$(g + ' .photo_layer').removeAttr('style');
			$(g + ' .figure-side').removeAttr('id');
			$(g + ' .image-head').removeAttr('style');
			$(g + ' .handle-tab-wrap').removeAttr('style');
			$(g + ' .swiper-button-next').removeAttr('style');
			$(g + ' .exif-info-out a.original').removeAttr('style');
			$(top).removeAttr('style');
			galleryTop.onResize();
			event.stopPropagation();
		}
		//function preventDefault(e) { e.preventDefault(); };
		//document.body.addEventListener('touchmove', preventDefault ,false);

	}


};





