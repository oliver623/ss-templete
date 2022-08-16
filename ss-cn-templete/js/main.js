jQuery(document).ready(function(){
	
//Scrol
jQuery('#menu li a, #logo').click(function() {
	var elementClicked = jQuery(this).attr("href");
	var destination = jQuery(elementClicked).offset().top;
	jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-0}, 1000 );		   
	return false;
});	

var current_nav = 'home';

scroll_function = function(){
	
	jQuery(".scrol-page,").each(function(index) {
		var h = jQuery(this).offset().top;
		var y = jQuery(window).scrollTop();
					
		if(y + 360 >= h && y < h + jQuery(this).height() && jQuery(this).attr('id') != current_nav) {
			
			current_nav = jQuery(this).attr('id');
			
			jQuery('#menu a').removeClass('current');
			jQuery('.nav_' + current_nav).addClass('current').show("fast");	
				
		}
	});	
}
jQuery(window).scroll(function(){
		scroll_function();
});


function clearData() {
	inputs = document.getElementsByTagName('input'); // 获取所有input对象
	for(var i = 0, len = inputs.length; i < len; i++) {
	   inputs[i].value = ''; // 将每一个input的value置为空
	}
	textareas = document.getElementsByTagName('textarea'); // textareas
	for(var i = 0, len = textareas.length; i < len; i++) {
	   textareas[i].value = ''; // 将每一个textareas的value置为空
	}
 }

const $form = jQuery('#form')
$form.on('submit', e => {
	e.preventDefault()
	let name = document.getElementById('full_name').value;
	let mobile = document.getElementById('mobile').value;
	let email = document.getElementById('email').value;
	if(!name || !mobile || !email) {
		alert('请填写姓名、电话和邮箱信息。');
		return;
	}
	$("#submit-btn").attr('disabled', true);
	jQuery('#submit-btn').addClass('submiting-loading');
	
	let params =  $form.serializeArray().reduce((pre, cur) => {
		pre[cur.name] = cur.value;
		return pre;
	}, {})
	let data = {
		firstName: params.full_name,
		phoneNumber: params.mobile,
		email: params.email,
		companyName: params.company,
		note: params.msg,
		cnOverSea: true,
	}
	data = JSON.stringify(data)
	jQuery.ajax({
		url: 'http://127.0.0.1:8900/auth/contact-us/add',
		data,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		type: 'POST',
		success(result){
			if(result.success){
				jQuery('#submit-btn').removeClass('submiting-loading');
				$("#submit-btn").attr('disabled', false);
				alert('提交成功！')
				clearData();
			}else {
				jQuery('#submit-btn').removeClass('submiting-loading');
				$("#submit-btn").attr('disabled', false);
				alert('提交失败！'+result.message)
			}
		}
	})
})


//  const io = new IntersectionObserver(entries => {
// 	entries.forEach(entry => {
// 		const {target: {id}, isIntersecting} = entry
// 		const nav = document.querySelector(`.nav_${id}`)
// 		if (isIntersecting) {
// 			nav.classList.add('current')
// 		} else {
// 			nav.classList.remove('current')
// 		}
// 	})
// },{
// 	rootMargin: '100px 0px 0px'
// })

// document.querySelectorAll('.scrol-page').forEach(el => io.observe(el))

 
//Scrol
//jQuery('#menu a, #logo, .scrol').click(function() {
	//var elementClicked = jQuery(this).attr("href");
	//var destination = jQuery(elementClicked).offset().top;
	//jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-0}, 1000 );		   
	//return false;
//});	
		
});


 