$(document).ready(function(){$("#wardrobemenu a").click(function(e){e.preventDefault();var t=$(this).attr("href");$.ajax({type:"POST",url:"session/"+t,success:function(e){location.href!=="1"?location.href="1":location.href.reload(!0)},error:function(){alert("Hubo un error al cargar el identificador")}})});$(".edit").click(function(){alert("Has hecho click en editar")});$(".delete").click(function(){alert("Has hecho click en borrar")});$("#link").click(function(){if(document.getElementById("link").className=="close"){$("#wardrobemenu").removeClass("show");$("#link").removeClass("close")}else{$("#wardrobemenu").addClass("show");$("#link").addClass("close")}});$("#help-btn").click(function(){App.Help.open()})});WardrobeMenuController={show:function(){$("#wardrobemenu").addClass("show")},close:function(){$("#wardrobemenu").removeClass("show")}};App.Help={open:function(){$("#wardrobemenu").removeClass("show");$("#help").show();setTimeout(function(){$("#help .content, #help .page-screen").addClass("show");$("#wardrobemenu").addClass("blur")},200)},close:function(){$("#help .page-screen, #help .content").removeClass("show");setTimeout(function(){$("#help").hide();$("#wardrobemenu").removeClass("blur")},500)}};