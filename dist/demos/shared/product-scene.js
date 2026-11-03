import * as T from './vendor/three.module.min.js';
import {makeCup} from './cup-model.js';
import {makeSuspension} from './suspension-model.js';

export function mountProducts(type) {
  const pending = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      pending.unobserve(entry.target);
      mountProduct(entry.target, entry.target.dataset.product || type, entry.target.hasAttribute('data-story'));
    }
  }, {rootMargin: '250px'});
  document.querySelectorAll('[data-product]').forEach(host => pending.observe(host));
}

function studioEnvironment(renderer, warm) {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = warm ? '#65615c' : '#737980'; ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = warm ? '#fffaf3' : '#ffffff';
  ctx.fillRect(45, 15, 85, 175); ctx.fillRect(300, 35, 28, 150);
  ctx.fillStyle = warm ? '#a6a09a' : '#c5d7ea'; ctx.fillRect(400, 80, 70, 100);
  const tex = new T.CanvasTexture(canvas); tex.mapping = T.EquirectangularReflectionMapping;
  const pmrem = new T.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose(); pmrem.dispose(); return env;
}

function makeBrake() {
  const root=new T.Group(),rotor=new T.Group(),hub=new T.Group(),caliper=new T.Group();
  const metal=new T.MeshStandardMaterial({color:0xc1c5c9,metalness:.95,roughness:.3});
  const dark=new T.MeshStandardMaterial({color:0x202329,metalness:.7,roughness:.3});
  const black=new T.MeshStandardMaterial({color:0x111216,metalness:.35,roughness:.55});
  const textureCanvas=document.createElement('canvas');textureCanvas.width=1024;textureCanvas.height=1024;
  const brush=textureCanvas.getContext('2d');brush.fillStyle='#9b9da0';brush.fillRect(0,0,1024,1024);
  for(let i=185;i<510;i++){
    brush.strokeStyle=`rgba(${i%3===0?'15,18,23':'240,240,240'},${i%5===0?.15:.05})`;
    brush.lineWidth=.6;brush.beginPath();brush.arc(512,512,i,0,Math.PI*2);brush.stroke();
  }
  const brushed=new T.CanvasTexture(textureCanvas);brushed.colorSpace=T.SRGBColorSpace;
  const rotorMaterial=new T.MeshStandardMaterial({map:brushed,metalness:.86,roughness:.35});
  const shape=new T.Shape();shape.absarc(0,0,1.28,0,Math.PI*2,false);
  const hole=new T.Path();hole.absarc(0,0,.48,0,Math.PI*2,true);shape.holes.push(hole);
  for(let i=0;i<36;i++){const a=i*Math.PI*2/36;for(const r of [.84,1.08]){const h=new T.Path();h.absarc(Math.cos(a)*r,Math.sin(a)*r,.026,0,Math.PI*2,true);shape.holes.push(h);}}
  const rotorGeometry=new T.ExtrudeGeometry(shape,{depth:.09,bevelEnabled:true,bevelThickness:.008,bevelSize:.008,bevelSegments:2,curveSegments:64});
  const pos=rotorGeometry.attributes.position,uv=rotorGeometry.attributes.uv;
  for(let i=0;i<uv.count;i++)uv.setXY(i,pos.getX(i)/2.6+.5,pos.getY(i)/2.6+.5);
  const disk=new T.Mesh(rotorGeometry,rotorMaterial);rotor.add(disk);
  const rear=disk.clone();rear.position.z=-.18;rotor.add(rear);
  for(let i=0;i<48;i++){let a=i*Math.PI*2/48;const v=new T.Mesh(new T.BoxGeometry(.35,.025,.16),dark);v.position.set(Math.cos(a)*.99,Math.sin(a)*.99,-.04);v.rotation.z=a;rotor.add(v);}
  const hat=new T.Mesh(new T.CylinderGeometry(.53,.64,.25,64),dark);hat.rotation.x=Math.PI/2;hat.position.z=.13;hub.add(hat);
  const bearing=new T.Mesh(new T.CylinderGeometry(.22,.22,.34,48),metal);bearing.rotation.x=Math.PI/2;bearing.position.z=.2;hub.add(bearing);
  const inner=new T.Mesh(new T.CylinderGeometry(.145,.145,.35,48),black);inner.rotation.x=Math.PI/2;inner.position.z=.21;hub.add(inner);
  for(let i=0;i<5;i++){
    const a=i*Math.PI*2/5,x=Math.cos(a)*.4,y=Math.sin(a)*.4;
    const washer=new T.Mesh(new T.CylinderGeometry(.085,.085,.035,24),black);washer.rotation.x=Math.PI/2;washer.position.set(x,y,.275);hub.add(washer);
    const bolt=new T.Mesh(new T.CylinderGeometry(.055,.055,.1,6),metal);bolt.rotation.x=Math.PI/2;bolt.position.set(x,y,.31);hub.add(bolt);
  }
  const block=new T.Mesh(new T.CapsuleGeometry(.24,.88,8,20),dark);block.position.set(1.02,0,.2);block.rotation.z=-.09;caliper.add(block);
  const bridge=block.clone();bridge.position.set(1.02,0,-.27);caliper.add(bridge);
  for(const y of [-.39,.39]){
    const b=new T.Mesh(new T.BoxGeometry(.38,.18,.65),dark);b.position.set(1.02,y,-.02);caliper.add(b);
    const pin=new T.Mesh(new T.CylinderGeometry(.045,.045,.42,16),metal);pin.rotation.x=Math.PI/2;pin.position.set(.98,y,.29);caliper.add(pin);
  }
  for(const x of [.86,1,1.14]){const ridge=new T.Mesh(new T.CapsuleGeometry(.025,.55,4,8),black);ridge.position.set(x,0,.415);caliper.add(ridge);}
  const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=128;
  const labelCtx=labelCanvas.getContext('2d');labelCtx.fillStyle='#c8cbd0';labelCtx.font='500 45px Arial';labelCtx.textAlign='center';labelCtx.fillText('NORTHLINE',256,78);
  const labelTexture=new T.CanvasTexture(labelCanvas);labelTexture.colorSpace=T.SRGBColorSpace;
  const label=new T.Mesh(new T.PlaneGeometry(.7,.175),new T.MeshBasicMaterial({map:labelTexture,transparent:true}));label.rotation.z=Math.PI/2;label.position.set(1.02,0,.455);caliper.add(label);
  const pads=[];
  const padShape=new T.Shape();
  padShape.moveTo(-.12,-.36);padShape.lineTo(.12,-.36);
  padShape.quadraticCurveTo(.19,-.36,.19,-.27);padShape.lineTo(.19,.27);
  padShape.quadraticCurveTo(.19,.36,.12,.36);padShape.lineTo(-.12,.36);
  padShape.quadraticCurveTo(-.19,.36,-.19,.27);padShape.lineTo(-.19,-.27);
  padShape.quadraticCurveTo(-.19,-.36,-.12,-.36);
  const padGeometry=new T.ExtrudeGeometry(padShape,{depth:.07,bevelEnabled:true,bevelThickness:.008,bevelSize:.012,bevelSegments:2});
  for(const side of [-1,1]){
    const pad=new T.Group();
    pad.add(new T.Mesh(padGeometry,black));
    const plate=new T.Mesh(new T.BoxGeometry(.4,.78,.025),dark);plate.position.z=-.025;pad.add(plate);
    pad.position.set(.98,0,side*.24);root.add(pad);pads.push(pad);
  }
  root.add(rotor,hub,caliper);root.rotation.z=-.13;
  return {root,explode:p=>{
    rotor.position.set(-p*.65,0,p*.45);
    hub.position.set(-p*.8,0,-p*1.1);
    caliper.position.set(p*1.15,p*.12,p*.15);
    pads[0].position.set(.98+p*.25,-p*.42,-.24-p*.68);
    pads[1].position.set(.98-p*.15,p*.48,.24+p*.95);
    pads[0].rotation.y=-p*.2;pads[1].rotation.y=p*.2;
    rotor.rotation.z=p*.45;root.scale.setScalar(1-p*.16);
  }};
}

export function mountProduct(host, type='cup', story=false) {
  let renderer;
  try { renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
  catch { host.classList.add('is-unavailable'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.3:1.7));
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=type==='cup' ? .95 : 1.1;
  host.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new T.Scene();
  scene.environment=studioEnvironment(renderer,type==='cup');
  const camera=new T.PerspectiveCamera(32,1,.1,100);
  camera.position.set(0,type==='cup'?2.65:.5,type==='cup'?4.8:5.5);
  camera.lookAt(0,type==='cup'?-.08:0,0);
  scene.add(new T.AmbientLight(0xffffff,type==='cup'?.25:1));
  const key=new T.DirectionalLight(0xfffaf4,type==='cup'?1.5:3);
  key.position.set(-3,5,4);scene.add(key);
  const rim=new T.DirectionalLight(type==='cup'?0xfff2df:0xb4cced,type==='cup'?.8:1.5);
  rim.position.set(4,2,-2);scene.add(rim);
  const model=type==='cup'?makeCup():type==='suspension'?makeSuspension():makeBrake();
  if(type==='cup')model.root.position.x=-.08;
  scene.add(model.root);
  if(host.hasAttribute('data-drink-product'))model.setVariant(document.querySelector('[data-drink][aria-selected="true"]').dataset.drink);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const section=story?host.closest('[data-product-story]'):host.closest('section');
  const stages=[...section.querySelectorAll('[data-stage]')];
  let active=false,frame=0,dirty=true,last=0,lost=false,firstFrame=true;
  let current=progress(),follow=current,target=current,px=0,py=0,tx=0,ty=0,stage=-1;
  function progress(){
    const b=section.getBoundingClientRect();
    return T.MathUtils.clamp(story?-b.top/Math.max(1,b.height-innerHeight):(innerHeight-b.top)/(b.height+innerHeight),0,1);
  }
  function tick(time){
    frame=0;
    if((!active&&!firstFrame)||document.hidden||lost){last=0;return;}
    if(dirty){target=progress();dirty=false;}
    const dt=last?Math.min(time-last,50):16;last=time;
    // Two time-based filters soften both the start and end of a wheel/touch step.
    const ease=1-Math.exp(-dt/140);
    follow+=(target-follow)*ease;
    current+=(follow-current)*ease;
    if(Math.abs(target-current)<.00008&&Math.abs(target-follow)<.00008)current=follow=target;
    const pointerEase=1-Math.exp(-dt/230);
    px+=(tx-px)*pointerEase;py+=(ty-py)*pointerEase;
    const p=reduced.matches?.2:current;
    const pointer=reduced.matches?0:1;
    if(type==='cup'){
      model.root.rotation.set(.015+(p-.3)*.05+py*.025*pointer,-.22+(p-.3)*(story?.75:.24)+px*.07*pointer,0);
    }else if(type==='suspension'){
      model.root.rotation.y=-.25+p*.7+px*.05*pointer;
    }else{
      model.root.rotation.y=-.55+(p-.3)*(story?1.35:.5)+px*.06*pointer;
      model.root.rotation.x=.07+(p-.3)*.15;
    }
    model.animate?.(p,story);
    model.explode?.(story?T.MathUtils.smoothstep(p,.12,.88):0);
    const nextStage=Math.min(stages.length-1,Math.floor(p*stages.length));
    if(nextStage!==stage){stage=nextStage;stages.forEach((el,i)=>el.classList.toggle('is-active',i===stage));}
    renderer.render(scene,camera);
    firstFrame=false;
    host.classList.add('is-rendered');
    if(active&&!reduced.matches&&(current!==target||Math.abs(tx-px)>.0005||Math.abs(ty-py)>.0005))frame=requestAnimationFrame(tick);
    else last=0;
  }
  function schedule(){dirty=true;if((active||firstFrame)&&!document.hidden&&!lost&&!frame)frame=requestAnimationFrame(tick);}
  const resize=new ResizeObserver(()=>{
    const b=host.getBoundingClientRect();if(!b.width||!b.height)return;
    renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;
    camera.zoom=Math.min(1,camera.aspect*(type==='cup'?1.1:1));
    if(type==='brake'&&story&&innerWidth<600)camera.zoom*=.72;
    if(type==='suspension')camera.zoom=Math.min(1.05,camera.aspect*2.1);
    camera.updateProjectionMatrix();schedule();
  });resize.observe(host);
  const visible=new IntersectionObserver(entries=>{
    active=entries[0].isIntersecting;
    if(active){current=follow=target=progress();schedule();}
    else if(!firstFrame){cancelAnimationFrame(frame);frame=0;last=0;}
  },{rootMargin:'100px'});visible.observe(host);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',schedule);
  host.addEventListener('product-variant',e=>{model.setVariant?.(e.detail);schedule();});
  if(matchMedia('(pointer:fine)').matches){
    host.addEventListener('pointermove',e=>{const b=host.getBoundingClientRect();tx=(e.clientX-b.left)/b.width-.5;ty=(e.clientY-b.top)/b.height-.5;schedule();},{passive:true});
    host.addEventListener('pointerleave',()=>{tx=ty=0;schedule();});
  }
  renderer.domElement.addEventListener('webglcontextlost',e=>{
    e.preventDefault();lost=true;host.classList.remove('is-rendered');cancelAnimationFrame(frame);frame=0;
  });
  renderer.domElement.addEventListener('webglcontextrestored',()=>{lost=false;schedule();});
}
