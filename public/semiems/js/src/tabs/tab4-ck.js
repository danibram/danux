//Documente ready
$(document).ready(function(){$(document).bind("sync",function(){Tab4Controller.pintarPerfil();Tab4Controller.pintarTirador()});$(document).bind("sync_popup",function(){document.getElementById("handles")&&$("#handles .element").click(function(){var e=$(this).data("id");Tab4Controller.añadirTirador(e);popup.closePopup()})});$(document).bind("sync_save",function(){Tab4Controller.pintarPerfil();Tab4Controller.pintarTirador()});$(document).bind("error",function(){});WardrobeModel.fetch();$("a.next-tab").on("click",function(e){e.preventDefault();App.Navigator.goNext()});$("a.prev-tab").on("click",function(e){App.Navigator.goBack()})});Tab4Controller={initialize:function(){},pintarPerfil:function(){$("#perfil_sel").html("&nbsp");$.ajax({type:"GET",url:"API/asides/getPerfil",success:function(e){$("#perfil_sel").append(e)}})},pintarTirador:function(){$("#handles_sel").html("&nbsp");$.ajax({type:"GET",url:"API/asides/getTirador",success:function(e){$("#handles_sel").append(e)}})},"añadirTirador":function(e){WardrobeModel.wardrobe.data.handle=e;WardrobeModel.save()},"añadirPerfil":function(e,t){WardrobeModel.wardrobe.data.tperfil=e;WardrobeModel.wardrobe.data.perfil=t;WardrobeModel.save();popup.closePopup()},getPerfilAcabados:function(e){$.ajax({type:"GET",url:"API/popup/view/perfilesView",data:{type:e},success:function(e){$("#materiales").html(e);$("#materiales .element").click(function(){var e=$(this).data("tipoperfil"),t=$(this).data("id");Tab4Controller.añadirPerfil(e,t)})}})}};