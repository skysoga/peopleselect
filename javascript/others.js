
//头部搜索
function showSearch(){
	$('.userset-list').slideUp(200);
	
	var topsearch =  document.getElementById("topsearch");	  	 
	if(topsearch.style.display == "block"){
	topsearch.style.display = "none";
	}else{
	  topsearch.style.display = "block";
	}
}

//返回头部、底部
function goTop() { window.scroll(0, 0)}
function goBottom(){var bottomH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);window.scroll(0,bottomH);}


//返回头部、底部
$(function () {
	$(".gotop").click(/*定义返回顶部点击向上滚动的动画*/
	function () {
		$('html,body').animate({ scrollTop: 0 }, 700);
	});
	$(".gohome").click(/*定义返回顶部点击向上滚动的动画*/
	function(){
		/*HomepageFavorite.Homepage();*/
	});
	$(".gobottom").click(/*定义返回顶部点击向上滚动的动画*/
	function () {
		var bottomH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);window.scroll(0,bottomH);
	});
	$(document).scroll(
		function(){
			if($(document.body).scrollTop() + $(document).scrollTop() > 300 && $(document.body).scrollTop() + $(document).scrollTop() < 300){
				$(".go").css("display","block");
				$(".gobottom").css("display","block"),$(".gotop").css("display","none");
			}else if($(document.body).scrollTop() + $(document).scrollTop() > 300){
				$(".go").css("display","block");
				$(".gobottom").css("display","none"),$(".gotop").css("display","block");				
			}else{
				$(".go").css("display","none");
			}
	}
	);
})

var a = true;
$(function(){
	if(document.body.scrollWidth < 768 || document.body.scrollWidth == 768){
		return a = true;
	} else {
		return a = false;
	}
})
$(window).resize(function() {
	if(document.body.scrollWidth < 768 || document.body.scrollWidth == 768){
		return a = true;
	} else {
		return a = false;
	}
});
function isHidden( elem ){
	return $(elem).css('display') == "none";
}

$(function () {
	//小屏导航侧栏展开
	var _accordionHeader = $('.accordion-header-small');
	var _section = _accordionHeader.siblings('.top-bar-section');
	_accordionHeader.bind('click',function(){
		_section.slideToggle(200);
	});
	//datatable更多筛选条件
	var _filter = $('.more-filter');
	var _dtFilter = $('.dt');
	var _dtFilterNoTag = $('.no-tag .dt');
	//定位
	_filter.bind('click',function(){
		var _filterItems = $(this).parent().siblings(".filter-items");
		var _filterItemsWrap = _filterItems.find('.filter-items-wrap');
		$(this).toggleClass('active');
		_filterItems.slideToggle(200,function(){
			$(document).foundation('equalizer', 'reflow');
		});
		if(a) {
			//悬浮确定和重置
			var $targetEle = $('.main').find('.do-search'),
				targetTop = $targetEle[0].offsetTop,
				targetWidth = $targetEle.width();
			magellan();
			$(window).on('scroll',function(e){
				magellan();
			});
			function magellan(){
				var  screenviewHeight = $(window).height(),
					scrollHeight = $(document).scrollTop();
				   
				if(targetTop - screenviewHeight - scrollHeight + 100 >= 0){
				   $targetEle.css({'position':'fixed','bottom':'0','left':'0','width':'100%','margin':'0','padding':'10px 20px 10px 13px','background':'#fff'});
				}else{
				   $targetEle.removeAttr('style');
				}
			}
			$("html,body").animate({scrollTop:_filter.offset().top - 10},200);
		}
	});
	//v_table及相关位置调整
	_dtFilter.bind('click',function(){
		if(a) {
			if($(this).hasClass('active')) {
				$('.bar_apply_wrap').css({'bottom':'-14px','z-index':'1'});
				$('.v_table').css({'position':'relative','top':'-50px'});
			} else {
				$('.bar_apply_wrap').removeAttr('style');
				$('.v_table').removeAttr('style');
			}
		}
	})
	//v_table及相关位置调整
	_dtFilterNoTag.bind('click',function(){
		if(a) {
			if($(this).hasClass('active')) {
				$('.v_table').css({'position':'relative','top':'-40px'});
			}
		}
	})
	//小屏tool-bar展开定位到顶部
	var _toggleUserbar = $('.toggle-topbar');
	_toggleUserbar.bind('click',function(){
		var _userBar = _toggleUserbar.parent().siblings().find('.user-bar');
		if(isHidden( _userBar )) {
			$("html,body").animate({scrollTop:50},200);
		} else {
			return;
		}
	})
})
										
$(function(){
	$(".user-bar").appendAround();
	$(".top_search").appendAround();
	$(".accordion-list").appendAround();
	$(".bar_apply").appendAround();
	$(".top-bar-section-li").appendAround();
})

/*搜索*/
$(function(){
	if (document.body.scrollWidth > 768){
		$('.index-search').bind('click',function(e){
			$('.top_search').toggleClass('show');
			e.preventDefault();
		})
	}
})

//网站导航
$(function () {
	var _dropBar = $('.drop-bar');
	_dropBar.bind('click',function(){
		_dropId = $(this).attr('id');
		_dropBarTit = $(this).find(".drop-bar-tit");
		_dropBarCon = $(this).find(".drop-bar-con");
		$(".drop-bar-tit").not(_dropBarTit).removeClass('active');
		$(".drop-bar-con").not(_dropBarCon).slideUp(100);
		_dropBarTit.toggleClass('active');
		_dropBarCon.slideToggle(100);
		$(document).bind('click',function(e){
			var e = e || window.event; //浏览器兼容性 
			var elem = e.target || e.srcElement; 
			while (elem) { //循环判断至根节点，防止点击的是div子元素 
				if ( elem.id && elem.id == _dropId ) { 
					return; 
				} 
				elem = elem.parentNode; 
			} 
			_dropBarTit.removeClass('active');
			_dropBarCon.slideUp(100); 
		}); 
	});
})
