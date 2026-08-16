(function(){
  function init(){
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
