(function(){
  function init(){
    document.querySelectorAll('form[data-vote-form]').forEach(function(form){
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
