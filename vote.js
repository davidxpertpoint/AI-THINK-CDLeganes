(function(){
  function repairPage(){var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);var node;while(node=walker.nextNode()){node.nodeValue=node.nodeValue.replace(/\u06b7/g,' \u00b7 ').replace(/\u00da\u00b7/g,' \u00b7 ')}}
  function init(){
    repairPage();
    document.querySelectorAll('form[data-vote-form]').forEach(function(form){
      form.classList.add('vote-card');
      var voteSection=form.closest('section'),heading=voteSection&&voteSection.querySelector('h2'),intro=voteSection&&voteSection.querySelector('p'),legend=form.querySelector('legend'),submit=form.querySelector('button');
      if(heading)heading.textContent='Haz que esta idea avance';
      if(intro)intro.textContent='Tu valoración convierte una buena intuición en una oportunidad real.';
      if(legend){legend.textContent='¿Cuánto la apoyarías?';legend.setAttribute('aria-label','Valoración obligatoria');var hint=document.createElement('p');hint.className='vote-hint';hint.textContent='Elige de 1 a 5 estrellas · obligatorio';legend.insertAdjacentElement('afterend',hint)}
      if(submit){submit.classList.add('vote-submit');submit.textContent='Apoyar esta idea →'}
      var radios=Array.from(form.querySelectorAll('.stars input[type="radio"]')),labels=Array.from(form.querySelectorAll('.stars label')),status=document.createElement('p');
      status.className='vote-status';form.querySelector('.stars').insertAdjacentElement('afterend',status);
      function syncStars(){var selected=Number((radios.find(function(radio){return radio.checked})||{}).value||0);labels.forEach(function(label){var radio=document.getElementById(label.htmlFor);label.classList.toggle('active',!!radio&&Number(radio.value)<=selected)});status.textContent=selected?selected+'/5 · '+['','Todavía necesita trabajo','Puede mejorar','Tiene potencial','Muy buena oportunidad','Quiero verla en marcha'][selected]:'Aún no has elegido una valoración'}
      radios.forEach(function(radio){radio.setAttribute('aria-label',radio.value+' de 5 estrellas');radio.addEventListener('change',syncStars)});labels.forEach(function(label){label.title='Seleccionar '+label.htmlFor.replace(/\D/g,'')+' estrellas'});syncStars();
      form.addEventListener('submit',async function(event){
        event.preventDefault();var endpoint=window.XP_VOTE_ENDPOINT,button=form.querySelector('button[type="submit"],button:not([type])');
        if(!endpoint||endpoint.indexOf('PASTE_')===0){alert('Configura primero el endpoint de votación.');return}
        if(button){button.disabled=true;button.dataset.originalText=button.textContent;button.textContent='Guardando tu apoyo…'}
        try{var data=Object.fromEntries(new FormData(form).entries());data.page=location.pathname;data.submitted_at=new Date().toISOString();var ipResponse=await fetch('https://api64.ipify.org?format=json'),ipData=await ipResponse.json();data.client_ip=ipData.ip;try{var geoResponse=await fetch('https://ipapi.co/'+encodeURIComponent(data.client_ip)+'/json/'),geo=await geoResponse.json();data.country=geo.country_name||'';data.city=geo.city||''}catch(geoError){data.country='';data.city=''}var response=await fetch(endpoint,{method:'POST',mode:'cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data)}),result=await response.json();if(!result.ok){alert(result.message||'No se pudo registrar el voto.');return}form.reset();syncStars();var remaining=typeof result.remaining==='number'?' Te quedan '+result.remaining+' votos por esta idea.':'';alert('¡Gracias! Tu apoyo se ha registrado correctamente.'+remaining)}catch(error){alert('No se pudo guardar el voto. Inténtalo de nuevo.')}finally{if(button){button.disabled=false;button.textContent=button.dataset.originalText}}});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
