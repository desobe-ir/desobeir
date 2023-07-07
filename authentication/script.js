import * as THREE from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import TWEEN from 'three/examples/jsm/libs/tween.module.js';
import WebGL from 'three/examples/jsm//capabilities/WebGL.js';

let scene,
  cssScene,
  camera,
  cssRenderer,
  renderer,
  alight,
  dlight,
  canvas,
  controls,
  width,
  height,
  unDivObj,
  pDivObj,
  rPDivObj,
  emailObj,
  statusObj,
  commonArray,
  loginArray,
  signupArray,
  forgotArray,
  state,
  usernameTween,
  loginButtonTween,
  unDivObjTween,
  forgotButtonTween,
  unVal,
  passVal,
  rPassVal,
  emailVal,
  notifTimeOut;

const border = new THREE.Group();
const logo = new THREE.Group();
const desobeirTitle = new THREE.Group();
const loginTitle = new THREE.Group();
const signupTitle = new THREE.Group();
const username = new THREE.Group();
const email = new THREE.Group();
const password = new THREE.Group();
const rPassword = new THREE.Group();
const loginQuestion = new THREE.Group();
const signupQuestion = new THREE.Group();
const signupButton = new THREE.Group();
const loginButton = new THREE.Group();
const forgotButton = new THREE.Group();
const forgotTitle = new THREE.Group();
const loginLink = new THREE.Group();
const signupLink = new THREE.Group();
const forgot = new THREE.Group();
const checkmark = new THREE.Group();
const x = new THREE.Group();
const buttonHelperPlaneGeo = new THREE.PlaneGeometry(45, 20);
const button2HelperPlaneGeo = new THREE.PlaneGeometry(45, 20);
const button3HelperPlaneGeo = new THREE.PlaneGeometry(45, 20);
const linkHelperPlaneGeo = new THREE.PlaneGeometry(16, 7);
const forgotHelperPlaneGeo = new THREE.PlaneGeometry(45, 7);
const helperPlaneMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }); // color: 0x00ff00
const buttonHelperPlane = new THREE.Mesh(buttonHelperPlaneGeo, helperPlaneMaterial);
const button2HelperPlane = new THREE.Mesh(button2HelperPlaneGeo, helperPlaneMaterial.clone());
const button3HelperPlane = new THREE.Mesh(button3HelperPlaneGeo, helperPlaneMaterial.clone());
const linkHelperPlane = new THREE.Mesh(linkHelperPlaneGeo, helperPlaneMaterial.clone());
const forgotHelperPlane = new THREE.Mesh(forgotHelperPlaneGeo, helperPlaneMaterial.clone());

const defColor = new THREE.Color(0xffffff);
const highlighted = new THREE.Color(0xffff00);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const lights = [];
const groups = [];
const angleStep = (2 * Math.PI) / 30;
const lightCenter = new THREE.Vector3(40, 60, 0);
let status = 'loading';


const init = () => {

  canvas = document.getElementById("canvas");
  scene = new THREE.Scene();
  cssScene = new THREE.Scene();
  scene.background = new THREE.Color(0x1e1e1e);

  width = window.innerWidth;
  height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(
    35,
    width / height,
    1,
    600
  );
  camera.position.set(70, 60, 120);
  // camera.lookAt(40, 150, 0);
  scene.add(camera);

  const positions = [
    { x: 40, y: 60, z: 120 }, 
    { x: -5, y: 60, z: 50 },
    { x: -5, y: -40, z: 50 },
    { x: 0, y: 0, z: 250 },
  ];
  
  const tween1 = new TWEEN.Tween(camera.position)
    .to(positions[0], 2000) 
    .onUpdate(() => {
      camera.lookAt(new THREE.Vector3(-5, 60, 0)); 
    });
  
  const tween2 = new TWEEN.Tween(camera.position)
    .to(positions[1], 3000) 
    .onUpdate(() => {
      camera.lookAt(new THREE.Vector3(-5, 60, 0)); 
    });
  
  const tween3 = new TWEEN.Tween(camera.position)
    .to(positions[2], 5000) 
    .onUpdate(() => {
      camera.lookAt(-5, camera.position.y+20, 0); 
    });
  
  const tween4 = new TWEEN.Tween(camera.position)
    .to(positions[3], 3000) 
    .onUpdate(() => {
      camera.lookAt(new THREE.Vector3(0, 0, 0)); 
    });
  
  tween1.chain(tween2);
  tween2.chain(tween3);
  tween3.chain(tween4);
  
  // Start the first tween
  tween1.start();
  setTimeout(() => {
    controls.enabled = true;
  }, 13000);

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  cssRenderer = new CSS3DRenderer();
  cssRenderer.setSize(width, height);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = 0;
  document.body.appendChild(cssRenderer.domElement);

  controls = new OrbitControls(camera, cssRenderer.domElement);
  controls.target.set(0, 0, 0);
  controls.maxDistance = 450;
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI * 0.8;
  controls.minAzimuthAngle = -Math.PI / 4;
  controls.maxAzimuthAngle = Math.PI / 4;
  controls.enabled = false;

  dlight = new THREE.DirectionalLight(0xffffff, 10);
  dlight.position.set(0, 10, 5)
  scene.add(dlight);

  alight = new THREE.AmbientLight(0xffffff, 100);
  scene.add(alight);

  loadFiles();

  document.addEventListener('pointermove', pointermoveCallback);
  document.addEventListener('click', clickCallback);

  setHtmlElements();


  //TWEENs
  usernameTween = new TWEEN.Tween(username.position)
    .to(email.position, 1000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(() => {
      username.position.copy(username.position);
    });
  loginButtonTween = new TWEEN.Tween(loginButton.position)
    .to({ y: -10 }, 1000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(() => {
      loginButton.position.copy(loginButton.position);
    });
  unDivObjTween = new TWEEN.Tween(unDivObj.position)
    .to(emailObj.position, 1000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(() => {
      unDivObj.position.copy(unDivObj.position);
    });
  forgotButtonTween = new TWEEN.Tween(forgotButton.position)
    .to({ y: 0 }, 1000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onUpdate(() => {
      forgotButton.position.copy(forgotButton.position);
    });


  buttonHelperPlane.position.set(22, 10, 0);
  button2HelperPlane.position.set(22, 10, 0);
  button3HelperPlane.position.set(22, 10, 0);
  signupButton.add(buttonHelperPlane);
  loginButton.add(button2HelperPlane);
  forgotButton.add(button3HelperPlane);
  linkHelperPlane.position.set(20, -52, 0);
  scene.add(linkHelperPlane);

  forgotHelperPlane.position.set(22, 3, 0);
  forgot.add(forgotHelperPlane);

  commonArray = [username, unDivObj, password, rPassword, pDivObj, rPDivObj, forgot];
  loginArray = [loginTitle, loginQuestion, loginButton, signupLink];
  signupArray = [signupTitle, signupQuestion, signupButton, loginLink, rPDivObj, email, emailObj];
  forgotArray = [forgotTitle, email, emailObj, forgotButton, loginLink];

  setState(0);
  createLights();
  checkmark.visible = false;
  x.visible = false;

  showNotif('Loading, it is', 'lights', 4);

  const clock = new THREE.Clock();

  const animate = () => {

    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    const rotationSpeed = 0.5;
    if (status == 'loading') {
      for (let i = 0; i < 30; i++) {
        const light = lights[i];
        const angle = i * angleStep - time * rotationSpeed;
        const x = lightCenter.x + 5 * Math.cos(angle);
        const y = lightCenter.y + 5 * Math.sin(angle);
        light.position.set(x, y, 0);
      }
    }
    renderer.render(scene, camera);
    cssRenderer.render(cssScene, camera);
    TWEEN.update();
  };
  animate();
};

const posArray = {
  'border': new THREE.Vector2(-51, 70),
  'logo': new THREE.Vector2(-5, 65),
  'desobeirTitle': new THREE.Vector2(-5, 50),
  'forgot': new THREE.Vector2(-10, -55),
  'forgotButton': new THREE.Vector2(5, -30),
  'forgotTitle': new THREE.Vector2(-32, 45),
  'username': new THREE.Vector2(-28, 35),
  'email': new THREE.Vector2(-28, 20),
  'password': new THREE.Vector2(-28, 5),
  'rPassword': new THREE.Vector2(-28, -10),
  'signupTitle': new THREE.Vector2(-14, 45),
  'signupButton': new THREE.Vector2(5, -30),
  'signupQuestion': new THREE.Vector2(-27.5, -50),
  'loginLink': new THREE.Vector2(12, -48.5),
  'loginTitle': new THREE.Vector2(-10, 45),
  'loginButton': new THREE.Vector2(5, -30),
  'loginQuestion': new THREE.Vector2(-27.5, -50),
  'signupLink': new THREE.Vector2(12, -48.5),
  'x': new THREE.Vector2(38, 63),
  'checkmark': new THREE.Vector2(38, 63)
}

const loadFiles = () => {
  loadSVG('/svg/border.svg', border, 'border');
  loadSVG('/svg/logo.svg', logo, 'logo');
  loadSVG('/svg/desobeirTitle.svg', desobeirTitle, 'desobeirTitle');
  loadSVG('/svg/forgot.svg', forgot, 'forgot');
  loadSVG('/svg/forgotButton.svg', forgotButton, 'forgotButton');
  loadSVG('/svg/forgotTitle.svg', forgotTitle, 'forgotTitle');
  loadSVG('/svg/username.svg', username, 'username');
  loadSVG('/svg/email.svg', email, 'email');
  loadSVG('/svg/password.svg', password, 'password');
  loadSVG('/svg/rPassword.svg', rPassword, 'rPassword');
  loadSVG('/svg/signupTitle.svg', signupTitle, 'signupTitle');
  loadSVG('/svg/signupButton.svg', signupButton, 'signupButton');
  loadSVG('/svg/signupQuestion.svg', signupQuestion, 'signupQuestion');
  loadSVG('/svg/loginLink.svg', loginLink, 'loginLink');
  loadSVG('/svg/loginTitle.svg', loginTitle, 'loginTitle');
  loadSVG('/svg/loginButton.svg', loginButton, 'loginButton');
  loadSVG('/svg/loginQuestion.svg', loginQuestion, 'loginQuestion');
  loadSVG('/svg/signupLink.svg', signupLink, 'signupLink');
  loadSVG('/svg/x.svg', x, 'x');
  loadSVG('/svg/checkmark.svg', checkmark, 'checkmark');
};

const loadSVG = (url, group, name) => {
  const loader = new SVGLoader();
  loader.load(url, function (data) {
    let renderOrder = 0;
    for (const path of data.paths) {
      const fillColor = path.userData.style.fill || new THREE.Color(0xffffff);

      const shapes = SVGLoader.createShapes(path);
      for (const shape of shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 2,
          bevelEnabled: false
        });
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setStyle(fillColor),
          transparent: true,
          side: THREE.FrontSide,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.renderOrder = renderOrder++;
        group.add(mesh);
      }
    }
    group.name = name;
    group.scale.multiplyScalar(0.5);
    setPose(group);

    group.scale.y *= - 1;
    groups.push(group);
    scene.add(group);
  });
}

const setPose = (group) => {
  group.position.x = posArray[group.name].x;
  group.position.y = posArray[group.name].y;
};

const setState = (s) => {
  state = s;
  groups.forEach(group => {
    setPose(group);
  });
  if (state == 0) {
    username.position.x = -28;
    username.position.y = 35;
    unDivObj.position.set(0, 27, 0);
    commonArray.forEach((l) => {
      l.visible = true;
    });
    loginArray.forEach((l) => {
      l.visible = false;
    });
    forgotArray.forEach((l) => {
      l.visible = false;
    });
    signupArray.forEach((l) => {
      l.visible = true;
    });
    rPassword.visible = true;

  } else if (state == 1) {

    usernameTween.start();
    unDivObjTween.start();
    loginButtonTween.start();
    commonArray.forEach((l) => {
      l.visible = true;
    });
    loginArray.forEach((l) => {
      l.visible = true;
    });
    signupArray.forEach((l) => {
      l.visible = false;
    });
    forgotArray.forEach((l) => {
      l.visible = false;
    });
    rPassword.visible = false;

  } else if (state == 2) {
    forgotButtonTween.start();

    commonArray.forEach((l) => {
      l.visible = false;
    });
    loginArray.forEach((l) => {
      l.visible = false;
    });
    signupArray.forEach((l) => {
      l.visible = false;
    });
    forgotArray.forEach((l) => {
      l.visible = true;
    });
    loginLink.visible = true;
    signupQuestion.visible = true;
  }
};

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width / height;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.updateProjectionMatrix();
});

const pointermoveCallback = (event) => {
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = - (event.clientY / height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const signupButtonIntersects = raycaster.intersectObject(signupButton);
  if (signupButtonIntersects.length > 0) {
    signupButton.children.forEach(c => {
      c.material.color = highlighted;
    });
  } else {
    signupButton.children.forEach(c => {
      c.material.color = defColor;
    });
  }
  const loginButtonIntersects = raycaster.intersectObject(loginButton);
  if (loginButtonIntersects.length > 0) {
    loginButton.children.forEach(c => {
      c.material.color = highlighted;
    });
  } else {
    loginButton.children.forEach(c => {
      c.material.color = defColor;
    });
  }
  const forgotIntersects = raycaster.intersectObject(forgot);
  if (forgotIntersects.length > 0) {
    forgot.children.forEach(c => {
      c.material.color = highlighted;
    });
  } else {
    forgot.children.forEach(c => {
      c.material.color = defColor;
    });
  }
};

const clickCallback = (event) => {
  raycaster.setFromCamera(mouse, camera);
  const linkHelperPlaneIntersects = raycaster.intersectObject(linkHelperPlane);
  if (linkHelperPlaneIntersects.length > 0) {
    const s = state == 1 ? 0 : 1;
    setState(s);
    return;
  }
  const signupLinkIntersects = raycaster.intersectObject(signupLink);
  if (signupLinkIntersects.length > 0) {
    setState(0);
    return;
  }
  const loginLinkIntersects = raycaster.intersectObject(loginLink);
  if (loginLinkIntersects.length > 0) {
    setState(1);
    return;
  }
  const forgotIntersects = raycaster.intersectObject(forgot);
  if (forgotIntersects.length > 0) {
    setState(2);
    return;
  }
  const loginButtonIntersects = raycaster.intersectObject(loginButton);
  if (loginButtonIntersects.length > 0 && state == 1) {
    unVal = unDivObj.element.value;
    passVal = pDivObj.element.value;
    if (unVal.length == 0 || passVal == 0) {
      showNotif('<br>Both <br>Username and <br>Password,<br>You Must <br>Provide', 'bad', 10);
    } else {
      showNotif('<br>Successfully<br>Signed In,<br>You Have', 'checkmark', 10);
      confetti();
    }
    return;
  }
  const signupButtonIntersects = raycaster.intersectObject(signupButton);
  if (signupButtonIntersects.length > 0 && state == 0) {
    console.log('signup')
    unVal = unDivObj.element.value;
    passVal = pDivObj.element.value;
    rPassVal = rPDivObj.element.value;
    emailVal = pDivObj.element.value;
    if (unVal.length == 0 || passVal.length == 0 || rPassVal.length == 0 || emailVal.length == 0) {
      showNotif('<br>All the Fields,<br>You Must<br>Fill', 'bad', 10)
    } else {
      if (passVal == rPassVal) {
        showNotif('<br>Successfully<br>Signed Up,<br>You Have', 'checkmark', 10);
        setState(1);
      } else {
        showNotif('<br>Mismatch,<br>Your Passwords', 'bad', 10);
      }
    }

    return;
  }

}

const createLights = () => {
  const radius = 5;
  const lightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });


  for (let i = 0; i < 30; i++) {
    const sphere = new THREE.SphereGeometry(.5, 16, 16);
    const angle = i * angleStep;
    const x = lightCenter.x + radius * Math.cos(angle);
    const y = lightCenter.y + radius * Math.sin(angle);
    const light = new THREE.Mesh(sphere, lightMaterial)
    light.position.set(x, y, 0);
    lights.push(light);
    scene.add(light);
  }
};

const setHtmlElements = () => {
  const unDiv = document.createElement('input');
  unDiv.className = 'unDiv';
  unDiv.setAttribute("type", "text");
  unDiv.setAttribute("name", "username");
  unDiv.setAttribute("placeholder", "Username, You Must Enter");
  unDivObj = new CSS3DObject(unDiv);

  unDivObj.position.set(0, 27, 0);
  unDivObj.scale.set(0.3, 0.3, 0.3);

  cssScene.add(unDivObj);

  const emailDiv = document.createElement('input');
  emailDiv.className = 'unDiv';
  emailDiv.setAttribute("type", "email");
  emailDiv.setAttribute("name", "Email");
  emailDiv.setAttribute("placeholder", "Regostration Email, You Must Provide");
  emailObj = new CSS3DObject(emailDiv);

  emailObj.position.set(0, 12, 0);
  emailObj.scale.set(0.3, 0.3, 0.3);

  cssScene.add(emailObj);

  const pDiv = document.createElement('input');
  pDiv.className = 'unDiv';
  pDiv.setAttribute("type", "password");
  pDiv.setAttribute("name", "password");
  pDiv.setAttribute("placeholder", "Password, You must Enter");
  pDivObj = new CSS3DObject(pDiv);

  pDivObj.position.set(0, -3, 0);
  pDivObj.scale.set(0.3, 0.3, 0.3);

  cssScene.add(pDivObj);

  const rPDiv = document.createElement('input');
  rPDiv.className = 'unDiv';
  rPDiv.setAttribute("type", "password");
  rPDiv.setAttribute("name", "username");
  rPDiv.setAttribute("placeholder", "Password, You must Repeat");
  rPDivObj = new CSS3DObject(rPDiv);

  rPDivObj.position.set(0, -18, 0);
  rPDivObj.scale.set(0.3, 0.3, 0.3);

  cssScene.add(rPDivObj);

  const statusDiv = document.createElement('div');
  statusDiv.className = 'status';
  statusObj = new CSS3DObject(statusDiv);

  statusObj.position.set(40, 50, 0);
  statusObj.scale.set(0.3, 0.3, 0.3);

  cssScene.add(statusObj);

};

const showNotif = (text, type, time) => {
  clearTimeout(notifTimeOut);
  statusObj.visible = true;
  statusObj.element.innerHTML = text;
  if (type == 'bad') {
    x.visible = true;
  } else if (type == 'lights') {
    lights.forEach(light => {
      showStuff(light);
    });
  } else if (type == 'checkmark') {
    checkmark.visible = true;
  }
  notifTimeOut = setTimeout(() => {
    hideStuff(statusObj);
    lights.forEach(light => {
      hideStuff(light);
    });
    x.visible = false;
    checkmark.visible = false;
  }, time * 1000);

}

const confetti = () => {
  // Create the particle system
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Add particles to the system
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * 300 - 100;
    const y = Math.random() * 300 - 100;
    const z = Math.random() * 150;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  // Create the particle system object and add to the scene
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true,
  });
  const particleSystem = new THREE.Points(geometry, material);
  particleSystem.position.set(-50, 0, 0);
  scene.add(particleSystem);

  // Render loop
  function animate() {
    requestAnimationFrame(animate);

    // Move particles down
    particleSystem.position.y -= 0.5;

    // Reset particles that fall off the screen
    if (particleSystem.position.y < -150) {
      scene.remove(particleSystem);

    }

    renderer.render(scene, camera);
  }
  animate();
};

const hideStuff = (stuff) => {
  stuff.visible = false;
}
const showStuff = (stuff) => {
  stuff.visible = true;
}

if (WebGL.isWebGL2Available() === false) {

  document.body.appendChild(WebGL.getWebGL2ErrorMessage());

} else {
  init();
}
