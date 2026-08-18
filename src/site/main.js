// Crops strip nav
const cropsTrack=document.getElementById('cropsTrack');
const cropStep=220;
document.getElementById('cropPrev')?.addEventListener('click',()=>cropsTrack.scrollBy({left:-cropStep,behavior:'smooth'}));
document.getElementById('cropNext')?.addEventListener('click',()=>cropsTrack.scrollBy({left:cropStep,behavior:'smooth'}));

// Mobile nav
const toggle=document.getElementById('navToggle');
const links=document.getElementById('navLinks');
toggle.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  links.classList.remove('open');toggle.setAttribute('aria-expanded','false');
}));

// Scroll reveal
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      if(e.target.classList.contains('stats'))runCounters(e.target);
      io.unobserve(e.target);
    }
  });
},{threshold:.15});
document.querySelectorAll('.fade').forEach(el=>io.observe(el));

// Stat counters
function runCounters(scope){
  scope.querySelectorAll('.stat-num').forEach(el=>{
    const target=parseInt(el.dataset.count,10);
    const suffix=el.dataset.suffix||'';
    if(prefersReduced){el.textContent=target.toLocaleString('en-IN')+suffix;return;}
    const dur=1400,start=performance.now();
    function tick(now){
      const p=Math.min((now-start)/dur,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.round(target*eased).toLocaleString('en-IN')+suffix;
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// Contact form (static site: shows confirmation; wire to Formspree for real delivery)
document.getElementById('formSend').addEventListener('click',()=>{
  const name=document.getElementById('fName').value.trim();
  const contact=document.getElementById('fEmail').value.trim();
  const msg=document.getElementById('fMsg').value.trim();
  if(!name||!contact||!msg){
    alert('Please fill in all three fields so we can get back to you.');
    return;
  }
  document.getElementById('formFields').style.display='none';
  document.getElementById('formThanks').style.display='block';
});
