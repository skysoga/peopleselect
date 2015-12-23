// JavaScript Document
		var orgCode=$("input[name='orgCode']").val();
		if(orgCode!=""){
			$.ajax({
						url: Cfg.contextPath+"/party/interface/findOrgs/"+orgCode,
						dataType:"JSON",
						type : "GET",	
						success: function(data) {
							var grid_l=[];
							for(var i=0;i<data.length;i++){
								grid_l.push('<li class="li-css grid-0"><div class="deploy" orgCode='+data[i].orgCode+' onclick=findUser(this)><a class="addCurall right" onclick=findUser1(this)>添加所有成员</a><i class="turn-right"></i><div>'+data[i].orgName+'</div></div><ul class="grid-2 endCss member-grid"></ul></li>');
							}
							$(".grid-ul").html(grid_l);
						},
						error: function(error) {
							//alert(error);
						}
					});
		}
		//添加所有成员预加载
		function findUser1(currPeople1){
			if($(currPeople1).closest("div").next().children().length <= 0){
				var orgCode=$(currPeople1).closest("div").attr("orgCode");
				$.ajax({
					url: Cfg.contextPath+"/party/interface/findUsers/"+orgCode,
					dataType:"JSON",
					type : "GET",	
					success: function(people) {
						var requirePersonId=$("input[name='requirePersonId']").val();
						var str= new Array();
						str=requirePersonId.split(",");
  					    var grid_21=[];
						for(var i = 0;i < people.length;i++){
							var photo=people[i].photo;
							if(photo==null){
								photo=Cfg.contextPath+"/tpl/def/002/images/user.png";
							}
							grid_21.push(' <li class="'+people[i].loginName+'" pid ="'+people[i].loginName+'"><a href="javascript:;"><i>添加</i><small>×</small><img src="'+photo+'" alt=""/><span>'+ people[i].userName +'</span></a></li>');
						}
						$(currPeople1).closest("div").next().html(grid_21);
						var ul = $(currPeople1).closest('div').next();
						$id2 = $(currPeople1).parents(".row").find(".right-list ul");
						var blockli = document.createDocumentFragment();
						if(ul.hasClass('endCss')){
							var allLi = ul.find('li');
							for(var i = 0 ;i < allLi.length ; i++){
								var style = window.getComputedStyle(allLi[i]);
								//是否编辑隐藏
								if(str.indexOf($(allLi[i]).attr("class"))!="-1"){
									$(allLi[i]).hide();
								}
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
					},
					error: function(error) {
						//alert(error);
					}
				});	
				var e = window.event || e;
				if(e.stopPropagation){
					e.stopPropagation();
				}else{
					e.cancelBubble = true;
				}	
			}
		}
	 	//支部人员展开
	 	function findUser(currPeople){
	 		/*if($(currPeople).parents(".li-css").find(".member-grid").css("display")=="block"){
	 			return;
	 		};*/
			if($(currPeople).next().children().length <= 0){
				var orgCode=$(currPeople).attr("orgCode");
				$.ajax({
					url: Cfg.contextPath+"/party/interface/findUsers/"+orgCode,
					dataType:"JSON",
					type : "GET",	
					success: function(people) {
						var requirePersonId=$("input[name='requirePersonId']").val();
						var str= new Array();
						str=requirePersonId.split(",");					
						var grid_2=[];
						for(var i = 0;i < people.length;i++){
							var photo=people[i].photo;
							if(photo==null){
								photo=Cfg.contextPath+"/tpl/def/002/images/user.png";
							}
							var liHtml;
						 	if(str.indexOf(people[i].loginName)!="-1"){
						 		liHtml='<li class="'+people[i].loginName+'" pid="'+people[i].loginName+'" style="display:none"><a href="javascript:;"><i>添加</i><small>×</small><img src="'+photo+'" alt=""/><span>'+ people[i].userName +'</span></a></li>'; 	
						 	}else{
						 		liHtml='<li class="'+people[i].loginName+'" pid="'+people[i].loginName+'"><a href="javascript:;"><i>添加</i><small>×</small><img src="'+photo+'" alt=""/><span>'+ people[i].userName +'</span></a></li>';
						 	}
						 	grid_2.push(liHtml);					
						}		
						$(currPeople).next().html(grid_2);									
					},
					error: function(error) {
						//alert(error);
					}
				});
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