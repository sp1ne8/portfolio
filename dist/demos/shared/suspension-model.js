import * as T from './vendor/three.module.min.js';

export function makeSuspension() {
  const root=new T.Group();
  const steel=new T.MeshStandardMaterial({color:0xc7ccd2,metalness:.9,roughness:.21});
  const graphite=new T.MeshStandardMaterial({color:0x292d32,metalness:.65,roughness:.3});
  const rubber=new T.MeshStandardMaterial({color:0x15171b,roughness:.7});
  const springMaterial=new T.MeshStandardMaterial({color:0x22262c,metalness:.75,roughness:.23});
  function cylinder(radius,height,y,material,parent=root){
    const m=new T.Mesh(new T.CylinderGeometry(radius,radius,height,48),material);
    m.position.y=y;parent.add(m);return m;
  }
  cylinder(.17,1.15,-.57,graphite);
  const piston=cylinder(.12,1.5,.38,steel);
  cylinder(.43,.10,-.49,graphite);
  cylinder(.27,.10,-1.08,steel);
  const lower=new T.Mesh(new T.TorusGeometry(.18,.065,12,40),graphite);
  lower.position.y=-1.32;root.add(lower);
  const upper=new T.Group();root.add(upper);
  cylinder(.43,.10,1.05,graphite,upper);
  cylinder(.30,.12,1.16,rubber,upper);
  cylinder(.35,.08,1.26,steel,upper);
  cylinder(.11,.13,1.34,graphite,upper);
  for(let i=0;i<3;i++){
    const a=i*Math.PI*2/3;
    const bolt=cylinder(.035,.20,1.35,steel,upper);bolt.position.x=Math.cos(a)*.27;bolt.position.z=Math.sin(a)*.27;
  }
  class Helix extends T.Curve {
    getPoint(t,target=new T.Vector3()) {
      const angle=t*Math.PI*2*6;
      return target.set(Math.cos(angle)*.34,t*1.5,Math.sin(angle)*.34);
    }
  }
  const coil=new T.Mesh(new T.TubeGeometry(new Helix(),240,.046,10,false),springMaterial);
  coil.position.y=-.43;root.add(coil);
  const boot=new T.Group();root.add(boot);
  for(let i=0;i<9;i++){
    const ring=new T.Mesh(new T.TorusGeometry(.16,.028,8,32),rubber);
    ring.rotation.x=Math.PI/2;ring.position.y=.45+i*.065;boot.add(ring);
  }
  root.rotation.z=-.17;
  return {root,animate(p){
    const compression=(.5-.5*Math.cos(p*Math.PI*2))*.32;
    coil.scale.y=1-compression;upper.position.y=-compression*1.5;
    piston.position.y=.38-compression*1.5;
    boot.position.y=-compression*.8;
  }};
}
