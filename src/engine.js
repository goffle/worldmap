import TrackballControls from './vendor/TrackballControls';
import './vendor/CSS3DRenderer';

const planeWidth = 3312;
const planeHeight = 1634;

export default class Engine {

  constructor(options) {

    console.log('Create Engine');

    // SCENE
    this.scene = new THREE.Scene();

    // CAMERA
    const VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
    // const backgroundColor = options.backgroundColor ? options.backgroundColor : 0xffffff;

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    this.homeCameraPosition = { x: 0, y: -1295, z: 2576 };

    this.scene.add(this.camera);
    this.camera.position.set(this.homeCameraPosition.x, this.homeCameraPosition.y, this.homeCameraPosition.z);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.CSS3DRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.domElement.style.position = 'absolute';
    document.getElementById('worldmap').appendChild(this.renderer.domElement);

    // CONTROLS
    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    // LIGHT
    let light = new THREE.PointLight(0xffffff);

    light.position.set(0, 250, 0);
    this.scene.add(light);

    this.CSS3ObjectMap = new Map();

    this.createMap();

  }

  createMap() {
    let imageMap = document.createElement('div');

    imageMap.className = 'img-map';
    let img = document.createElement('img');

    img.src = './ressources/map.jpg';
    imageMap.appendChild(img);

    let object = new THREE.CSS3DObject(imageMap);

    this.scene.add(object);
  }

  getCamera() { return this.camera; }
  getRenderer() { return this.renderer; }

  run() { this._animate(); }

  _animate() {
    requestAnimationFrame(this._animate.bind(this));

    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    TWEEN.update();
  }

  addElementAtPosition(element, latitude, longitude) {
    let position = this.get2DPosition(latitude, longitude);
    let object = new THREE.CSS3DObject(element);

    object.position.x = position.x;
    object.position.y = position.y;
    object.position.z = 50;

    object.lookAt({ x: position.x, y: position.y - 400, z: 1000 });

    if (element.id) {
      this.CSS3ObjectMap.set(element.id, object);
    } else {
      console.warn("No Id found on element, It won't be possible to zoom in");
    }
    this.scene.add(object);
    return element;
  }

  centerOnElement(elementId) {
    const selectedObject = this.CSS3ObjectMap.get(elementId);

    if (!selectedObject) {
      console.warn("Can't find element id" + elementId);
      return;
    }
    const bb = this.getElementSize(selectedObject);

    this.moveTo(
      selectedObject.position.x + bb.w / 2,
      selectedObject.position.y,
      selectedObject.position.z + 300 + bb.h,

      selectedObject.position.x + bb.w / 2,
      selectedObject.position.y + 100,
      selectedObject.position.z + bb.h
    );

  }

  moveTo(positionx, positiony, positionz, targetx, targety, targetz) {

    const animationDuration = 1000;
    let from = {
      positionx: this.camera.position.x,
      positiony: this.camera.position.y,
      positionz: this.camera.position.z,
      targetx: this.controls.target.x,
      targety: this.controls.target.y,
      targetz: this.controls.target.z
    };

    let to = {
      positionx: positionx,
      positiony: positiony,
      positionz: positionz,
      targetx: targetx,
      targety: targety,
      targetz: targetz
    };

    new TWEEN.Tween(from).to(to, animationDuration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        this.camera.lookAt(from.targetx, from.targety, from.targetz);
        this.camera.position.set(from.positionx, from.positiony, from.positionz);
        this.controls.target.set(from.targetx, from.targety, from.targetz);

        this.camera.updateProjectionMatrix();
        this.controls.update();
      }).start();
  }

  get2DPosition(latitude, longitude) {
    // No need for precision for theses level of details. Linear tranformation is enough
    let x = ((planeWidth / 252.0) * (180 + longitude)) - planeWidth / 2 - 990;
    let y = -((planeHeight / 110.0) * (90 - latitude)) + planeHeight / 2 + 320;

    return { x, y };
  }

  getElementSize(element) {
    const w = $(element.element).width();
    const h = $(element.element).height();
    const x = $(element.element).x;
    const y = $(element.element).y;

    return { x, y, w, h };
  }

  home() {
    this.moveTo(
      this.homeCameraPosition.x,
      this.homeCameraPosition.y,
      this.homeCameraPosition.z,
      0,
      0,
      0
    );
  }
}

