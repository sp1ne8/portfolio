import * as T from '../shared/vendor/three.module.min.js';

// A single roasted bean, built as a continuous surface with its own curved seam.
// Nothing is fetched after the local Three.js module; there is no photo placeholder.
function noise(x,y,z) {
  const hash=(a,b,c)=>{const n=Math.sin(a*127.1+b*311.7+c*74.7)*43758.5453;return n-Math.floor(n);};
  const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z);
  const smooth=v=>v*v*(3-2*v),u=smooth(x-ix),v=smooth(y-iy),w=smooth(z-iz);
  const mix=T.MathUtils.lerp;
  return mix(mix(mix(hash(ix,iy,iz),hash(ix+1,iy,iz),u),mix(hash(ix,iy+1,iz),hash(ix+1,iy+1,iz),u),v),mix(mix(hash(ix,iy,iz+1),hash(ix+1,iy,iz+1),u),mix(hash(ix,iy+1,iz+1),hash(ix+1,iy+1,iz+1),u),v),w);
}

function bean() {
  const geometry=new T.SphereGeometry(1,144,96);
  const p=geometry.attributes.position,colors=[];
  const roasted=new T.Color('#4d2d1f'),crease=new T.Color('#190d08');
  for(let i=0;i<p.count;i++) {
    const nx=p.getX(i),ny=p.getY(i),nz=p.getZ(i);
    let x=nx*.83*(1+.035*Math.sin(ny*5)),y=ny*1.23,z=nz*.55;
    const seam=.07*Math.sin(y*2.6)+.018*Math.sin(y*9);
    const d=x-seam,front=Math.pow(Math.max(0,nz),.35);
    const width=.062+.016*Math.cos(y*4);
    const groove=Math.exp(-Math.pow(d/width,2))*front;
    const ridge=Math.exp(-Math.pow((Math.abs(d)-.105)/.05,2))*front;
    const grain=noise(nx*23,ny*20,nz*23)-.5;
    const wrinkle=Math.sin(ny*52+noise(nx*7,ny*7,nz*7)*12)*.004;
    const rough=grain*.015+wrinkle;
    x+=nx*rough;y+=ny*rough;z+=nz*rough-groove*.32+ridge*.023;
    p.setXYZ(i,x,y,z);
    const color=roasted.clone().multiplyScalar(.8+noise(nx*6+3,ny*7,nz*6)*.4+grain*.2);
    color.lerp(crease,groove*.92);
    colors.push(color.r,color.g,color.b);
  }
  geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));
  geometry.computeVertexNormals();
  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
  const ctx=canvas.getContext('2d'),pixels=ctx.createImageData(512,512);
  let seed=72;const random=()=>{seed=seed*16807%2147483647;return seed/2147483647;};
  for(let i=0;i<pixels.data.length;i+=4){const value=90+random()*90;pixels.data[i]=pixels.data[i+1]=pixels.data[i+2]=value;pixels.data[i+3]=255;}
  ctx.putImageData(pixels,0,0);
  ctx.strokeStyle='#424242';ctx.lineWidth=.8;
  for(let i=0;i<1500;i++){
    const x=random()*512,y=random()*512,length=2+random()*10;
    ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+length*.4,y-2,x+length,y+random()*3);ctx.stroke();
  }
  const bump=new T.CanvasTexture(canvas);bump.wrapS=bump.wrapT=T.RepeatWrapping;bump.repeat.set(2,2);
  const material=new T.MeshPhysicalMaterial({vertexColors:true,roughness:.6,metalness:0,
    bumpMap:bump,bumpScale:.016,specularIntensity:.35,clearcoat:0});
  return new T.Mesh(geometry,material);
}

function mount(host) {
  let renderer;
  try {renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}
  catch {host.classList.add('is-unavailable');return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.35:1.7));
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.1;
  host.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new T.Scene(),camera=new T.PerspectiveCamera(32,1,.1,20);
  camera.position.set(0,0,5.3);
  scene.add(new T.AmbientLight(0xffe9cc,.7));
  const key=new T.DirectionalLight(0xffead1,3.4);key.position.set(-3,4,5);scene.add(key);
  const rim=new T.DirectionalLight(0xffc795,2.2);rim.position.set(3,1,-2);scene.add(rim);
  const fill=new T.DirectionalLight(0xffeddb,.65);fill.position.set(2,-2,4);scene.add(fill);
  const object=bean();scene.add(object);
  const story=host.hasAttribute('data-story');
  const section=host.closest(story?'[data-product-story]':'section');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active=false,raf=0,last=0,first=true,dirty=true,lost=false;
  const progress=()=>{const b=section.getBoundingClientRect();return T.MathUtils.clamp(story?-b.top/Math.max(1,b.height-innerHeight):(innerHeight-b.top)/(b.height+innerHeight),0,1);};
  let target=progress(),follow=target,current=target,px=0,py=0,tx=0,ty=0;
  function frame(time) {
    raf=0;if((!active&&!first)||document.hidden||lost){last=0;return;}
    if(dirty){target=progress();dirty=false;}
    const dt=last?Math.min(time-last,50):16;last=time;
    const ease=1-Math.exp(-dt/170);
    follow+=(target-follow)*ease;current+=(follow-current)*ease;
    if(Math.abs(current-target)<.00008&&Math.abs(follow-target)<.00008)current=follow=target;
    px+=(tx-px)*(1-Math.exp(-dt/240));py+=(ty-py)*(1-Math.exp(-dt/240));
    const p=reduced.matches?.3:current,pointer=reduced.matches?0:1;
    object.rotation.set(-.12+py*.05*pointer,(story?-.65+p*.95:-.28+p*.18)+px*.1*pointer,-.52+(p-.3)*(story?.22:.1));
    object.position.y=story?Math.sin(p*Math.PI)*.1:0;
    renderer.render(scene,camera);first=false;host.classList.add('is-rendered');
    if(active&&!reduced.matches&&(current!==target||Math.abs(px-tx)>.0005||Math.abs(py-ty)>.0005))raf=requestAnimationFrame(frame);
    else last=0;
  }
  function schedule(){dirty=true;if((active||first)&&!raf&&!document.hidden&&!lost)raf=requestAnimationFrame(frame);}
  new ResizeObserver(()=>{
    const b=host.getBoundingClientRect();if(!b.width||!b.height)return;
    renderer.setSize(b.width,b.height,false);camera.aspect=b.width/b.height;
    camera.zoom=Math.min(1.2,camera.aspect*1.13);camera.updateProjectionMatrix();schedule();
  }).observe(host);
  new IntersectionObserver(entries=>{
    active=entries[0].isIntersecting;
    if(active){current=follow=target=progress();schedule();}
    else if(!first){cancelAnimationFrame(raf);raf=0;last=0;}
  },{rootMargin:'80px'}).observe(host);
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);
  if(matchMedia('(pointer:fine)').matches){
    host.addEventListener('pointermove',e=>{const b=host.getBoundingClientRect();tx=(e.clientX-b.left)/b.width-.5;ty=(e.clientY-b.top)/b.height-.5;schedule();},{passive:true});
    host.addEventListener('pointerleave',()=>{tx=ty=0;schedule();});
  }
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(raf);raf=0;host.classList.remove('is-rendered');});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{lost=false;first=true;schedule();});
}

export function mountBeans() {
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries)if(entry.isIntersecting){observer.unobserve(entry.target);mount(entry.target);}
  },{rootMargin:'300px'});
  document.querySelectorAll('[data-bean]').forEach(host=>observer.observe(host));
}
