(function(){
  function repairPage(){var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var node;while(node=walker.nextNode()){node.nodeValue=node.nodeValue.replace(/\u06b7/g,' \u00b7 ').replace(/\u00da\u00b7/g,' \u00b7 ')}}
  function init(){
    repairPage();
    document.querySelectorAll('form[data-vote-form]').forEach(function(form){
      var voteSection=form.closest('section');
      if(voteSection){var heading=voteSection.querySelector('h2'),intro=voteSection.querySelector('p'),legend=form.querySelector('legend'),submit=form.querySelector('button');if(heading)heading.textContent='\u00bfCu\u00e1nto valor le ves a esta idea?';if(intro)intro.textContent='Tu voto es lo m\u00e1s importante. Los dem\u00e1s datos son opcionales.';if(legend)legend.textContent='Valora la idea \u00b7 obligatorio';if(submit)submit.textContent='Enviar mi voto \u2192'}
      form.addEventListener('submit',async function(event){
        event.preventDefault();
        var endpoint=window.XP_VOTE_ENDPOINT;
        var button=form.querySelector('button[type="submit"],button:not([type])');
        if(!endpoint||endpoint.indexOf('PASTE_')===0){alert('Configura primero el endpoint de votaci\u00f3n.');return}
        if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Guardando voto\u2026'}
        try{
          var data=Object.fromEntries(new FormData(form).entries());data.page=location.pathname;data.submitted_at=new Date().toISOString();
          var ipResponse=await fetch('https://api64.ipify.org?format=json');var ipData=await ipResponse.json();data.client_ip=ipData.ip;
          try{var geoResponse=await fetch('https://ipapi.co/'+encodeURIComponent(data.client_ip)+'/json/');var geo=await geoResponse.json();data.country=geo.country_name||'';data.city=geo.city||''}catch(geoError){data.country='';data.city=''}
          var response=await fetch(endpoint,{method:'POST',mode:'cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)});var result=await response.json();
          if(!result.ok){alert(result.message||'No se pudo registrar el voto.');return}
          form.reset();alert('\u00a1Gracias! Tu voto se ha registrado correctamente. Te quedan '+result.remaining+' votos.')
        }catch(error){alert('No se pudo guardar el voto. Int\u00e9ntalo de nuevo.')}finally{if(button){button.disabled=false;button.textContent=button.dataset.originalText}}
      });
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
