jQuery.divselect = function(divselectid,inputselectid) {
	var inputselect = $(inputselectid);
	$(divselectid+" cite").click(function(e){
		var ul = $(divselectid+" ul");
		$(".divselect ul").not(ul).slideUp(100);
		if(ul.css("display")=="none"){
			ul.slideDown(100);
		} else {
			ul.slideUp(100);
		}
		stopPropagation(e); 
	});
	$(divselectid+" ul li a").click(function(e){
		var txt = $(this).html();
		$(divselectid+" cite").html(txt);
		var value = $(this).attr("selectid");
		inputselect.val(value);
		$(divselectid+" ul").hide();
	});

	function stopPropagation(e) { 
		if (e.stopPropagation) {
			e.stopPropagation(); 
		} else {
			e.cancelBubble = true; 
		} 
	};
	
	$(document).bind('click',function(){ 
		$('.divselect ul').slideUp(100);
	}); 
	
};