/* Apply before paint so a saved dark theme never flashes white. */
(()=>{
 const key='attention-theme',system=matchMedia('(prefers-color-scheme: dark)');
 let preference='system';try{const saved=localStorage.getItem(key);if(['light','dark','system'].includes(saved))preference=saved}catch{}
 function apply(){
  const dark=preference==='dark'||(preference==='system'&&system.matches);
  document.documentElement.dataset.theme=dark?'dark':'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#000000':'#ffffff');
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themeChoice===preference)));
 }
 apply();system.addEventListener('change',apply);
 addEventListener('storage',event=>{if(event.key===key||event.key===null){preference=['light','dark'].includes(event.newValue)?event.newValue:'system';apply()}});
 document.addEventListener('DOMContentLoaded',()=>{
  apply();const picker=document.querySelector('.theme-picker');
  document.querySelectorAll('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>{
   preference=button.dataset.themeChoice;try{localStorage.setItem(key,preference)}catch{}
   apply();picker.open=false;picker.querySelector('summary').focus();
  }));
  document.addEventListener('click',event=>{if(picker&&!picker.contains(event.target))picker.open=false});
  picker?.addEventListener('keydown',event=>{if(event.key==='Escape'){picker.open=false;picker.querySelector('summary').focus()}});
 });
})();
