// Paws and Purrrls — scroll-spy, mobile menu, lightbox, reveal, booking form
(function(){
  var links=[].slice.call(document.querySelectorAll('.navlinks a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);});
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  secs.forEach(function(s){io.observe(s);});
  var btn=document.querySelector('.menu-btn'), nav=document.querySelector('.navlinks');
  if(btn){btn.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    btn.setAttribute('aria-expanded',open);
  });}
  nav.addEventListener('click',function(e){if(e.target.tagName==='A')nav.classList.remove('open');});
  var lb=document.querySelector('.lightbox'), lbImg=lb.querySelector('img'), close=lb.querySelector('button');
  document.querySelectorAll('.gal img').forEach(function(im){
    im.addEventListener('click',function(){lbImg.src=im.dataset.full||im.src;lbImg.alt=im.alt;lb.classList.add('open');close.focus();});
    im.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();im.click();}});
  });
  function shut(){lb.classList.remove('open');}
  close.addEventListener('click',shut);
  lb.addEventListener('click',function(e){if(e.target===lb)shut();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')shut();});
  var ro=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);}});
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el);});
  var form=document.getElementById('book-form');
  if(form){form.addEventListener('submit',function(e){
    e.preventDefault();
    var pet=document.getElementById('f-pet').value||'my pet';
    var svc=document.getElementById('f-service').value||'a groom';
    var msg='Hi Paws and Purrrls, I would like to book '+svc+' for '+pet+'.';
    window.location.href='mailto:mandyzouppas@gmail.com?subject='+encodeURIComponent('Grooming booking enquiry')+'&body='+encodeURIComponent(msg);
  });}
})();
