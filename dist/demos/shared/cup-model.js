import * as T from './vendor/three.module.min.js';

function porcelainProfile(points, material) {
  const curve = new T.SplineCurve(points.map(([r,y]) => new T.Vector2(r,y)));
  return new T.Mesh(new T.LatheGeometry(curve.getPoints(120), 96), material);
}

export function makeCup() {
  const root = new T.Group(), cup = new T.Group();
  const porcelain = new T.MeshPhysicalMaterial({color:0xe5e3dd, roughness:.2,
    clearcoat:.5, clearcoatRoughness:.18, envMapIntensity:.5});
  cup.add(porcelainProfile([
    [.02,-.48],[.39,-.48],[.47,-.44],[.59,-.32],[.73,-.10],
    [.82,.15],[.86,.38],[.86,.43],[.84,.45],[.81,.43],
    [.80,.35],[.77,.14],[.69,-.07],[.56,-.29],[.43,-.37],[.02,-.37]
  ], porcelain));
  // A compact oval loop, attached to the bowl at two tangent points.
  const handle = new T.CatmullRomCurve3([
    [.81,.30,0],[1.10,.34,0],[1.26,.18,0],[1.25,-.06,0],
    [1.06,-.24,0],[.68,-.20,0]
  ].map(p => new T.Vector3(...p)));
  cup.add(new T.Mesh(new T.TubeGeometry(handle,72,.075,16,false),porcelain));
  const foot = new T.Mesh(new T.TorusGeometry(.38,.035,12,80),porcelain);
  foot.rotation.x=Math.PI/2;foot.position.y=-.48;cup.add(foot);
  const saucer=porcelainProfile([
    [.01,-.57],[.48,-.57],[.65,-.55],[1.08,-.47],[1.29,-.44],
    [1.35,-.46],[1.34,-.49],[1.15,-.54],[.69,-.63],[.35,-.64],[.01,-.64]
  ],porcelain);
  root.add(cup,saucer);

  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=shadowCanvas.height=128;
  const shadowCtx=shadowCanvas.getContext('2d');
  const shadowGradient=shadowCtx.createRadialGradient(64,64,15,64,64,64);
  shadowGradient.addColorStop(0,'rgba(32,25,20,.3)');shadowGradient.addColorStop(.5,'rgba(32,25,20,.13)');shadowGradient.addColorStop(1,'rgba(32,25,20,0)');
  shadowCtx.fillStyle=shadowGradient;shadowCtx.fillRect(0,0,128,128);
  const shadow=new T.Mesh(new T.PlaneGeometry(1.5,1.5),new T.MeshBasicMaterial({map:new T.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.y=-.54;root.add(shadow);

  const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=128;
  const labelCtx=labelCanvas.getContext('2d');labelCtx.fillStyle='#42443d';labelCtx.font='400 68px Arial';labelCtx.textAlign='center';labelCtx.fillText('STILL',256,89);
  const labelTexture=new T.CanvasTexture(labelCanvas);labelTexture.colorSpace=T.SRGBColorSpace;
  const label=new T.Mesh(new T.CylinderGeometry(.804,.754,.13,40,1,true,-.34,.68),new T.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false}));
  label.position.y=-.025;cup.add(label);

  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
  const ctx=canvas.getContext('2d');
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const liquid=new T.Mesh(new T.CircleGeometry(.802,96),new T.MeshPhysicalMaterial({
    map:texture,roughness:.3,clearcoat:.35,envMapIntensity:.12,color:0xc5b39b
  }));
  liquid.rotation.x=-Math.PI/2;liquid.position.y=.355;cup.add(liquid);

  function setVariant(variant) {
    const gradient=ctx.createRadialGradient(220,240,20,256,256,260);
    const colors=variant==='filter'?['#392319','#24150d','#56351c']:
      variant==='flat'?['#ba8851','#98602f','#c79559']:['#88501e','#4d250e','#b17b38'];
    gradient.addColorStop(0,colors[0]);gradient.addColorStop(.82,colors[1]);gradient.addColorStop(1,colors[2]);
    ctx.fillStyle=gradient;ctx.fillRect(0,0,512,512);
    let seed=132;const random=()=>{seed=seed*16807%2147483647;return seed/2147483647;};
    if(variant==='espresso')for(let i=0;i<1900;i++){
      ctx.fillStyle=i%2?'#e2b57418':'#35190b12';ctx.beginPath();ctx.arc(random()*512,random()*512,random()*2+.4,0,Math.PI*2);ctx.fill();
    }
    if(variant!=='filter')for(let i=0;i<700;i++){
      const a=random()*Math.PI*2,r=225+random()*25,x=256+Math.cos(a)*r,y=256+Math.sin(a)*r;
      ctx.fillStyle='#3d211766';ctx.beginPath();ctx.arc(x,y,.5+random()*1.7,0,Math.PI*2);ctx.fill();
    }
    if(variant==='flat'){
      ctx.save();ctx.translate(256,270);ctx.rotate(-.15);
      for(let i=0;i<4;i++){
        const scale=1-i*.16;ctx.save();ctx.scale(scale,scale);
        ctx.fillStyle=i%2?'#b47d44':'#f4e5cb';ctx.beginPath();ctx.moveTo(0,105);
        ctx.bezierCurveTo(-25,70,-140,-5,-96,-66);
        ctx.bezierCurveTo(-60,-113,-13,-85,0,-48);
        ctx.bezierCurveTo(20,-95,75,-105,102,-60);
        ctx.bezierCurveTo(140,2,25,80,0,105);ctx.fill();ctx.restore();
      }
      ctx.restore();
    }
    texture.needsUpdate=true;
  }
  setVariant('espresso');
  return {root,setVariant,animate(p,story){
    cup.position.y=story?Math.sin(p*Math.PI)*.08:0;
    saucer.rotation.y=story?-p*.2:0;
  }};
}
