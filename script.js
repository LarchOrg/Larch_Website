// CURSOR
const cur=document.getElementById('cur'),cr=document.getElementById('cur-r');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
});
(function loop(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;cr.style.left=rx+'px';cr.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.feat-card,.case-card,.ind-card,.test-card,.cat-mod,.job').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.5)';cr.style.transform='translate(-50%,-50%) scale(1.5)'});
  el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';cr.style.transform='translate(-50%,-50%) scale(1)'});
});

// NAV
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('solid',scrollY>80)});

// HERO SLIDER
let hi=0,hTimer;
const hslides=document.querySelectorAll('.hslide'),hdots=document.querySelectorAll('.hdot'),hpf=document.getElementById('hpf');
function goH(n){
  hslides[hi].classList.remove('active');hdots[hi].classList.remove('on');
  hi=n;hslides[hi].classList.add('active');hdots[hi].classList.add('on');
  document.getElementById('hslides').style.transform='translateX(-'+hi*100+'%)';
  resetHP();
}
function nextH(){goH((hi+1)%6)}
function prevH(){goH((hi+5)%6)}
function resetHP(){
  clearTimeout(hTimer);
  hpf.style.transition='none';hpf.style.width='0%';
  setTimeout(()=>{hpf.style.transition='width 5.5s linear';hpf.style.width='100%'},60);
  hTimer=setTimeout(nextH,5700);
}
resetHP();

// STATS COUNTER
let counted=false;
window.addEventListener('scroll',()=>{
  if(counted)return;
  const r=document.querySelector('.stats-row').getBoundingClientRect();
  if(r.top<innerHeight-100){
    counted=true;
    document.querySelectorAll('.stat-num[data-t]').forEach(el=>{
      const t=+el.dataset.t;let c=0;const s=t/45;
      const iv=setInterval(()=>{c=Math.min(c+s,t);el.textContent=Math.floor(c)+(t>=10?'+':'');if(c>=t)clearInterval(iv)},35);
    });
  }
});

// CATALOGUE MODULE ACTIVE
document.querySelectorAll('.cat-mod').forEach(m=>{
  m.addEventListener('click',()=>{document.querySelectorAll('.cat-mod').forEach(x=>x.classList.remove('act'));m.classList.add('act')});
});

// SCROLL REVEAL
const ro=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

// CASE STUDY – open page
function openCase(i) {
  window.location.href = 'case.html?id=' + i;
}

function closeCase() {
  document.getElementById('caseOverlay').classList.remove('show');
  document.getElementById('casePopup').classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCase(); });

// CONTACT FORM – SEND MESSAGE
function sendContactMail() {
  const name     = document.getElementById('cf-name').value.trim();
  const company  = document.getElementById('cf-company').value.trim();
  const email    = document.getElementById('cf-email').value.trim();
  const phone    = document.getElementById('cf-phone').value.trim();
  const industry = document.getElementById('cf-industry').value;
  const message  = document.getElementById('cf-message').value.trim();

  const subject = encodeURIComponent('Enquiry from ' + (name || 'Website Visitor') + (company ? ' – ' + company : ''));

  const body = encodeURIComponent(
    'Name: '     + (name     || '–') + '\n' +
    'Company: '  + (company  || '–') + '\n' +
    'Email: '    + (email    || '–') + '\n' +
    'Phone: '    + (phone    || '–') + '\n' +
    'Industry: ' + (industry || '–') + '\n\n' +
    'Message:\n' + (message  || '–')
  );

  window.location.href = 'mailto:sales@larch.in?subject=' + subject + '&body=' + body;
}