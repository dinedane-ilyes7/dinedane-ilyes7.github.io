(function(){
  'use strict';
  const root=document.documentElement;
  const toggle=document.querySelector('.theme-toggle');
  const filters=Array.from(document.querySelectorAll('.filter[data-filter]'));
  const cards=Array.from(document.querySelectorAll('.project-card[data-tags]'));
  const status=document.getElementById('filter-summary');
  const year=document.getElementById('year');
  if(year)year.textContent=String(new Date().getFullYear());
  function setTheme(value){
    const mode=value==='light'?'light':'dark';
    root.setAttribute('data-theme',mode);
    if(!toggle)return;
    const dark=mode==='dark';
    toggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
    toggle.title=dark?'Switch to light theme':'Switch to dark theme';
    const icon=toggle.querySelector('.theme-icon');
    if(icon)icon.textContent=dark?'☼':'☾';
    const themeColor=document.querySelector('meta[name="theme-color"]');
    if(themeColor)themeColor.content=dark?'#0c151b':'#f7f9f6';
  }
  let theme='dark';
  try{theme=localStorage.getItem('ilyes-portfolio-theme')||'dark'}catch(_){}
  setTheme(theme);
  if(toggle)toggle.addEventListener('click',()=>{
    const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    setTheme(next);
    try{localStorage.setItem('ilyes-portfolio-theme',next)}catch(_){}
  });
  function applyFilter(name){
    let visible=0;
    for(const card of cards){
      const tags=(card.dataset.tags||'').trim().split(/\s+/);
      const show=name==='all'||tags.includes(name);
      card.hidden=!show;
      if(show)visible++;
    }
    for(const button of filters){
      const active=button.dataset.filter===name;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    }
    if(status)status.textContent=name==='all'
      ?`Showing all ${visible} projects`
      :`Showing ${visible} ${name} ${visible===1?'project':'projects'}`;
  }
  for(const button of filters){
    button.addEventListener('click',()=>applyFilter(button.dataset.filter));
  }
})();