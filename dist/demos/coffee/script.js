const drinks={espresso:{tag:'SHORT / FULL OF CHARACTER',name:'ESPRESSO',copy:'A small cup with plenty to say. Rich, balanced and a little sweet — just as it should be.',size:'Double shot',price:'32 DKK'},flat:{tag:'SOFT / SMOOTH / UNHURRIED',name:'FLAT WHITE',copy:'A double espresso folded into silky milk. A little softer, with all the coffee character still there.',size:'180 ml',price:'42 DKK'},filter:{tag:'LONG / CLEAN / EASY GOING',name:'FILTER',copy:'A slower cup for a longer conversation. Clean and gentle, with room for the coffee to speak.',size:'250 ml',price:'35 DKK'}};
const categories={coffee:[['Espresso','A balanced double shot','32 DKK'],['Flat white','Double espresso, silky milk','42 DKK'],['Filter coffee','A longer, gentler cup','35 DKK'],['Cappuccino','Espresso under a soft cloud','42 DKK']],bakes:[['Cinnamon bun','Soft dough, cinnamon, a little crunch','38 DKK'],['Butter croissant','Flaky, golden and made for coffee','32 DKK'],['Cardamom knot','Fragrant spice and a soft centre','38 DKK']]};
function wireTabs(selector,callback){const tabs=[...document.querySelectorAll(selector)];tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>{tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});callback(tab);});tab.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const index=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[index].click();tabs[index].focus();});});}
wireTabs('[data-drink]',tab=>{const d=drinks[tab.dataset.drink];document.querySelector('#drink-panel').setAttribute('aria-labelledby',tab.id);for(const [id,value] of [['drink-tag',d.tag],['drink-name',d.name],['drink-copy',d.copy],['drink-size',d.size],['drink-price',d.price]])document.getElementById(id).textContent=value;updatePoster(tab.dataset.drink);});
wireTabs('[data-category]',tab=>{const panel=document.querySelector('#menu-panel');panel.setAttribute('aria-labelledby',tab.id);panel.replaceChildren(...categories[tab.dataset.category].map(([name,description,price])=>{const row=document.createElement('div');row.className='menu-row';const body=document.createElement('div'),h=document.createElement('h3'),p=document.createElement('p'),s=document.createElement('span');h.textContent=name;p.textContent=description;s.textContent=price;body.append(h,p);row.append(body,s);return row;}));const note=document.createElement('p');note.className='menu-note';note.textContent='Ask about ingredients and allergens.';panel.append(note);});
import('./bean-scene.js').then(({mountBeans})=>mountBeans()).catch(()=>{});
import('../shared/editorial-motion.js').then(({revealSections})=>revealSections('.section-heading, .menu>div, .place__text, .visit>div')).catch(()=>{});

const posterWords={espresso:['01 / ESPRESSO','SHORT.','STRONG.','STILL.'],flat:['02 / FLAT WHITE','SOFT.','SILKY.','STILL.'],filter:['03 / FILTER','CLEAN.','SLOW.','STILL.']};
function updatePoster(key){
  const poster=document.querySelector('.drink-poster'),words=posterWords[key];
  poster.querySelector('.drink-poster__index').textContent=words[0];
  poster.querySelectorAll('.drink-poster__words span').forEach((line,i)=>{
    line.textContent=words[i+1];
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      line.getAnimations().forEach(animation=>animation.cancel());
      line.animate([{opacity:.1,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:700,delay:i*65,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    }
  });
}
