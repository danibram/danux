//Globales
var App={};App.init={rap:"rapisamazing"};var puertas_aux="sel",modulos_aux="div",pselect=0,moduleselect=0,puertaselect=0,materialselect=[],colortemp="",anchuratemp=0,stage="",stagep="",layer=new Kinetic.Layer,layeri=new Kinetic.Layer,layerp=new Kinetic.Layer,layerpi=new Kinetic.Layer,layerm=new Kinetic.Layer,alto="",ancho="",anchoaltillo=.13,App={};App.Kinetic={stage:stage,stagep:stagep,layer:layer,layeri:layeri,layerp:layerp,layerpi:layerpi,layerm:layerm,alto:"",ancho:"",anchialtillo:.13};$(function(){var e=$("#sel_parent");e.find("a").live("click",function(){$("a.selector").removeClass("onn");$(this).addClass("onn");return!1});$(".item img").live("click",function(){var e=$(this).attr("ref"),t=moduleselect.substring(1,2);moduleselect.substring(3,4)==1?WardrobeModel.getWardrobe().modules[t].ref1=e:moduleselect.substring(3,4)==2&&(WardrobeModel.getWardrobe().modules[t].ref2=e);pintamodulos();popup.closePopup()});$(".item2 img").live("click",function(){var e=$(this).attr("ref"),t=$(this).attr("div");$.each(materialselect,function(n,r){var i=r.substring(1,2);wardrobe.doors[i].type=e;var s=[];for(var o=0;o<t;o++)s.push(0);wardrobe.doors[i].material=s});materialselect=[];var e=$(this).attr("ref"),n=puertaselect.substring(1,2);wardrobe.doors[n].type=e;var t=$(this).attr("div"),r=[];for(var i=0;i<t;i++)r.push(0);wardrobe.doors[n].material=r;pintapuertas();popup.closePopup()});$(".item3 img").live("click",function(){var e=$(this).attr("ref");$.each(materialselect,function(t,n){var r=n.substring(1,2),i=n.substring(3,4);wardrobe.doors[r].material[i]=e});materialselect=[];pintapuertas();acabado_perfil();popup.closePopup()});$(".item4 img").live("click",function(){var e=$(this).attr("ref");wardrobe.data.marco=parseInt(e);$("#mat_marc").html("");pintapuertas();cambio_marco();popup.closePopup()});$(".item5 img").live("click",function(){var e=$(this).attr("ref");wardrobe.data.handle=parseInt(e);cambio_tirador();popup.closePopup()});$(".accint img").live("click",function(){var e=parseInt($(this).attr("ref")),t=wardrobe.accint.indexOf(e);t==-1&&wardrobe.accint.push(e);AgregarAccInt();popup.closePopup()})});