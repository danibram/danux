//Document ready
function addOpt(oCntrl,iPos,sTxt,sVal){var selOpcion=new Option(sTxt,sVal);eval(oCntrl.options[iPos]=selOpcion)}function calculo_puertas(e){while(e.length)e.remove(0);switch(document.frm.puerta.selectedIndex){case 0:$("#type").text("puertas");break;case 1:$("#type").text("modulos");if(document.frm.mancho.value<300){addOpt(e,0,"Imposible",0);break}var t=1,n=1,r=1,i=1;while(i!=0){var s=document.frm.mancho.value/t;s>650?n+=1:s<=650&&s>=300?r=t:s<300&&(i=0);t++}var o=r-n+1;for(var u=0;u<o;u++)addOpt(e,u,u+n,u+n);puertas_impares_bat();break;case 2:$("#type").text("puertas");if(document.frm.mancho.value<600){addOpt(e,0,"Imposible",0);break}var t=2,n=2,r=2,i=1;while(i!=0){var s=document.frm.mancho.value/t;s>1200?n+=1:s<=1200&&s>=600?r=t:s<600&&(i=0);t++}var o=r-n+1;for(var u=0;u<o;u++)addOpt(e,u,u+n,u+n);puertas_impares_bat();break;case 3:$("#type").text("puertas");if(document.frm.mancho.value<300){addOpt(e,0,"Imposible",0);break}var t=1,n=1,r=1,i=1;while(i!=0){var s=document.frm.mancho.value/t;s>650?n+=1:s<=650&&s>=300?r=t:s<300&&(i=0);t++}var o=r-n+1;for(var u=0;u<o;u++)addOpt(e,u,u+n,u+n);puertas_impares_bat()}}function puertas_impares_bat(){document.getElementById("puertas_imp_bat").innerHTML="";if(document.frm.npuertas.value%2!=0&&document.frm.puerta.value==1){var e=document.getElementById("puertas_imp_bat");e.innerHTML="Posicion puerta impar:<select name='donde_imp'></select>";var t=0,n=parseInt(document.frm.npuertas.value)+1;for(var r=0;r<n;r++)if(r%2!=0){addOpt(document.frm.donde_imp,t,r,r);t++}}}$(document).ready(function(){$("a.next-tab").on("click",function(e){WardrobeModel.initialize();WardrobeModel.guardarJson()})});