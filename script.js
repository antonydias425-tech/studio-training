(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.card,blockquote').forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--x',(e.clientX-r.left)+'px');el.style.setProperty('--y',(e.clientY-r.top)+'px');});
  });
  function fmt(n,d){return n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});}
  function run(el){
    var to=parseFloat(el.dataset.to),d=parseInt(el.dataset.dec||'0',10);
    if(reduce){el.textContent=fmt(to,d);return;}
    var t0=null;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1100,1),e=1-Math.pow(1-p,3);el.textContent=fmt(to*e,d);if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);
  }
  var els=document.querySelectorAll('[data-to]');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){run(x.target);io.unobserve(x.target);}});},{threshold:.6});
    els.forEach(function(el){io.observe(el);});
  }
  document.documentElement.classList.add('js');
  var hd=document.querySelector('header.top');
  function sc(){hd.classList.toggle('scrolled',window.scrollY>8);}
  addEventListener('scroll',sc,{passive:true});sc();
  if(!reduce && 'IntersectionObserver' in window){
    var rio=new IntersectionObserver(function(es){es.forEach(function(x){
      if(x.isIntersecting){var el=x.target;el.classList.add('in');rio.unobserve(el);
        setTimeout(function(){el.classList.remove('rv','in');el.style.transitionDelay='';},1300);}
    });},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    document.querySelectorAll('.head,.card,blockquote,.steps li,.about .ph,.about .wrap>div:last-child,.contact .wrap>div').forEach(function(el){
      var i=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.transitionDelay=Math.min(i*100,300)+'ms';
      el.classList.add('rv');rio.observe(el);
    });
  }
})();
