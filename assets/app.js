(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.querySelector('nav.main');
  if(btn&&nav)btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  // Newsletter placeholder (wire to email service later)
  document.querySelectorAll('form[data-newsletter]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var n=f.querySelector('.note');if(n)n.textContent='Thanks! Sign-ups open soon — we\u2019ll be in touch.';f.reset();});});
  document.querySelectorAll('form[data-placeholder]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var n=f.querySelector('.form-status');if(n)n.textContent='Thanks! This form isn\u2019t live yet — submissions open soon.';});});
  var q=document.getElementById('q');if(!q)return;
  var cards=[].slice.call(document.querySelectorAll('.card[data-cat]')),blocks=[].slice.call(document.querySelectorAll('.cat-block')),chips=[].slice.call(document.querySelectorAll('.chip[data-filter]')),nzOnly=document.getElementById('nzonly'),empty=document.querySelector('.empty'),count=document.getElementById('count');
  var cat='all';
  var params=new URLSearchParams(location.search);if(params.get('q'))q.value=params.get('q');if(params.get('cat'))cat=params.get('cat');
  function apply(){
    var term=q.value.trim().toLowerCase(),shown=0;
    cards.forEach(function(c){var ok=(cat==='all'||c.dataset.cat===cat)&&(!term||c.dataset.search.indexOf(term)>-1)&&(!nzOnly.checked||c.dataset.nz==='1');c.hidden=!ok;if(ok)shown++;});
    blocks.forEach(function(b){b.hidden=!b.querySelector('.card[data-cat]:not([hidden])');});
    chips.forEach(function(ch){ch.setAttribute('aria-pressed',ch.dataset.filter===cat)});
    empty.style.display=shown?'none':'block';count.textContent=shown;
  }
  chips.forEach(function(ch){ch.addEventListener('click',function(){cat=ch.dataset.filter;apply();})});
  q.addEventListener('input',apply);nzOnly.addEventListener('change',apply);apply();
})();
