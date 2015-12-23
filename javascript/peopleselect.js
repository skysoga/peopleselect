
$(function(){ 	
	//显示隐藏函数  配置deploy
	document.onclick = function(e){
		var e = e || event;
		var target = e.target || e.srcElement;
		if($(target).hasClass("deploy")){
			var $ul = $(target).next();
			var style = $ul.css("display");
			if(style == 'none'){
				$ul.css('display','block');
			}else{
				$ul.css('display','none');
			}
		}
	}
	//判断right-list 中内容是否为空
	function ifnull(){
		$id2 = $('.right-list ul');
		if($id2.find('li').length > 0){
			$('.sure').addClass('close-reveal-modal');	
		}
		else{
			$('.sure').removeClass('close-reveal-modal');
		}
	}
	//选中框删除，人员列表显示函数
	function del_block(){
		$('.right-list ul li').each(function(){
			$(this).click(function(){
				$id1 = $(this).parents(".row").find(".peo-select");
				var	$b=$(this).remove();
				var $class=$b.attr('class');
				$id1.find('.'+$class).css('display','block');
				ifnull();
			});
		});
	}
	//添加所有成员
	$(document).on("click",".addCurall",function(){
		var ul = $(this).closest('div').next();
		$id2 = $(this).parents(".row").find(".right-list ul");
		var blockli = document.createDocumentFragment();
		if(ul.hasClass('endCss')){
			var allLi = ul.find('li');
			for(var i = 0 ;i < allLi.length ; i++){
				var style = window.getComputedStyle(allLi[i]);
				if(style.display=="block"){
					var li = $(allLi[i]).clone();
					blockli.appendChild(li[0]);
				}
			}
			ul.find('li').css('display','none');
			$id2.prepend(blockli);
			ifnull();
			del_block();	
		}else{
			var allLi = ul.find('.endCss li');
			for(var i = 0 ;i < allLi.length ; i++){
				var style = window.getComputedStyle(allLi[i]);
				if(style.display=="block"){
					var li = $(allLi[i]).clone();
					blockli.appendChild(li[0]);
				}
			}
			$id2.prepend(blockli);
			ul.find('.endCss li').css('display','none');
			ifnull();
			del_block();
		}
	});

	$(document).on("click",".endCss li",function(){
		var curr_li = $(this).clone();
		var $id2 =  $(this).parents(".row").find(".right-list ul");
			$id2.prepend(curr_li);
			$(this).css("display","none");
			del_block();
			ifnull();
	});
	//全部添加
	$('.add-all').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var $li2=$('#id1').find('.endCss li').clone();
		$('#id1').find('.endCss li').css("display","none");
		for(var i = $li2.length; i >= 0; i--){
			$('#id2').prepend($li2[i]);
		}
		ifnull();
		del_block();
	});
	//全部清除
	$('.clear-all').click(function(e){
		e.preventDefault();
		e.stopPropagation();
		$id2 = $(this).parents('.infs').siblings().find('ul');
		$id1 = $(this).parents('.row').find('.peo-select ul');
		var $remove=$id2.find('li').remove();
		var array = [];
		for(var i = 0;i <  $remove.length ; i++){
			array[i] = $remove[i].className;
		}
		for(var j = 0; j < array.length ; j++){
			$id1.find('.'+array[j]).css('display','block');
		}
		ifnull();
	});

	//提交功能--选中框right-list内容传送给part-peo_selected
	var sure=document.querySelectorAll('.sure');
	for(var i = 0 ; i < sure.length ; i++){
			sure[i].onclick=function(){
			var $array =$(this).parents(".confirm").siblings(".modal_wrap").find('.right-list ul li');
			var $id1 =$(this).parents(".confirm").siblings(".modal_wrap").find('.peo-select');
			var $obj=$array.remove();
			var code = $(this).attr("orgid");
			var $id3= $('#'+code);
			for(var i = $obj.length; i >=0 ; i--){
				$id3.prepend($obj[i]);
			}
			var $c=$id3.find('li');
			$c.click(function(){
				var	$b=$(this).remove();
				var $class=$b.attr('class');
				$id1.find('.'+$class).css('display','block');
				width();
			});
			width();
		}
	}
	
	//弹出框input聚焦时展开;
	var arr = document.querySelectorAll('.searchinput');
	$popinput = $(arr);
	$popinput.each(function(){
		$(this)[0].onkeyup = function(){
			if(this.value.length > 0){
				$(this).siblings("div").css("display","block");
				var x = $(this).attr("id");
				slidedown(x);
			}else{
				$(this).siblings("div").css("display","none");
			}
		}
	});
	//弹出框搜索下拉框选中效果
	var slidedown = function(x){
		var findPeople = $('#'+x).siblings().find('ul li');
		findPeople.click(function(){
			var $li_obj=$(this).clone();
			$li_obj.removeClass("curr");
			var $id2 = $(this).parents(".serc").siblings().find('.right-list ul');
			var suggestion2 = $(this).closest(".suggestion2");
			var $id1 = $(this).parents(".serc").siblings().find('.peo-select');
			$id2.prepend($li_obj);	
			$('#'+x)[0].value = '';
			ifnull();
			var $class=$li_obj.attr('class');
			$id1.find('.'+$class).css('display','none');
			suggestion2.css('display','none');
			del_block()
		});
	}
	//页面搜索下拉框选中效果
	var $slidedown1=$('.suggestion').find('ul li');
	$slidedown1.each(function(i,e){
		$(this).click(function(){
			var $obj=$(this).clone();
			$obj.removeClass("curr");
			$("#part-peo_selected").find('ul').prepend($obj);
			var $class1=$obj.attr('class');
			$('#id1').find('.'+$class1).css('display','none');
			$('.suggestion').css('display','none');
			$('#search1')[0].value = "";
			var $a=$('#part-peo_selected').find('li');
			$a.click(function(){
				var	$b=$(this).remove();
				var $class=$b.attr('class');
				$('#id1').find('.'+$class).css('display','block');
				width();
			});
			width();
		});
	});
	//input聚焦时展开
	/*var input_list1=$("#search1");
	for(var i= 0 ; i < input_list1.length ; i++){
		input_list1[i].onkeyup=function(){
			if(this.value.length > 0){
				$(".suggestion").css("display","block");
				obj =$('.search-class');
				div_keydown(obj);
			}else{
				$(".suggestion").css("display","none");
			}
		}
	}*/
	$('.input-label input').each(function(){
		$(this)[0].onkeyup = function(){
			if(this.value.length>0){
				$(this).closest(".search-class").siblings(".suggestion").show();
			}else{
				$(this).closest(".search-class").siblings(".suggestion").hide();
			}
		}
	})
	//弹出框里的展开查看更多的功能收起
	$('.look-more').click(function(){
		$('.right-list').toggleClass('height-open');
		if(this.title == "展开"){
			this.innerHTML='收起<i class="slide-img"></i>';
			this.title="收起";
		}else{
			this.title="展开";
			this.innerHTML='展开<i class="more-img"></i>';
			
		}
	});

	//input宽度计算
	/*function width(){
		var target = $('.input-label')[0];
		var leftwidth = target.offsetLeft;
		var targetwidth = target.offsetWidth;
		var parentwidth = target.parentNode.offsetWidth;
		var a = parentwidth - leftwidth
		if(a > targetwidth){
			target.style.width = a -38 + "px"  ;
		}else{
			target.style.width = "100%"
		}	
	}*/
	 function width(){
		$('.input-label').each(function(){
			var target = $(this)[0];
			var leftwidth = target.offsetLeft;
			var targetwidth = target.offsetWidth;
			var parentwidth = target.parentNode.offsetWidth;
			var a = parentwidth - leftwidth
			if(a > targetwidth){
				target.style.width = a -38 + "px"  ;
			}else{
				target.style.width = "100%"
			}	
		});
	}
	$('.part-peo_selected').each(function(){
			var tar = $(this)[0];
			moveover_out(tar);
	});
	function moveover_out(curr_target){
		var target =$(curr_target).find('.input-label');
		input = target.find("input");
		curr_target.onmouseover= function(e){
			e.stopPropagation();
			width();	
		}
		curr_target.onmouseout = function(){
		
			if(input[0].value.length>0){
				width();
			}else{
				target[0].style.width = "33px";
			}
		}
	}
	
});

//监听键盘事件
	function div_keydown(obj){
		var cur = $('.suggestion li')[0];
		cur.classList.add('curr');
		var obj = obj[0];
		obj.onkeydown=function(event){
			var e = e||event;
			console.log(e.keyCode);
			var ul = obj.nextElementSibling.children;
			var li = ul[0].children;
			length = li.length;
			first = li[0];
			last = li[length-1];
			//li[0].classList.add('curr');
			if(e.keyCode == 40){
				var index = 0;
				for(var i = 0 ;i <length ;i++){
					if(~li[i].className.indexOf('curr')){
						index = i;
					}
				}
				if(index != (length-1)){
					cur.classList.remove("curr");
            		cur.nextElementSibling.classList.add('curr');
					cur = cur.nextElementSibling;
				}else{
					first.classList.add('curr');
					last.classList.remove('curr');
					cur = first;
				}
			}
			if(e.keyCode == 38){
				var index1 = 0;
				for(var i = 0 ;i <length ;i++){
					if(~li[i].className.indexOf('curr')){
						index1 = i;
					}
				}
				if(index1 != 0){
					cur.classList.remove('curr');
					cur.previousElementSibling.classList.add('curr');
					cur = cur.previousElementSibling;
				}else{
					first.classList.remove('curr');
					last.classList.add('curr');
					cur = last;
				}
			}
			if(e.keyCode == 13){
				/*var tar = document.querySelector('curr');*/
				var a1 = cur.cloneNode('.curr');
				cur.classList.remove('curr');
				 a1.classList.remove('curr');
				var endtarget = document.getElementById('part-peo_selected');
				var endul = endtarget.children[0];
				endul.appendChild(a1);
				$('#id1').find('.'+a1.className).css('display','none');
				$('.suggestion').css('display','none');
				$('#search1')[0].value = "";
				cur=first;
				cur.classList.add('curr');
				var $c=$('#part-peo_selected').find('ul li');
				$c.click(function(){
					var	$b=$(this).remove();
					var $class=$b.attr('class');
					$('#id1').find('.'+$class).css('display','block');
					width();
				});
				width();
				return false;
			}
		};
		
	}
 	




