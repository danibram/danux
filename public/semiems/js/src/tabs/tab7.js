//Documente ready
$(document).ready(function(){
	// Obtener el objeto
	$(document).bind('sync',function(){
		Tab8Controller.pintarPresupuesto();
	});
	$(document).bind('sync_save',function(){
		Tab8Controller.pintarPresupuesto();
	});
	$(document).bind('error',function(){
	
	});

	WardrobeModel.fetch();


	$('a.next-tab').on('click',function(e){
		e.preventDefault();
		App.Navigator.goNext();
	});
	$('a.prev-tab').on('click',function(e){	
		App.Navigator.goBack();
	});
});

Tab8Controller = {

	initialize: function(){
	},
	pintarPresupuesto: function(){
		//Borro y pongo espacio para que que 
		// hay debajo del div no se mueva y 
		// provoque errores visuales
		$.ajax({
       		type: 'GET',  
            url: 'API/asides/getPresupuesto',
            success: function(data) {  
                $("#presupuesto").append(data)
            }  
        })			
	}
}