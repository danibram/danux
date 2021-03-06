$(document).ready(function(){
	//$('.breadcrumbs').fadeOut('slow');

	App.Navigator.initialize();

	$('#wardrobemenu a').click(function(e){
		e.preventDefault();
		var id = $(this).attr('wardrobe');
		$.ajax({
			type: 'POST',
			url: 'session/' + id,
			success: function(response) {
				//alert('Se ha cargado el armario con ID '+ response)
				if (location.href !== "1#wardrobe-create"){
					location.href = "1";
				}else{
					location.reload();
				}
			},
			error: function(){
				alert('Hubo un error al cargar el identificador');
			}
		});
	});
	$('.edit').click(function(){
		alert('Has hecho click en editar')
	});
	$('.delete').click(function(){
		alert('Has hecho click en borrar')
	});
	$('#link').click(function(){
		if(document.getElementById('link').className == "close") {
			$("#wardrobemenu").removeClass("show")
			$("#link").removeClass("close")
		}else{
			$("#wardrobemenu").addClass("show")
			$("#link").addClass("close")
		}
	});
	$('#help-btn').click(function(){
		App.Help.open();
	});
});

WardrobeMenuController = {
	show: function(){
		$("#wardrobemenu").addClass("show")
	},
	close: function(){
		$("#wardrobemenu").removeClass("show")
	},
	flushWardrobe: function(){
		$.ajax({
			type: 'GET',
			url: 'API/session/flush',
			success: function(response) {
				//alert('Se ha cargado el armario con ID '+ response)
				if (location.href !== "1#wardrobe-create"){
					location.href = "1";
				}else{
					location.reload();
				}
			},
			error: function(){
				alert('Hubo un error al cargar el identificador');
			}
		});
	}
}
/*
App.Help = {
	open: function(){
		// Close WardrobeMenu
		$("#wardrobemenu").removeClass("show");
		// Show the help
		$('#help').show();
		setTimeout(function(){
			$('#help .content, #help .page-screen').addClass('show');
			$('#wardrobemenu').addClass('blur');
		},200);
	},
	close: function() {
		$('#help .page-screen, #help .content').removeClass('show');
		setTimeout(function(){
		$('#help').hide();
		$('#wardrobemenu').removeClass('blur');
		}, 500);

	}
}*/
App.Help = {
	open: function(){
		// Close WardrobeMenu
		$("#wardrobemenu").removeClass("show");
		// Show the help
		$('body').chardinJs('start')
	},
	close: function() {
		$('body').chardinJs('stop')
	}
}
App.Navigator = {
	tab:0,
	// Get the tab present
	initialize: function(){
		myUrl = location.href;
		var aux = myUrl.split('#');
		this.tab=parseInt(aux[0].substring(aux[0].length-1));
		this.styleNav(this.tab);
	},
	goNext: function(){
		$('.breadcrumbs').fadeIn('slow');
		location.href = this.tab + 1;
	},
	goBack: function(){
		$('.breadcrumbs').fadeIn('slow');
		location.href = this.tab - 1;
	},
	buttonConfig: function(){
		var hash = location.hash;
		if (hash== '#config'){
			App.Router.navigate('wardrobe-create', {trigger: true});
		}else if (hash == '#wardrobe-create'){
			App.Router.navigate('config', {trigger: true});
		} else {
			// Default behavior
			App.Router.navigate('config', {trigger: true});

		}
	},
	styleNav: function(x){
		lis = $('.breadcrumbs').find('li');
		for (var i=0; i<lis.length; i++)
		{
			lis = $('.breadcrumbs').find('li')
			if(i == this.tab-1){
				lis[i].className = "current"
			}else if (i<this.tab-1){
				lis[i].className = "available"
			}else if (i>this.tab-1){
				lis[i].className = "unavailable"
			}
			console.log(lis[i])

		}
	}

}
App.Router =  new (Backbone.Router.extend({
	initialize: function() {},
	routes: {
		"": 'index',
		"config": 'config',
		"wardrobe-create": 'wardrobe',

	},
	sectionsID: ['#config', '#wardrobe-create'],

	// Helper function
	navigateToSection: function(section) {
		_this = this;
		// Transicion de salida
		$.each(_this.sectionsID, function(index, value){
			$(value).removeClass('show');
		});

		// Configuracion por defecto
		setTimeout(function(){
			$.each(_this.sectionsID , function(index, value){
				$(value).hide();
			});
			$(section).show();
			// Transicion de entrada
			setTimeout(function() {
				$(section).addClass('show')
			}, 100);
		}, 300);	
	},
	index: function() {
		_this = this;
		$(document).ready(function(){
			// Transicion de salida
			$.each(_this.sectionsID, function(index, value){
				$(value).hide();
				$(value).removeClass('show');
			});
			$('#wardrobe-create').addClass('show');
			// Interrumpimos la animacion con un evento timer
			setTimeout(function(){$('#wardrobe-create').show();$('.breadcrumbs').fadeIn('slow');},0);
			//$('#wardrobe-create').show();
		});
	},
	config: function() {
		$('.breadcrumbs').fadeOut('slow');
		this.navigateToSection('#config');	
	},
	wardrobe: function() {
		$('.breadcrumbs').fadeIn('slow');
		this.navigateToSection('#wardrobe-create');
	}
}));
Backbone.history.start();



App.Notice ={
	
}

// La app responde a los eventos 'stack' y 'undo'

App.History = $.extend({
	saveWardrobe: function(){
		this.save(WardrobeModel.wardrobe);
		this.evaluateController();
	},
	undoWardrobe: function() {
		WardrobeModel.wardrobe = this.undo();
		if(this.get_size() == 0) {this.saveWardrobe();}
	},
	evaluateController: function() {
		$count = $('#back-count');
		// Show Actual stack size on #back-count
		$count.text(this.get_size() - 1);
		$btn = $('#back-btn');
		// if there is no history, opacity should decrease to 0.3
		if(this.get_size() - 1 == 0) {	
			$btn.animate({opacity: 0.3});
		} else {
			$btn.animate({opacity: 1});
		}
	},
	back_button_action: function() {
		$btn = $('#back-btn');
		// Set the event trigger on click
		$(document).trigger('undo');
		// Animate click

		$btn.removeClass('clicked')
		_.delay(function(){$btn.addClass('clicked'), 0});
		
		// Evaluate the count
		this.evaluateController();		
	}
}, new History());

// Error display
App.errors = function() {
	$errors = $('#errors ul li');
	if($errors.size() > 0) {
		$errors.parent().parent().show();
	}
}





