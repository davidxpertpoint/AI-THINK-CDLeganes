(function(){
  function repair(value){var map={'ƒ':131,'‚':130,'„':132,'…':133,'†':134,'‡':135,'ˆ':136,'‰':137,'Š':138,'‹':139,'Œ':140,'Ž':142,'‘':145,'’':146,'“':147,'”':148,'•':149,'–':150,'—':151,'˜':152,'™':153,'š':154,'›':155,'œ':156,'ž':158,'Ÿ':159};for(var i=0;i<6;i++){if(!/[ÃÂâƒ€]/.test(value))break;try{var bytes=[];for(var j=0;j<value.length;j++){var code=value.charCodeAt(j);bytes.push(map[value[j]]||code)}var fixed=new TextDecoder('utf-8').decode(new Uint8Array(bytes));if(fixed===value)break;value=fixed}catch(error){break}}return value}
  function repairPage(){var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var node;while(node=walker.nextNode()){if(node.nodeValue.trim())node.nodeValue=repair(node.nodeValue)}document.querySelectorAll('[alt],[title],[placeholder]').forEach(function(el){['alt','title','placeholder'].forEach(function(attr){if(el.hasAttribute(attr))el.setAttribute(attr,repair(el.getAttribute(attr)))})})}
  function init(){
    repairPage();
    document.querySelectorAll('form[data-vote-form]').forEach(function(form){
      var voteSection=form.closest('section');
      if(voteSection){var heading=voteSection.querySelector('h2'),intro=voteSection.querySelector('p'),legend=form.querySelector('legend'),submit=form.querySelector('button');if(heading)heading.textContent='\u00bfCu\u00e1nto valor le ves a esta idea?';if(intro)intro.textContent='Tu voto es lo m\u00e1s importante. Los dem\u00e1s datos son opcionales.';if(legend)legend.textContent='Valora la idea \u00b7 obligatorio';if(submit)submit.textContent='Enviar mi voto \u2192'}
      form.addEventListener('submit',async function(event){
        event.preventDefault();
        var endpoint=window.XP_VOTE_ENDPOINT;
        var button=form.querySelector('button[type="submit"],button:not([type])');
        if(!endpoint||endpoint.indexOf('PASTE_')===0){alert('Configura primero el endpoint de votación.');return}
        if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Guardando voto…'}
        try{var data=Object.fromEntries(new FormData(form).entries());data.page=location.pathname;data.submitted_at=new Date().toISOString();await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});form.reset();alert('¡Gracias! Tu voto se ha registrado correctamente.')}catch(error){alert('No se ha podido registrar el voto. Inténtalo de nuevo.')}finally{if(button){button.disabled=false;button.textContent=button.dataset.originalText}};
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
