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

const $form = jQuery('#form')
$form.on('submit', e => {
	console.log(`$form.serialize()====`, $form.serializeArray())
	console.log(`e====`, e)

	e.preventDefault()
	
	let data =  $form.serializeArray().reduce((pre, cur) => {
		pre[cur.name] = cur.value;
		return pre;
	}, {})
	console.log(`data====`, data)
	jQuery.ajax({
		url: $form.action,
		data,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		type: 'POST',
		success(result){
			console.log(`result====`, result)
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


 