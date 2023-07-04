import * as THREE from "three";
import vshaderString from "./shaders/string/vertex.glsl?raw";
import fshaderString from "./shaders/string/fragment.glsl?raw";
import vshaderString2 from "./shaders/string/vertex2.glsl?raw";
import fshaderString2 from "./shaders/string/fragment2.glsl?raw";
import vshaderString3 from "./shaders/string/vertex3.glsl?raw";
import fshaderString3 from "./shaders/string/fragment3.glsl?raw";
import vshaderString4 from "./shaders/string/vertex4.glsl?raw";
import fshaderString4 from "./shaders/string/fragment4.glsl?raw";
import vshaderProton from "./shaders/proton/vertex.glsl?raw";
import fshaderProton from "./shaders/proton/fragment.glsl?raw";
import vshaderQuark from "./shaders/quark/vertex.glsl?raw";
import fshaderQuark from "./shaders/quark/fragment.glsl?raw";
import vshaderMolecule from "./shaders/molecule/vertex.glsl?raw";
import fshaderMolecule from "./shaders/molecule/fragment.glsl?raw";
import vshaderCloud from "./shaders/cloud/vertex.glsl?raw";
import fshaderCloud from "./shaders/cloud/fragment.glsl?raw";
import vshaderLightning from "./shaders/lightning/vertex.glsl?raw";
import fshaderLightning from "./shaders/lightning/fragment.glsl?raw";
import vshaderLanding1 from "./shaders/landingshaders/vertex1.glsl?raw";
import fshaderLanding1 from "./shaders/landingshaders/fragment1.glsl?raw";
import vshaderLanding3 from "./shaders/landingshaders/vertex3.glsl?raw";
import fshaderLanding3 from "./shaders/landingshaders/fragment3.glsl?raw";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import WebGL from 'three/examples/jsm//capabilities/WebGL.js';

let scene,
  camera,
  renderer,
  alight,
  animeIDs,
  canvas,
  textureLoader,
  protonTexture,
  fontLoader,
  clock,
  width,
  height,
  labelRenderer;

const init = () => {
  animeIDs = new Object();
  canvas = document.getElementById("canvas");
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00030c);

  width = window.innerWidth;
  height = window.innerHeight;

  camera = new THREE.PerspectiveCamera(
    35,
    width / height,
    0.001,
    5000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = -1;
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  document.body.appendChild(labelRenderer.domElement);

  textureLoader = new THREE.TextureLoader();
  protonTexture = textureLoader.load("/textures/blue-clouds.jpg");
  fontLoader = new FontLoader();

  alight = new THREE.AmbientLight(0xffffff, 1000);
  scene.add(alight);

  clock = new THREE.Clock();

  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    labelRenderer.setSize(width, height);
  });
  window.addEventListener("dblclick", () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  });
  landing();
};

const landing = () => {
  camera.position.set(0, 0, 499);
  window.scrollTo(0, 0);

  fontLoader.load('./fonts/p1.typeface.json', function (font) {

    const scrollText = 'Scroll To Navigate';
    const text0 = 'Drift Into The Abstract';
    const text = 'Désobéir';
    const text2 = '( French Verb, Meaning, To Disobey )';
    const text3 = 'Disobey the rule of a 2D web';
    const text4 = "It's too much of a cruel rule!";
    const text5 = 'Worlds Within Worlds';
    const text6 = 'Version a.0.0.1';
    const text7 = 'A WebGL Experience by desobe.ir';

    const ringGeo = new THREE.RingGeometry(5, 5.5, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ring = new THREE.Mesh(ringGeo, ringMaterial);
    ringGeo.scale(1, 2, 1);

    const circleGeometry = new THREE.CircleGeometry(2.7);
    const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);

    let worldsSphereRadius = width >= height ? 250 : 125;
    const worldsSphereGeo = new THREE.SphereGeometry(worldsSphereRadius, 32, 32);
    const worldsSphereMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: vshaderLanding1,
      fragmentShader: fshaderLanding1,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
      }
    });
    const worldsSphere = new THREE.Mesh(worldsSphereGeo, worldsSphereMaterial);
    worldsSphere.rotation.z = Math.PI / 2;
    worldsSphere.rotation.y = Math.PI / 2;
    worldsSphere.position.set(0, 0, -750);
    scene.add(worldsSphere);


    const textOptions = {
      font: font,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5
    };


    // 1
    textOptions.size = width >= height ? 30 : 15;
    textOptions.height = width >= height ? 8 : 5;
    const textGeometry = new TextGeometry(text, textOptions);
    textGeometry.center();
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x151600 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(textMesh);

    //0
    textOptions.size = width >= height ? 8 : 5;
    textOptions.height = width >= height ? .2 : .1;
    const text0Geometry = new TextGeometry(text0, textOptions);
    text0Geometry.center();
    const text0Material = textMaterial.clone();
    text0Material.color = new THREE.Color(0xffffff);
    const text0Mesh = new THREE.Mesh(text0Geometry, text0Material);
    text0Mesh.position.set(0, 25, 0);
    scene.add(text0Mesh);
    //2
    textOptions.size = width >= height ? 5 : 3;
    textOptions.height = width >= height ? .2 : .1;
    const text2Geometry = new TextGeometry(text2, textOptions);
    text2Geometry.center();
    const text2Material = textMaterial.clone();
    text2Material.color = new THREE.Color(0xffffff);
    const text2Mesh = new THREE.Mesh(text2Geometry, text2Material);
    text2Mesh.position.set(0, -25, 0);
    scene.add(text2Mesh);

    // textRule
    textOptions.size = width >= height ? 5 : 3;
    textOptions.height = width >= height ? 1 : .3;
    const textRuleGeometry = new TextGeometry(text3, textOptions);
    textRuleGeometry.center();
    const textRuleMaterial = textMaterial.clone();
    textRuleMaterial.color = new THREE.Color(0xffffff);
    const textRuleMesh = new THREE.Mesh(textRuleGeometry, textRuleMaterial);
    textRuleMesh.position.set(0, 0, -300);
    scene.add(textRuleMesh);
    textRuleMesh.visible = false;

    // textCruel
    const textCruelGeometry = new TextGeometry(text4, textOptions);
    textCruelGeometry.center();
    const textCruelMaterial = textMaterial.clone();
    textCruelMaterial.color = new THREE.Color(0xffffff);
    const textCruelMesh = new THREE.Mesh(textCruelGeometry, textCruelMaterial);
    textCruelMesh.position.set(0, -30, -450);
    scene.add(textCruelMesh);
    textCruelMesh.visible = false;

    // textVersion
    textOptions.size = width >= height ? 3 : 2;
    textOptions.height = width >= height ? 1 : .2;
    const textVersionGeometry = new TextGeometry(text6, textOptions);
    textVersionGeometry.center();
    const textVersionMaterial = textMaterial.clone();
    textVersionMaterial.color = new THREE.Color(0xffffff);
    const textVersionMesh = new THREE.Mesh(textVersionGeometry, textVersionMaterial);
    textVersionMesh.position.set(40, 30, -800);
    scene.add(textVersionMesh);
    textVersionMesh.visible = false;

    // textCredit
    textOptions.size = width >= height ? 6 : 3;
    textOptions.height = width >= height ? 1 : .3;
    const textCreditGeometry = new TextGeometry(text7, textOptions);
    textCreditGeometry.center();
    const textCreditMaterial = textMaterial.clone();
    textCreditMaterial.color = new THREE.Color(0xffffff);
    const textCreditMesh = new THREE.Mesh(textCreditGeometry, textCreditMaterial);
    textCreditMesh.position.set(0, 10, -800);
    scene.add(textCreditMesh);
    textCreditMesh.visible = false;

    // play
    const play = new THREE.Group();
    textOptions.size = width >= height ? 5 : 2;
    textOptions.height = width >= height ? 1 : .2;
    const textPlayGeometry = new TextGeometry('Play', textOptions);
    textPlayGeometry.center();
    const textPlayMaterial = textMaterial.clone();
    textPlayMaterial.color = new THREE.Color(0xf2be22);
    const textPlayMesh = new THREE.Mesh(textPlayGeometry, textPlayMaterial);
    textPlayMesh.position.set(-2.5, 0, 0);

    let coneRadius = width >= height ? 20 : 10;
    let coneHeight = width >= height ? 40 : 20;
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 3);
    textPlayMaterial.wireframe = true;
    const playIcon = new THREE.Mesh(coneGeometry, textPlayMaterial);
    playIcon.rotation.z = - Math.PI / 2;

    play.add(textPlayMesh, playIcon);
    play.position.set(0, -30, -800);
    scene.add(play);
    play.visible = false;

    // tessellation 
    textOptions.size = width >= height ? 15 : 6;
    textOptions.height = width >= height ? 3 : .5;
    let tessellatedGeometry = new TextGeometry(text5, textOptions);
    tessellatedGeometry.center();
    const tessellatedMaterial = new THREE.ShaderMaterial({
      uniforms: {
        amplitude: { value: 100.0 }
      },
      vertexShader: vshaderLanding3,
      fragmentShader: fshaderLanding3,

    });
    const tessellateModifier = new TessellateModifier(8, 6);
    tessellatedGeometry = tessellateModifier.modify(tessellatedGeometry);
    const numFaces = tessellatedGeometry.attributes.position.count / 3;

    const colors = new Float32Array(numFaces * 3 * 3);
    const displacement = new Float32Array(numFaces * 3 * 3);

    const color = new THREE.Color();

    for (let f = 0; f < numFaces; f++) {

      const index = 9 * f;

      const h = 0.2 * Math.random();
      const s = 0.5 + 0.5 * Math.random();
      const l = 0.2 + 0.5 * Math.random();

      color.setHSL(h, s, l);

      const d = 10 * (0.5 - Math.random());

      for (let i = 0; i < 3; i++) {

        colors[index + (3 * i)] = color.r;
        colors[index + (3 * i) + 1] = color.g;
        colors[index + (3 * i) + 2] = color.b;

        displacement[index + (3 * i)] = d;
        displacement[index + (3 * i) + 1] = d;
        displacement[index + (3 * i) + 2] = d;

      }

    }

    tessellatedGeometry.setAttribute('customColor', new THREE.BufferAttribute(colors, 3));
    tessellatedGeometry.setAttribute('displacement', new THREE.BufferAttribute(displacement, 3));

    const tessellatedMesh = new THREE.Mesh(tessellatedGeometry, tessellatedMaterial);
    tessellatedMesh.position.set(0, 50, -800);
    scene.add(tessellatedMesh);
    tessellatedMesh.visible = false;

    textOptions.size = width >= height ? 5 : 2;
    textOptions.height = 0.2;
    const scrollTextGeometry = new TextGeometry(scrollText, textOptions);
    scrollTextGeometry.center();
    const scrollTextMaterial = textMaterial.clone();
    scrollTextMaterial.color = new THREE.Color(0xffffff);
    const scrollTextMesh = new THREE.Mesh(scrollTextGeometry, scrollTextMaterial);
    scrollTextMesh.position.set(0, -25, 0);
    scrollTextMesh.lookAt(camera.position);
    let scrollIcon = new THREE.Group();
    scrollIcon.add(scrollTextMesh, circle, ring);
    scrollIcon.position.set(-50, -110, 25);
    scene.add(scrollIcon);
    textMesh.lookAt(camera.position);


    //particles

    const ringParticleCount = 4000;
    const ringParticles = new THREE.BufferGeometry();
    const ringParticlePositions = new Float32Array(ringParticleCount * 3);
    for (let i = 0; i < ringParticleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = width >= height ? 100 : 50;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      ringParticlePositions[i * 3] = x;
      ringParticlePositions[i * 3 + 1] = y;
      ringParticlePositions[i * 3 + 2] = 0;
    }
    ringParticles.setAttribute('position', new THREE.BufferAttribute(ringParticlePositions, 3));
    const ringParticleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 10,
      map: new THREE.TextureLoader().load('./textures/disc.png'),
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const ringParticleSystem = new THREE.Points(ringParticles, ringParticleMaterial);
    scene.add(ringParticleSystem);

    // clicking
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const pointermoveCallback = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(play);
      if (intersects.length > 0) {
        textPlayMaterial.color.set(0x000000);
      } else {
        textPlayMaterial.color.set(0xf2be22);
      }

    };
    document.addEventListener('pointermove', pointermoveCallback);


    //fadePlane
    const fadePlaneGeo = new THREE.PlaneGeometry(200, 200);
    const fadePlaneMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
    const fadePlane = new THREE.Mesh(fadePlaneGeo, fadePlaneMaterial);
    let fadeFlag = false;

    const clickCallback = (event) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(play);
      if (intersects.length > 0) {
        textPlayMaterial.color.set(0x121200);
        fadePlane.position.set(camera.position.x, camera.position.y, camera.position.z - 0.1);
        scene.add(fadePlane);
        fadeFlag = true;
      }
    }
    document.addEventListener('click', clickCallback);

    //scrolling
    let scrollY = window.scrollY;
    const maxScrollY = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

    const amplitudeRange = 100 - 1;
    const scrollRange = maxScrollY * 0.2;

    let amplitudeValue = Math.max(100 - (window.scrollY - 0.55 * maxScrollY) / scrollRange * amplitudeRange, 1);
    let lastScrollY = window.scrollY;

    const scrollCallback = (e) => {
      scrollY = window.scrollY;
      const scrollPercent = scrollY / maxScrollY;
      text2Mesh.lookAt(camera.position);
      textRuleMesh.lookAt(camera.position);
      textCruelMesh.lookAt(camera.position);
      let disPosition = scrollY / window.innerHeight * 100;
      let scrollIconPosition = disPosition + 110;
      text0Mesh.position.x = Math.sin(disPosition * 0.2);
      textMesh.position.y = disPosition * 0.1;
      scrollIcon.position.y = -scrollIconPosition;

      if (scrollPercent < 0.2) {
        textVersionMesh.visible = false;
        textCreditMesh.visible = false;
        play.visible = false;

        tessellatedMesh.visible = false;
        textRuleMesh.visible = false;
        textCruelMesh.visible = false;
        camera.position.z = -disPosition + 499;

      } else if (scrollPercent >= 0.2 && scrollPercent < 0.4) {
        textVersionMesh.visible = false;
        textCreditMesh.visible = false;
        play.visible = false;

        tessellatedMesh.visible = false;
        textRuleMesh.visible = true;
        textCruelMesh.visible = false;
        camera.position.z = -disPosition + 499;
      }
      else if (scrollPercent >= 0.4 && scrollPercent < 0.55) {
        textVersionMesh.visible = false;
        textCreditMesh.visible = false;
        play.visible = false;

        tessellatedMesh.visible = false;
        camera.position.z = -disPosition + 499;
        textCruelMesh.visible = true;
      }
      else if (scrollPercent >= 0.55 && scrollPercent <= 0.76) {
        textVersionMesh.visible = false;
        textCreditMesh.visible = false;
        play.visible = false;

        tessellatedMesh.visible = true;
        if (scrollY > lastScrollY) {
          amplitudeValue = Math.max(amplitudeValue - (scrollY - lastScrollY) / scrollRange * amplitudeRange, 1);
        } else if (scrollY < lastScrollY) {
          amplitudeValue = Math.min(amplitudeValue + (lastScrollY - scrollY) / scrollRange * amplitudeRange, 100);
        }
        if (scrollPercent >= 0.75) {
          tessellatedMesh.material.uniforms.amplitude.value = 0
        } else {
          tessellatedMesh.material.uniforms.amplitude.value = amplitudeValue;
        }
        lastScrollY = scrollY;
      }
      else if (scrollPercent > 0.76 && scrollPercent <= 0.85) {
        textVersionMesh.visible = false;
        textCreditMesh.visible = false;
        play.visible = false;
        textVersionMesh.visible = true;
      } else if (scrollPercent > 0.85 && scrollPercent <= 0.90) {
        textVersionMesh.visible = false;
        play.visible = false;
        textCreditMesh.visible = true;
        textVersionMesh.visible = true;

      } else if (scrollPercent > 0.90) {
        play.visible = true;
      }
    };
    document.addEventListener('scroll', scrollCallback);

    clock = new THREE.Clock();
    let scatterTime = 0;

    const animate = () => {
      const time = clock.getElapsedTime();

      if (fadeFlag) {
        if (fadePlane.material.opacity < 1) {
          if (width>=height){
            fadePlane.material.opacity += 0.005;
          } else {
            fadePlane.material.opacity += 0.01;
          }
        } else {
          cancelAnimationFrame(animeIDs['landing']);
          document.removeEventListener('pointermove', pointermoveCallback);
          document.removeEventListener('click', clickCallback);
          document.removeEventListener('scroll', scrollCallback);
          strings();
          return;

        }
      }

      if (scrollY > 100) {
        scatterTime += 0.05;

        const positions = ringParticles.getAttribute('position').array;
        for (let i = 0; i < ringParticleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 100;
          const displacementX = Math.cos(angle) * radius;
          const displacementY = Math.sin(angle) * radius;
          const displacementZ = Math.random() * 100 - 50;
          const t = scatterTime * Math.random(); // Randomize the start time for each ringParticle

          // Update the position of the ringParticle based on its original position and the random displacement
          positions[i * 3] = ringParticlePositions[i * 3] + displacementX * t;
          positions[i * 3 + 1] = ringParticlePositions[i * 3 + 1] + displacementY * t;
          positions[i * 3 + 2] = displacementZ;

          // Clamp the ringParticle position to its original position if it has moved too far away
          const maxDistance = 100;
          const distance = Math.sqrt(displacementX ** 2 + displacementY ** 2);
          if (distance > maxDistance) {
            positions[i * 3] = ringParticlePositions[i * 3];
            positions[i * 3 + 1] = ringParticlePositions[i * 3 + 1];
            positions[i * 3 + 2] = 0;
          }
        }

        ringParticles.getAttribute('position').needsUpdate = true;
      }

      if (scrollY <= 100) {
        scatterTime = 0;

        const positions = ringParticles.getAttribute('position').array;
        for (let i = 0; i < ringParticleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = width >= height ? 100 : 50;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = 0;
        }

        ringParticles.getAttribute('position').needsUpdate = true;
      }


      worldsSphereMaterial.uniforms.time.value = time;
      playIcon.rotation.x += 0.01;
      const y = Math.sin(time * 2) * 5;
      circle.position.set(circle.position.x, y, circle.position.z);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      animeIDs['landing'] = requestAnimationFrame(animate);

    };
    animate();
  });
};

const strings = () => {
  scene = new THREE.Scene();
  window.scrollTo(0, 0);
  document.body.style.height = height + 'px';
  document.body.style.overflow = 'hidden';
  camera.position.set(1, 1, 1);
  scene.add(camera);

  const oStringGeo = new THREE.PlaneGeometry(0.1, 5, 64, 64);

  const stringMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      time: { value: 0 },
      color: { value: null },
      uFrequency: { value: null },
    },
  });
  let oStringParticles = [];
  const oStringParticleCount = 80;
  for (let i = 0; i < oStringParticleCount; i++) {
    const oStringMaterial = stringMaterial.clone();
    oStringMaterial.vertexShader = vshaderString4;
    oStringMaterial.fragmentShader = fshaderString4;
    oStringMaterial.uniforms.color.value = new THREE.Vector3(0, 225, 0);
    oStringMaterial.uniforms.uFrequency.value = 5.0 * Math.random() + 5;

    let oString = new THREE.Mesh(oStringGeo, oStringMaterial);
    oString.position.set(
      Math.random() * 30 - 10,
      Math.random() * 30 - 10,
      Math.random() * 30 - 10
    );
    oString.rotation.set(
      Math.random() * 3,
      Math.random() * 6,
      Math.random() * 9
    );
    scene.add(oString);
    oStringParticles.push(oString);
  }
  let StringParticles = [];
  const stringParticleCount = 400;

  const stringGeo = new THREE.SphereGeometry(3, 32, 32, 0, 1, 1, 2);
  const stringCount = stringGeo.attributes.position.count;
  const sRandoms = new Float32Array(stringCount);
  const stringShaderArray = [
    [vshaderString, fshaderString],
    [vshaderString2, fshaderString2],
    [vshaderString3, fshaderString3],
  ];
  for (let i = 0; i < stringCount; i++) {
    sRandoms[i] = Math.random();
  }
  stringGeo.setAttribute("sRandom", new THREE.BufferAttribute(sRandoms, 1));

  for (let i = 0; i < stringParticleCount; i++) {
    const materialShaders =
      stringShaderArray[Math.floor(Math.random() * stringShaderArray.length)];

    const particleMat = stringMaterial.clone();
    particleMat.vertexShader = materialShaders[0];
    particleMat.fragmentShader = materialShaders[1];

    let string = new THREE.Mesh(stringGeo, particleMat);
    string.position.set(
      Math.random() * 30 - 10,
      Math.random() * 30 - 10,
      Math.random() * 30 - 10
    );
    string.rotation.set(
      Math.random() * 3,
      Math.random() * 6,
      Math.random() * 9
    );
    scene.add(string);
    StringParticles.push(string);
  }
  clock = new THREE.Clock();


  const stringText1 = "Starting at late 1960s, a theoretical framework called <span class='red'>string theory</span> was developed which proposes that the fundamental building blocks of the universe are not particles, but strings.";
  const stringText2 = "Strings are theorized as tiny, one-dimensional physical entities that vibrate at different frequencies to give rise to<span class='red'> all the particles and forces in the universe</span>.";
  const stringText3 = "The properties of the strings, such as their<span class='red'> tension and vibration modes</span>, determine the properties of the particles they create.";
  const stringText4 = "One of the challenges of string theory is that it requires the existence of<span class='red'> additional dimensions</span> beyond the familiar three spatial dimensions and one time dimension. These extra dimensions are thought to be compactified, or curled up, into tiny, inaccessible spaces, which is why<span class='red'> we don't perceive them in our everyday lives</span>.";
  const stringDiv = document.createElement('div');
  stringDiv.className = 'label';
  stringDiv.innerHTML = stringText1;

  const stringLabel = new CSS2DObject(stringDiv);
  stringLabel.position.set(0, 0, 0);
  stringLabel.center.set(0, .5);
  scene.add(stringLabel);

  const animateString = () => {
    animeIDs["strings"] = requestAnimationFrame(animateString);
    const time = clock.getElapsedTime();
    for (let i = 0; i < StringParticles.length; i++) {
      const particleMesh = StringParticles[i];
      const speed = 0.01;
      particleMesh.rotation.y += speed * Math.random();
      particleMesh.material.uniforms.time.value = time;
    }
    for (let i = 0; i < oStringParticles.length; i++) {
      const particleMesh = oStringParticles[i];
      const speed = 0.01;
      particleMesh.rotation.y += speed * Math.random();
      particleMesh.material.uniforms.time.value = time;
      particleMesh.material.uniforms.uFrequency.value = Math.random() * 20.0;
    }

    if (time < 15) {
      stringLabel.position.y -= 0.005;
      camera.position.set(2, 9, 2);
      camera.lookAt(0, 0, 0);

    } else if (time >= 15 && time < 30) {
      stringLabel.element.innerHTML = stringText2;
      stringLabel.position.set(-0.01 * time, 4, 0);
      stringLabel.position.y += 0.01;
      stringLabel.center.set(0, 1);
      camera.position.set(0, 2, 0);
      camera.lookAt(0, 10, 0);
    } else if (time >= 30 && time < 40) {
      stringLabel.element.innerHTML = stringText3;
      stringLabel.position.set(0, 3, 0);
      stringLabel.center.set(1, 1);
      camera.rotation.y += 0.0005;
      stringLabel.position.x -= 0.05;
    } else if (time >= 40 && time < 70) {
      stringLabel.element.innerHTML = stringText4;
      stringLabel.position.set(0, -20, 0);
      stringLabel.center.set(0, .2);
      camera.position.x += 0.002;
      camera.position.y += 0.08;
      camera.rotation.y += 0.05;
      camera.lookAt(0, 0, 0);
    }
    else if (time >= 70) {
      cancelAnimationFrame(animeIDs["strings"]);
      scene.remove(stringLabel);
      quarks();
      return;
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };
  animateString();
};

const quarks = () => {
  scene = new THREE.Scene();

  let uQuarks = [];
  let dQuark, uQuark1Material, uQuark2Material, dQuarkMaterial;
  const quarkMaterial = new THREE.ShaderMaterial({
    vertexShader: vshaderQuark,
    fragmentShader: fshaderQuark,
    uniforms: {
      uColor: { value: new THREE.Color(0x0000ff) },
    },
  });

  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const lineGeometry = new THREE.BufferGeometry().setAttribute(
    "position",
    new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3)
  );
  const dischargeLine = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(dischargeLine);

  const uQuarkGeometry = new THREE.SphereGeometry(.5, 16, 16);
  uQuark1Material = quarkMaterial.clone();
  uQuark2Material = quarkMaterial.clone();
  const uQuark1 = new THREE.Mesh(uQuarkGeometry, uQuark1Material);
  uQuark1.position.set(5, 0, 0);
  scene.add(uQuark1);

  uQuarks.push(uQuark1);
  const uQuark2 = new THREE.Mesh(uQuarkGeometry, uQuark2Material);
  uQuark2.position.set(-5, 0, 0);
  scene.add(uQuark2);

  uQuarks.push(uQuark2);

  const dQuarkGeometry = new THREE.SphereGeometry(.5, 16, 16);
  dQuarkMaterial = quarkMaterial.clone();
  dQuarkMaterial.uniforms.uColor.value = new THREE.Color(0x00ff00);

  dQuark = new THREE.Mesh(dQuarkGeometry, dQuarkMaterial);
  dQuark.position.set(0, 0, 3);
  scene.add(dQuark);

  const minDistance = 2;
  const maxDistance = 5;

  const quarkText1 = "Quarks are elementary particles that are the building blocks of protons and neutrons, which in turn make up the nuclei of atoms. Quarks are believed to be<span class='red'> truly fundamental particles</span>, meaning that they cannot be broken down into smaller constituents.";
  const quarkText2 = "There are <span class='red'>six different types of quarks</span>, known as flavors, which are labeled up, down, charm, strange, top, and bottom. <span class='blue'>Up</span> and <span class='green'>down</span> quarks, which are the lightest and most common, make up the protons and neutrons in ordinary matter.";
  const quarkText3 = "One of the most striking features of quarks is that they are <span class='red'>always found in combinations of two or three, never as isolated particles</span>. This property is known as confinement, and it is thought to arise from the strong nuclear force, which binds quarks together and prevents them from existing in isolation.";
  const quarkText4 = "Quarks interact through the <span class='red'>strong nuclear force</span>, mediated by particles known as <span class='emph'>gluons</span>. The strong force is responsible for holding protons and neutrons together in atomic nuclei, and it is one of the four fundamental forces of nature, along with <span class='green'>gravity</span>, <span class='blue'>electromagnetism</span>, and <span class='red'>the weak force</span>.";
  const quarkDiv = document.createElement('div');
  quarkDiv.className = 'label';
  quarkDiv.innerHTML = quarkText1;

  const quarkLabel = new CSS2DObject(quarkDiv);
  quarkLabel.position.set(0, 0, 2);
  quarkLabel.center.set(0, 0);
  scene.add(quarkLabel);

  clock = new THREE.Clock();

  camera.position.set(0, 0, 1.5);

  const quarkLoop = () => {
    animeIDs["quarks"] = requestAnimationFrame(quarkLoop);
    const time = clock.getElapsedTime();

    for (let i = 0; i < 2; i++) {
      const uQuarkMesh = uQuarks[i];

      const axis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      const angle = Math.random() * Math.PI * 2;
      uQuarkMesh.quaternion.multiply(
        new THREE.Quaternion().setFromAxisAngle(axis, angle)
      );

      uQuarkMesh.position.x += (Math.random() - 0.5) * 0.1;
      uQuarkMesh.position.y += (Math.random() - 0.5) * 0.1;
      uQuarkMesh.position.z += (Math.random() - 0.5) * 0.1;

      const distance = uQuarks[0].position.distanceTo(uQuarks[1].position);
      if (distance < minDistance) {
        const pushVector = uQuarkMesh.position
          .clone()
          .sub(uQuarks[1 - i].position)
          .normalize()
          .multiplyScalar(minDistance - distance);
        uQuarkMesh.position.add(pushVector);
      } else if (distance > maxDistance) {
        const pushVector = uQuarkMesh.position
          .clone()
          .sub(uQuarks[1 - i].position)
          .normalize()
          .multiplyScalar(distance - maxDistance);
        uQuarkMesh.position.sub(pushVector);
      }
    }

    const axis = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    const angle = Math.random() * Math.PI * 2;
    dQuark.quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(axis, angle)
    );

    dQuark.position.x += (Math.random() - 0.5) * 0.1;
    dQuark.position.y += (Math.random() - 0.5) * 0.1;
    dQuark.position.z += (Math.random() - 0.5) * 0.1;

    let distance = dQuark.position.distanceTo(uQuarks[0].position);
    if (distance < minDistance) {
      const pushVector = dQuark.position
        .clone()
        .sub(uQuarks[0].position)
        .normalize()
        .multiplyScalar(minDistance - distance);
      dQuark.position.add(pushVector);
    } else if (distance > maxDistance) {
      const pushVector = dQuark.position
        .clone()
        .sub(uQuarks[0].position)
        .normalize()
        .multiplyScalar(distance - maxDistance);
      dQuark.position.sub(pushVector);
    }
    distance = dQuark.position.distanceTo(uQuarks[1].position);
    if (distance < minDistance) {
      const pushVector = dQuark.position
        .clone()
        .sub(uQuarks[1].position)
        .normalize()
        .multiplyScalar(minDistance - distance);
      dQuark.position.add(pushVector);
    } else if (distance > maxDistance) {
      const pushVector = dQuark.position
        .clone()
        .sub(uQuarks[1].position)
        .normalize()
        .multiplyScalar(distance - maxDistance);
      dQuark.position.sub(pushVector);
    }
    for (let i = 0; i < 2; i++) {
      const uQuarkMesh = uQuarks[i];

      if (Math.random() < 0.2) {
        let target = i === 0 ? uQuarks[1] : uQuarks[0];
        if (Math.random() < 0.5) {
          target = dQuark;
        }

        const start = uQuarkMesh.position.clone();
        dischargeLine.geometry.attributes.position.setXYZ(
          0,
          start.x,
          start.y,
          start.z
        );

        const end = target.position.clone();
        dischargeLine.geometry.attributes.position.setXYZ(
          1,
          end.x,
          end.y,
          end.z
        );
        dischargeLine.geometry.attributes.position.needsUpdate = true;

        const duration = Math.random() * 0.5;
        const startTime = time;
        const animateLine = (time) => {
          const t = (time - startTime) / duration;
          if (t < 1) {
            dischargeLine.material.opacity = 1 - t;
          } else {
            dischargeLine.material.opacity = 0;
            dischargeLine.geometry.attributes.position.setXYZ(0, 0, 0, 0);
            dischargeLine.geometry.attributes.position.setXYZ(1, 0, 0, 0);
            dischargeLine.geometry.attributes.position.needsUpdate = true;
            scene.remove(dischargeLine);
            return;
          }
          animeIDs["animateLine"] = requestAnimationFrame(animateLine);
        };
        scene.add(dischargeLine);
      }
    }

    if (time < 15) {
      quarkLabel.position.set(-0.75, 0, 1);
      quarkLabel.position.y += 0.01;
      quarkLabel.center.set(0, 0);
      camera.position.x += 0.02;
      camera.position.y += 0.01;
      // camera.rotation.y -= 0.02;
      camera.lookAt(0, 0, 1);
    } else if (time >= 15 && time < 30) {
      quarkLabel.element.innerHTML = quarkText2;
      quarkLabel.position.set(0.01 * time, 0.01 * time, 0);
      quarkLabel.center.set(0, 1);
      camera.position.set(-5, 25, 0);
      camera.lookAt(0, 0, 1);
    } else if (time >= 30 && time < 38) {
      quarkLabel.visible = false;
      camera.position.set(uQuarks[0].position.x - 10, uQuarks[0].position.y + 5, uQuarks[0].position.z - 10);
      camera.lookAt(dQuark.position)
    } else if (time >= 38 && time < 45) {
      camera.position.set(uQuarks[1].position.x + 10, uQuarks[1].position.y + 5, uQuarks[1].position.z - 10);
      camera.lookAt(uQuarks[0].position)
    } else if (time >= 45 && time < 60) {
      quarkLabel.visible = true;
      quarkLabel.element.innerHTML = quarkText3;
      quarkLabel.position.set(0.01 * time, 0, 0);
      quarkLabel.center.set(0, 1);
      camera.position.set(0, 25, 0);
      camera.lookAt(-1, 0, -1);

    } else if (time >= 60 && time < 75) {
      quarkLabel.element.innerHTML = quarkText4;
      quarkLabel.position.set(0, 0, 0);
      quarkLabel.center.set(0, 0);
      camera.position.z += .1;
      camera.lookAt(0, 0, 0);
    } else if (time >= 75) {
      scene.remove(quarkLabel);
      cancelAnimationFrame(animeIDs["quarks"]);
      cancelAnimationFrame(animeIDs["animateLine"]);
      nucleus();
      return;
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  };
  quarkLoop();

};

const nucleus = () => {

  scene = new THREE.Scene();

  let protonGeo = new THREE.SphereGeometry(0.125, 32, 32);
  const protonCount = protonGeo.attributes.position.count;
  const pRandoms = new Float32Array(protonCount);
  for (let i = 0; i < protonCount; i++) {
    pRandoms[i] = Math.random();
  }
  protonGeo.setAttribute("sRandom", new THREE.BufferAttribute(pRandoms, 1));

  const protonMaterial = new THREE.ShaderMaterial({
    vertexShader: vshaderProton,
    fragmentShader: fshaderProton,
    side: THREE.FrontSide,
    transparent: true,
    uniforms: {
      randomness: { value: Math.random() },
      utime: { value: 0 },
      uTexture: { value: protonTexture },
    },
  });
  let proton = new THREE.Mesh(protonGeo, protonMaterial);
  scene.add(proton);

  const electronGeometry = new THREE.SphereGeometry(.05, 32, 32);
  const electronMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.8,
    emissive: 0xff0000,
    emissiveIntensity: 10000,
  });
  const electron = new THREE.Mesh(electronGeometry, electronMaterial);
  electron.position.set(2, 0, 0);

  const origin = new THREE.Vector3(0, 0, 0);

  const pivot = new THREE.Object3D();
  pivot.add(electron);
  scene.add(pivot);

  const nucleusText1 = "The hydrogen nucleus, consists of one proton, is orbited by a single electron and is the most common type of nucleus in the universe, as hydrogen is the most abundant element in the universe. About <span class='red'>90% of the visible universe is made up of hydrogen</span>.";
  const nucleusText2 = "Electrons in an atom move according to the laws of <span class='red'>quantum mechanics</span>, which describe the behavior of particles at the atomic and subatomic level. In an atom, electrons occupy different energy levels or orbitals around the nucleus.";
  const nucleusText3 = "The movement of electrons within an atom is best described as a <span class='red'>probability distribution</span>, meaning that there is no definite path or trajectory that can be traced. Instead, the probability of finding an electron at a particular location around the nucleus is determined by its wave function, which is a mathematical description of the electron's behavior.";
  const nucleusText4 = "Electrons have a fundamental electric charge of -1, which is equal in magnitude but opposite in sign to the charge of a proton (+1). This means that electrons and protons are <span class='red'>attracted to each other</span> and can form stable atoms through the electromagnetic force.";
  const nucleusDiv = document.createElement('div');
  nucleusDiv.className = 'label';
  nucleusDiv.innerHTML = nucleusText1;

  const nucleusLabel = new CSS2DObject(nucleusDiv);
  nucleusLabel.position.set(0.2, 0, 0);
  nucleusLabel.center.set(0, 0.5);
  scene.add(nucleusLabel);

  const trailParticles = [];

  const addTrailParticle = (position, loopNumber) => {
    const particleGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity:0.1 });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    particle.position.copy(position);
    scene.add(particle);
    trailParticles.push(particle);
    particle.userData.birthTime = clock.getElapsedTime();
    particle.userData.loopNumber = loopNumber;
  };

  const animationDuration = 1000;
  const rotationAmount = (2 * Math.PI) / animationDuration;

  let animationStartTime = null;
  electron.userData.loopNumber = 0;

  function updateRotation(currentTime) {
    if (!animationStartTime) {
      animationStartTime = currentTime;
    }

    const elapsedTime = currentTime - animationStartTime;
    const rotation = (elapsedTime / animationDuration) * 2 * Math.PI;

    pivot.rotation.y = rotation;
  }

  setInterval(() => {
    electron.position.x = Math.random() * 8 + 2;
    pivot.rotation.x = Math.random() * 2.7 + 0.3;
    electron.userData.loopNumber++;
  }, 1000);

  camera.position.set(0.127, 0, 0);
  clock = new THREE.Clock();

  const electronLoop = () => {
    const time = clock.getElapsedTime();
    protonMaterial.uniforms.utime.value = time * 4;
    protonMaterial.uniforms.randomness.value = Math.random();

    updateRotation(time * 1000);
    addTrailParticle(electron.getWorldPosition(origin), electron.userData.loopNumber);

    trailParticles.forEach((particle, i) => {
      if (
        time - particle.userData.birthTime > 0.2 || electron.userData.loopNumber != particle.userData.loopNumber) {
        scene.remove(particle);
        trailParticles.splice(i, 1);
      }
    });

    if (time < 30) {
      camera.position.x += time * 0.002;
      camera.position.z += time * 0.0005;
      camera.lookAt(0,0,0);
    } else if (time >= 30 && time < 45) {
      nucleusLabel.element.innerHTML = nucleusText2;
      nucleusLabel.position.set(0.05 * time, 0.05 * time, 0);
      nucleusLabel.center.set(1, -0.1);
      camera.position.set(20, -2, 0);
      camera.lookAt(0, 1, 0);
    } else if (time >= 45 && time < 60) {
      nucleusLabel.element.innerHTML = nucleusText3;
      nucleusLabel.position.set(0, 0, 0);
      nucleusLabel.center.set(1, .25);
      camera.position.set(8, 0, 6);
      camera.rotation.y += 0.1;
    } else if (time >= 60 && time < 75) {
      nucleusLabel.element.innerHTML = nucleusText4;
      nucleusLabel.position.set(0, 0, 0);
      nucleusLabel.center.set(.1, -.1);
      camera.position.x += time * 0.001;
      camera.position.y -= time * 0.0005;
    } else {
      scene.remove(nucleusLabel);
      cancelAnimationFrame(animeIDs["nucleus"]);
      H2O();
      return;
    }
    animeIDs["nucleus"] = requestAnimationFrame(electronLoop);
    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
  };

  electronLoop();
};

const H2O = () => {

  // add bg
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xBFF4F7);

  camera.position.set(30, 4, 6);

  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.shadowMapSoft = true;

  const particleCount = 100;
  const particleSpeed = 0.2;
  const oxygenRadius = 1.5;
  const hydrogenMoleculeRadius = 1;
  const hydrogenMoleculeOffset = 0.25;
  const maxDistance = 30;

  const particles = [];

  const oxygenGeometry = new THREE.SphereGeometry(oxygenRadius, 32, 32);

  const moleculeMaterial = new THREE.ShaderMaterial({
    vertexShader: vshaderMolecule,
    fragmentShader: fshaderMolecule,
    transparent: true,
    uniforms: {
      cameraPosition: { value: camera.position },
      lightDirection: { value: new THREE.Vector3() },
      time: { value: 0.0 },
    },
  });

  const hydrogenMoleculeGeometry = new THREE.SphereGeometry(
    hydrogenMoleculeRadius,
    32,
    32
  );

  for (let i = 0; i < particleCount; i++) {
    const particleMesh = new THREE.Object3D();
    const particle = new THREE.Mesh(oxygenGeometry, moleculeMaterial.clone());
    particleMesh.add(particle);

    const hydrogenMolecule1 = new THREE.Mesh(
      hydrogenMoleculeGeometry,
      moleculeMaterial.clone()
    );
    hydrogenMolecule1.position.set(
      oxygenRadius + hydrogenMoleculeOffset,
      0,
      -hydrogenMoleculeOffset
    );
    particleMesh.add(hydrogenMolecule1);

    const hydrogenMolecule2 = new THREE.Mesh(
      hydrogenMoleculeGeometry,
      moleculeMaterial.clone()
    );
    hydrogenMolecule2.position.set(
      -oxygenRadius - hydrogenMoleculeOffset,
      0,
      -hydrogenMoleculeOffset
    );
    particleMesh.add(hydrogenMolecule2);

    particleMesh.position.set(
      Math.random() * maxDistance - maxDistance / 2,
      Math.random() * maxDistance - maxDistance / 2,
      Math.random() * maxDistance - maxDistance / 2
    );
    particleMesh.velocity = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).multiplyScalar(particleSpeed);

    particles.push(particleMesh);
    scene.add(particleMesh);
  }


  const h2oText1 = "A water molecule consists of two hydrogen atoms covalently bonded to a single oxygen atom. <span class='red'>Hydrogen bonding</span> gives water its unique properties, such as its high boiling and melting points, and its ability to dissolve many substances .";
  const h2oText2 = "The hydrogen bonds between water molecules give water a <span class='red'>high boiling point</span> and <span class='red'>high surface tension</span>. These properties make water an excellent solvent for many substances, including salts and sugars, and allow certain insects to walk on water.";
  const h2oText3 = "The oxygen atom in a water molecule has a slightly <span class='red'>negative charge</span>, while the hydrogen atoms have slightly <span class='green'>positive charges</span>. This polarity allows water molecules to form hydrogen bonds with each other, which are weak electrostatic attractions between the positive and negative ends of neighboring molecules. ";
  const h2oText4 = "Water is <span class='red'>essential for life on Earth</span>, and is involved in many biological processes, such as photosynthesis, respiration, and digestion. It is also important for <span class='red'>maintaining the temperature of living organisms and their environments</span>.";
  const h2oDiv = document.createElement('div');
  h2oDiv.className = 'label';
  h2oDiv.innerHTML = h2oText1;

  const h2oLabel = new CSS2DObject(h2oDiv);
  // h2oLabel.center.set(0, 0);

  scene.add(h2oLabel);


  camera.rotation.y = Math.PI / 2;
  clock = new THREE.Clock();


  const H2OLoop = () => {
    const time = clock.getElapsedTime();
    moleculeMaterial.uniforms.time.value = time;
    moleculeMaterial.uniforms.cameraPosition.value = camera.position;

    particles.forEach((particle) => {
      const lightDirection = new THREE.Vector3()
        .subVectors(alight.position, particle.position)
        .normalize();
      particle.children.forEach((child) => {
        if (child.material) {
          child.material.uniforms.lightDirection.value = lightDirection;
        }
      });

      particle.position.add(particle.velocity);

      if (particle.position.length() > maxDistance) {
        particle.velocity.negate();
      }

      particles.forEach((other) => {
        particle.rotation.x += 0.0001 * Math.random();
        particle.rotation.y += 0.00005 * Math.random();
        particle.rotation.z += 0.00015 * Math.random();
        if (particle !== other) {
          const distance = particle.position.distanceTo(other.position);

          if (distance < oxygenRadius * 2) {
            const averageVelocity = particle.velocity
              .clone()
              .add(other.velocity)
              .multiplyScalar(0.3);
            const collisionDirection = particle.position
              .clone()
              .sub(other.position)
              .normalize();
            particle.velocity.sub(
              collisionDirection
                .clone()
                .multiplyScalar(averageVelocity.dot(collisionDirection))
            );
            other.velocity.add(
              collisionDirection
                .clone()
                .multiplyScalar(averageVelocity.dot(collisionDirection))
            );
          }
        }
      });
    });

    if (time < 20) {
      camera.position.x = particles[50].position.x + 4;
      camera.position.y = particles[50].position.y - 1;
      camera.position.z = particles[50].position.z + 0.5 * time;
      camera.lookAt(particles[50].position);
      h2oLabel.position.set(particles[50].position.x, particles[50].position.y - 1, particles[50].position.z);

    } else if (time >= 20 && time < 40) {
      h2oLabel.element.innerHTML = h2oText2;
      camera.rotation.y = 0;
      camera.position.set(0, 0, 0);
      camera.lookAt(0, 20, 0);
      h2oLabel.position.set(0,10,0);
    } else if (time >= 40 && time < 60) {
      h2oLabel.element.innerHTML = h2oText3;
      h2oLabel.position.set(0, 0, 0);
      h2oLabel.center.set(0, 0.4);
      camera.position.y += 0.001 * time;
      camera.lookAt(0, 0, 0);
    } else if (time >= 60 && time < 80) {
      h2oLabel.element.innerHTML = h2oText4;
      camera.position.x = particles[50].position.x + 6;
      camera.position.y = particles[50].position.y + 8;
      camera.position.z = particles[50].position.z + 6;
      camera.lookAt(particles[50].position);
      h2oLabel.position.set(particles[50].position.x + 1, particles[50].position.y + 2, particles[50].position.z + 1);
    } else if (time >= 80) {
      cancelAnimationFrame(animeIDs["H2O"]);
      scene.remove(h2oLabel);
      rain();
      return;
    }

    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    animeIDs["H2O"] = requestAnimationFrame(H2OLoop);
  };
  H2OLoop();
};

const rain = () => {

  scene = new THREE.Scene();
  let water, sun;
  sun = new THREE.Vector3();
  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      size: .1,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;
  scene.add(water);

  // Skybox
  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;
  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2;
  skyUniforms['mieCoefficient'].value = 0.005;
  skyUniforms['mieDirectionalG'].value = 0.8;

  const parameters = {
    elevation: 2,
    azimuth: 180
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  let renderTarget;

  const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
  const theta = THREE.MathUtils.degToRad(parameters.azimuth);

  sun.setFromSphericalCoords(1, phi, theta);

  sky.material.uniforms['sunPosition'].value.copy(sun);
  water.material.uniforms['sunDirection'].value.copy(sun).normalize();

  if (renderTarget !== undefined) renderTarget.dispose();

  renderTarget = pmremGenerator.fromScene(sky);

  scene.environment = renderTarget.texture;

  // cloud
  const size = 128;
  const data = new Uint8Array(size * size * size);
  let i = 0;
  const scale = 0.05;
  const perlin = new ImprovedNoise();
  const vector = new THREE.Vector3();

  for (let z = 0; z < size; z++) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const d = 1.0 - vector.set(x, y, z).subScalar(size / 2).divideScalar(size).length();
        data[i] = (128 + 128 * perlin.noise(x * scale / 1.5, y * scale, z * scale / 1.5)) * d * d;
        i++;
      }
    }
  }

  const texture = new THREE.Data3DTexture(data, size, size, size);
  texture.format = THREE.RedFormat;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.unpackAlignment = 1;
  texture.needsUpdate = true;

  const cloudMaterial = new THREE.RawShaderMaterial({
    vertexShader: vshaderCloud,
    fragmentShader: fshaderCloud,
    glslVersion: THREE.GLSL3,
    uniforms: {
      base: { value: new THREE.Color(0x1d1d1d) },
      map: { value: texture },
      cameraPos: { value: new THREE.Vector3() },
      threshold: { value: 0.2 },
      opacity: { value: 0.25 },
      range: { value: 0.1 },
      steps: { value: 100 },
      frame: { value: 0 }
    },
    side: THREE.BackSide,
    transparent: true
  });
  const cloudGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
  cloud.scale.set(150, 30, 100);
  cloud.position.set(0, 50, 0);
  scene.add(cloud);

  // raindrops
  let raindrops = [];
  const rainGeometry = new THREE.SphereGeometry(0.05, 8, 8);
  const rainMaterial = new THREE.MeshStandardMaterial({ color: 0xBFF4F7, transparent: true, opacity: .5 });
  let isRaining = false;
  const CreateRain = () => {
    for (let i = 0; i < 2000; i++) {
      const raindrop = new THREE.Mesh(rainGeometry, rainMaterial);
      const x = Math.random() * 40 - 5;
      const y = Math.random() * 40 + 5;
      const z = Math.random() * 40 - 5;
      raindrop.position.set(x, y, z);
      const speed = Math.random() * 0.5 + 0.5;
      const height = Math.random() * 5 + 5;
      let time = 0;
      const animateRaindrop = function () {
        time += 0.01;
        raindrop.position.y -= speed * 0.3;
        if (raindrop.position.y <= -5) {
          raindrop.position.y = 40;
          time = 0;
        }
        animeIDs['animateRaindrop'] = requestAnimationFrame(animateRaindrop);
      };
      animateRaindrop();
      raindrops.push[raindrop];
      scene.add(raindrop);
    }
  }

  // rain0
  const rain0Geometry = new THREE.SphereGeometry(0.01, 32, 32);
  const raindrop0 = new THREE.Mesh(rain0Geometry, rainMaterial);
  raindrop0.position.set(4.99, 19.99, 4.99);
  raindrops.push[raindrop0];
  camera.lookAt(raindrop0.position);
  scene.add(raindrop0);

  // lightning
  let LightningMaterial = new THREE.ShaderMaterial({
    vertexShader: vshaderLightning,
    fragmentShader: fshaderLightning,
    uniforms: {
      time: { value: 0 }
    },
  });
  let lightningGeo = new THREE.PlaneGeometry(2, 40);

  var planes = [];
  const drawLightning = () => {
    if (planes.length >= 5) return;
    let lightning = new THREE.Mesh(lightningGeo, LightningMaterial.clone());

    lightning.position.set(Math.random() * 15 - 5, 20, Math.random() * 15 - 5);
    scene.add(lightning);
    planes.push(lightning);

    const duration = Math.random() * .5 + 0.1;
    animeIDs['drawLightningTimeout'] = setTimeout(() => {
      scene.remove(lightning);
      planes.splice(planes.indexOf(lightning), 1);
    }, duration * 1000);
  };

  let hasLightnening = false;

  const rainText1 = "There are around <span class='red'>10,000,000,000,000,000</span> (10^16) molecules of water in a 1mm diameter raindrop.";
  const rainText2 = "The oldest indication of rainfall dates back to <span class='red'>2.7 billion</span> years ago.";
  const rainText3 = "As the clouds grow and develop, they can become <span class='red'>electrically charged</span>. The buildup of electrical charges can create an electric field between the bottom of the cloud and the ground. This field can become strong enough to <span class='red'>ionize the air molecules in between</span>, creating a conductive path for the electrical charge to travel";
  const rainText4 = "A flash of lightning can heat the air around it to temperatures <span class='red'>five times hotter than the sun’s surface</span>. Daily lightning strikes are estimated at <span class='red'>8.6 million times</span>.";
  const rainText5 = "An average cloud capable of creating rain weighs around<span class='red'> 500,000 kilograms</span>. Clouds are capable of moving at <span class='red'>100 kilometers per hour</span>. A typical cloud has <span class='red'>a base height of 1000 meters</span>";
  const rainDiv = document.createElement('div');
  rainDiv.className = 'label';
  rainDiv.innerHTML = rainText1;

  const rainLabel = new CSS2DObject(rainDiv);
  rainLabel.position.set(0.2, 0, 0);
  rainLabel.center.set(0.5, 0.5);
  scene.add(rainLabel);

  camera.position.set(5, 20, 5);

  clock = new THREE.Clock();

  function rainLoop() {
    const time = clock.getElapsedTime();

    planes.forEach(l => {
      l.material.uniforms.time.value = time;
      const targetPosition = new THREE.Vector3();
      targetPosition.copy(camera.position);
      targetPosition.y = l.position.y;

      const lookRotationMatrix = new THREE.Matrix4();
      lookRotationMatrix.lookAt(targetPosition, l.position, new THREE.Vector3(0, 1, 0));

      const lookRotationQuaternion = new THREE.Quaternion();
      const lookRotationScale = new THREE.Vector3();
      lookRotationMatrix.decompose(new THREE.Vector3(), lookRotationQuaternion, lookRotationScale);

      l.setRotationFromQuaternion(lookRotationQuaternion);
    });

    if (time < 12) {
      rainLabel.position.set(raindrop0.position.x, raindrop0.position.y, raindrop0.position.z);
      rainLabel.position.y += 0.01;
      camera.lookAt(raindrop0.position);
      camera.position.x += 0.0001;
      camera.position.z += 0.0001;
    }
    else if (time >= 12 && time < 13) {
      water.material.uniforms.time.value += 2.0 / 60.0;
      raindrop0.position.y -= .001;
      if (!isRaining) {
        CreateRain();
        isRaining = true;
      }
      if (!hasLightnening) {
        animeIDs['drawLightningInterval'] = setInterval(drawLightning, 1500);
        hasLightnening = true;
      }
    } else if (time >= 13 && time < 30) {
      rainLabel.element.innerHTML = rainText2;
      rainLabel.position.set(10, 2 + 0.3 * time, 10);

      water.material.uniforms.time.value += 4.0 / 60.0;
      camera.position.set(-10, 5, -10);
      camera.lookAt(50, 10, 50);
    } else if (time >= 30 && time < 45) {
      camera.position.x += 0.01;
      camera.position.z += 0.01;
      water.material.uniforms.time.value += 4.0 / 60.0;
      rainLabel.element.innerHTML = rainText3;
      rainLabel.position.set(60, 80, 60);

      camera.lookAt(50, 90, 50);
    } else if (time >= 45 && time < 55) {
      rainLabel.element.innerHTML = rainText4;
      rainLabel.position.set(60, 120, 60);
      water.material.uniforms.time.value += 4.0 / 60.0;
      camera.position.y += 0.05;
    } else if (time >= 55 && time < 56) {
      water.material.uniforms.time.value += 4.0 / 60.0;

      camera.position.set(0, 20, 0);
      camera.lookAt(0, 0, 0);
    } else if (time >= 56 && time < 64) {
      water.material.uniforms.time.value += 4.0 / 60.0;
      camera.position.y += 0.2;
      camera.lookAt(0, 0, 0)
      rainLabel.element.innerHTML = rainText5;
      rainLabel.position.set(0, camera.position.y - 1, 0);
      rainLabel.center.set(0.5, 1.5);

    } else if (time >= 64 && time < 85) {
      camera.position.y += 3;
      camera.lookAt(0, 0, 0);
      rainLabel.position.set(0, camera.position.y - 1, 0);
    } else if (time >= 85) {
      cancelAnimationFrame(animeIDs['rainLoop']);
      cancelAnimationFrame(animeIDs['animateRaindrop']);
      clearInterval(animeIDs['drawLightningInterval']);
      clearTimeout(animeIDs['drawLightningTimeout']);
      scene.remove(rainLabel);
      space();
      return;
    }

    cloud.material.uniforms.cameraPos.value.copy(camera.position);
    cloud.material.uniforms.threshold.value = 0.25 + 0.02 * Math.sin(time);
    cloud.material.uniforms.range.value = 0.1 + 0.02 * Math.cos(time);
    cloud.material.uniforms.frame.value++;

    animeIDs['rainLoop'] = requestAnimationFrame(rainLoop);
    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
  }

  rainLoop();

};

const space = () => {
  scene = new THREE.Scene();
  camera.rotation.set(0, 0, 0);

  const earthGeometry = new THREE.SphereGeometry(10, 32, 32);
  const earthLightsTexture = textureLoader.load('./textures/earth_lights_2048.jpg');
  const earthCloudsTexture = textureLoader.load('./textures/earth_clouds_1024.png');
  const earthNormalTexture = textureLoader.load('./textures/earthbump1k.jpg');
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthLightsTexture,
    bumpMap: earthNormalTexture,
    transparent: true,
    bumpScale: 1.2
  });

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  const cloudsMaterial = new THREE.MeshBasicMaterial({
    map: earthCloudsTexture,
    transparent: true,
    alphaTest: 0.5,
  });
  const cloudsMesh = new THREE.Mesh(earthGeometry, cloudsMaterial);
  earth.add(cloudsMesh);

  const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
  const moonTexture = new THREE.TextureLoader().load('./textures/moon_1024.jpg');
  const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.position.set(25, 0, 0);
  earth.add(moon);

  // Create the bloom effect

  const params = {
    threshold: 0,
    strength: 0.5,
    radius: .5,
    exposure: 1
  };
  // camera.layers.enable(1);
  const renderScene = new RenderPass(scene, camera);

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
  bloomPass.threshold = params.threshold;
  bloomPass.strength = params.strength;
  bloomPass.radius = params.radius;

  const outputPass = new OutputPass(THREE.ReinhardToneMapping);

  let composer = new EffectComposer(renderer);
  // composer.renderToScreen = false;
  composer.addPass(renderScene);
  composer.addPass(bloomPass);
  composer.addPass(outputPass);

  let ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const sunColor = new THREE.Color(0xfd8813);
  const sunGeometry = new THREE.IcosahedronGeometry(109, 15);
  const sunMaterial = new THREE.MeshBasicMaterial({ color: sunColor });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.position.set(-150, 0, 0);
  // sun.layers.set(1);
  scene.add(sun);
  // Create the background of stars
  const positions = [];
  for (let i = 0; i < 1000; i++) {
    const pointOnSphere = new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
    positions.push(
      pointOnSphere.x * 300,
      pointOnSphere.y * 300,
      pointOnSphere.z * 300
    );
  }

  // Create points object with sphere positions
  const pointMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  const points = new THREE.Points(pointGeometry, pointMaterial);
  scene.add(points);
  fontLoader.load('./fonts/p1.typeface.json', function (font) {

    // Set the text parameters
    const text = 'DESOBE.IR';
    const text2 = 'DRIFT INTO THE ABSTRACT';
    const textOptions = {
      font: font,
      size: 5,
      height: 1,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5
    };
    // Create the text 
    const textGeometry = new TextGeometry(text, textOptions);
    textGeometry.center();
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x110000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-50, 20, 0);
    textMesh.rotation.y = Math.PI / 2;
    scene.add(textMesh);
    textOptions.size = 2;
    const text2Geometry = new TextGeometry(text2, textOptions);
    text2Geometry.center();
    const text2Mesh = new THREE.Mesh(text2Geometry, textMaterial);
    text2Mesh.position.set(-55, 15, 0);
    text2Mesh.rotation.y = Math.PI / 2;
    scene.add(text2Mesh);

    const spaceText1 = "The Earth is estimated to be about <span class='red'>4.54 billion years old</span>.";
    const spaceText2 = "The moon is thought to have formed from debris left over after a Mars-sized object <span class='red'>collided with the early Earth</span>. It is <span class='red'>gradually drifting away</span> from Earth at a rate of approximately 3.8 cm per year.";
    const spaceText3 = "The sun is one of the about one septillion stars in the universe, <span class='red'>109</span> times larger than earth and with a distance of about <span class='red'>149.6 million kilometers</span> to it. <br>It takes 8 minutes and 19 seconds for sunlight to reach us.";
    const spaceText4 = "In about five billion years, <span class='red'>the sun will collapse</span> under gravity, ultimately ballooning into a red giant that is 100 times bigger and 2,000 times more luminous, <span class='red'>vaporizing Earth in the process</span>, so you don't have to hurry the process of being vaporized up! <br><span class='green'>Life</span> is the most scarce and therefore precious incident ever, so live it responsibly and take care of your environment.";

    const spaceDiv = document.createElement('div');
    spaceDiv.className = 'label';
    spaceDiv.innerHTML = spaceText1;

    const spaceLabel = new CSS2DObject(spaceDiv);
    spaceLabel.position.set(15, 0, 0);
    spaceLabel.center.set(1, 2);
    scene.add(spaceLabel);

    clock = new THREE.Clock();
    camera.position.set(15.001, 0, 0);

    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      earth.rotation.y += 0.001;
      moon.rotation.y += 0.001;
      moon.position.x = 25 * Math.sin(earth.rotation.y);
      moon.position.z = 25 * Math.cos(earth.rotation.y);
      sun.rotation.y += 0.0005;
      if (time < 25) {
        camera.position.x += 0.05;
        camera.lookAt(0, 0, 0);

      } if (time >= 25 && time < 45) {
        spaceLabel.element.innerHTML = spaceText2;
        spaceLabel.center.set(0, 3);
        camera.rotation.y += 0.0002;
        camera.position.set(-50, 150, 0);
        camera.lookAt(-10, 0, 0);
        camera.rotation.z = Math.PI / 2;
      } else if (time >= 45 && time < 60) {
        spaceLabel.element.innerHTML = spaceText3;
        spaceLabel.center.set(0, 4);
        camera.lookAt(textMesh.position);
        camera.position.set(120, 20, -45);
        camera.position.x -= 0.5;
        camera.position.y += 0.1;
        camera.position.z -= 0.1;
        textMesh.position.x += 0.03;
      } else if (time >= 60 && time < 80) {
        spaceLabel.element.innerHTML = spaceText4;
        spaceLabel.position.set(15, 30, 0);
        camera.position.set(100, 20, 0);
        camera.lookAt(0, 20, 0);

        spaceLabel.center.set(0.5, 1);
        text2Mesh.position.x += 0.04;
      } else if (time >= 80) {
        spaceLabel.element.innerHTML = '<span class="red big">Worlds Within Worlds</span><br><a class="link" href="https://desobe.ir">By Arman Rahimi | desobe.ir</><br><a target="_blank" class="link" href="https://github.com/desobe-ir/desobeir"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg> Github Repository<br>https://github.com/desobe-ir/desobeir</a><br><a class="link" href="mailto:arman.rahimi@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at-fill" viewBox="0 0 16 16"><path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2H2Zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671Z"/><path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034v.21Zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z"/></svg> Send Me An Email:<br>arman.rahimi@gmail.com</a><br>This animation would have not been possible without glslsandbox.com';
        spaceLabel.element.style.textAlign = 'center';
      }
      composer.render();
      labelRenderer.render(scene, camera);

    }
    animate();

  });
};
if (WebGL.isWebGL2Available() === false) {

  document.body.appendChild(WebGL.getWebGL2ErrorMessage());

} else {
  init();
}
