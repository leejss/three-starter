import * as THREE from "three";
import "./style.css";

const app = document.getElementById("app");
let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGL1Renderer,
  box: THREE.Mesh,
  box2: THREE.Mesh,
  box3: THREE.Mesh;

init();

function init() {
  // Create scene, camera, light and renderer
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x211111);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1, // near
    1000 // far
  );
  camera.position.z = 2;
  renderer = new THREE.WebGL1Renderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  app?.appendChild(renderer.domElement);
  // Create geometry and material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color("skyblue"),
  });

  // Create mesh
  box = new THREE.Mesh(geometry, material);
  scene.add(box);
  box2 = new THREE.Mesh(geometry, material);
  box.position.x = -1.5;
  scene.add(box2);
  box3 = new THREE.Mesh(geometry, material);
  box3.position.x = 1.5;
  scene.add(box3);
  const light = new THREE.DirectionalLight();
  light.position.set(0, 1, 2);
  scene.add(light);

  window.addEventListener("resize", onResize);

  // Animate
  update();
}

function update() {
  requestAnimationFrame(update);
  box.rotation.y += 0.01;
  box2.rotation.x -= 0.01;
  box3.rotation.z -= 0.01;

  // Render it
  renderer.render(scene, camera);
}
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
