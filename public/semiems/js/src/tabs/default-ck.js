$(document).ready(function(){$(".breadcrumbs").fadeOut("slow");App.Navigator.initialize();$("#wardrobemenu a").click(function(e){e.preventDefault();var t=$(this).attr("wardrobe");$.ajax({type:"POST",url:"session/"+t,success:function(e){location.href!=="1#wardrobe-create"?location.href="1":location.reload()},error:function(){alert("Hubo un error al cargar el identificador")}})});$(".edit").click(function(){alert("Has hecho click en editar")});$(".delete").click(function(){alert("Has hecho click en borrar")});$("#link").click(function(){if(document.getElementById("link").className=="close"){$("#wardrobemenu").removeClass("show");$("#link").removeClass("close")}else{$("#wardrobemenu").addClass("show");$("#link").addClass("close")}});$("#help-btn").click(function(){App.Help.open()})});WardrobeMenuController={show:function(){$("#wardrobemenu").addClass("show")},close:function(){$("#wardrobemenu").removeClass("show")},flushWardrobe:function(){$.ajax({type:"GET",url:"API/session/flush",success:function(e){location.href!=="1#wardrobe-create"?location.href="1":location.reload()},error:function(){alert("Hubo un error al cargar el identificador")}})}};App.Help={open:function(){$("#wardrobemenu").removeClass("show");$("body").chardinJs("start")},close:function(){$("body").chardinJs("stop")}};App.Navigator={tab:0,initialize:function(){myUrl=location.href;var e=myUrl.split("#");this.tab=parseInt(e[0].substring(e[0].length-1));this.styleNav(this.tab)},goNext:function(){$(".breadcrumbs").fadeIn("slow");location.href=this.tab+1},goBack:function(){$(".breadcrumbs").fadeIn("slow");location.href=this.tab-1},buttonConfig:function(){var e=location.hash;e=="#config"?App.Router.navigate("wardrobe-create",{trigger:!0}):e=="#wardrobe-create"?App.Router.navigate("config",{trigger:!0}):App.Router.navigate("config",{trigger:!0})},styleNav:function(e){lis=$(".breadcrumbs").find("li");for(var t=0;t<lis.length;t++){lis=$(".breadcrumbs").find("li");t==this.tab-1?lis[t].className="current":t<this.tab-1?lis[t].className="available":t>this.tab-1&&(lis[t].className="unavailable");console.log(lis[t])}}};App.Router=new(Backbone.Router.extend({initialize:function(){},routes:{"":"index",config:"config","wardrobe-create":"wardrobe"},sectionsID:["#config","#wardrobe-create"],navigateToSection:function(e){_this=this;$.each(_this.sectionsID,function(e,t){$(t).removeClass("show")});setTimeout(function(){$.each(_this.sectionsID,function(e,t){$(t).hide()});$(e).show();setTimeout(function(){$(e).addClass("show")},100)},300)},index:function(){_this=this;$(document).ready(function(){$.each(_this.sectionsID,function(e,t){$(t).hide();$(t).removeClass("show")});$("#wardrobe-create").addClass("show");setTimeout(function(){$("#wardrobe-create").show();$(".breadcrumbs").fadeIn("slow")},0)})},config:function(){$(".breadcrumbs").fadeOut("slow");this.navigateToSection("#config")},wardrobe:function(){$(".breadcrumbs").fadeIn("slow");this.navigateToSection("#wardrobe-create")}}));Backbone.history.start();App.Notice={};App.History=$.extend({saveWardrobe:function(){this.save(WardrobeModel.wardrobe);this.evaluateController()},undoWardrobe:function(){WardrobeModel.wardrobe=this.undo();this.get_size()==0&&this.saveWardrobe()},evaluateController:function(){$count=$("#back-count");$count.text(this.get_size()-1);$btn=$("#back-btn");this.get_size()-1==0?$btn.animate({opacity:.3}):$btn.animate({opacity:1})},back_button_action:function(){$btn=$("#back-btn");$(document).trigger("undo");$btn.removeClass("clicked");_.delay(function(){$btn.addClass("clicked"),0});this.evaluateController()}},new History);