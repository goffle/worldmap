(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("worldmap", [], factory);
	else if(typeof exports === 'object')
		exports["worldmap"] = factory();
	else
		root["worldmap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TrackballControls = __webpack_require__(2);

var _TrackballControls2 = _interopRequireDefault(_TrackballControls);

var _CSS3DRenderer = __webpack_require__(1);

var _CSS3DRenderer2 = _interopRequireDefault(_CSS3DRenderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var planeWidth = 3312;
var planeHeight = 1634;

var Engine = function () {
    function Engine(options) {
        _classCallCheck(this, Engine);

        console.log('Create Engine');

        // SCENE
        this.scene = new THREE.Scene();

        // CAMERA
        var VIEW_ANGLE = 45,
            ASPECT = window.innerWidth / window.innerHeight,
            NEAR = 0.1,
            FAR = 20000;
        var backgroundColor = options.backgroundColor ? options.backgroundColor : 0xffffff;

        this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

        this.scene.add(this.camera);
        this.camera.position.set(0, -801, 1804);

        this.camera.lookAt(this.scene.position);

        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.domElement.style.position = 'absolute';
        document.getElementById('worldmap').appendChild(this.renderer.domElement);

        // CONTROLS
        this.controls = new _TrackballControls2.default(this.camera, this.renderer.domElement);

        // LIGHT
        var light = new THREE.PointLight(0xffffff);

        light.position.set(0, 250, 0);
        this.scene.add(light);

        this.createMap();
    }

    _createClass(Engine, [{
        key: 'createMap',
        value: function createMap() {
            var imageMap = document.createElement('div');
            imageMap.className = 'img-map';
            var img = document.createElement('img');
            img.src = 'https://rawgit.com/goffle/worldmap/master/images/map.jpg';
            imageMap.appendChild(img);

            var object = new THREE.CSS3DObject(imageMap);

            this.scene.add(object);
        }
    }, {
        key: 'getCamera',
        value: function getCamera() {
            return this.camera;
        }
    }, {
        key: 'getRenderer',
        value: function getRenderer() {
            return this.renderer;
        }
    }, {
        key: 'run',
        value: function run() {
            this._animate();
        }
    }, {
        key: '_animate',
        value: function _animate() {
            requestAnimationFrame(this._animate.bind(this));

            this.renderer.render(this.scene, this.camera);
            this.controls.update();
            TWEEN.update();
        }
    }, {
        key: 'addElementAtPosition',
        value: function addElementAtPosition(element, latitude, longitude) {
            var position = this.get2DPosition(latitude, longitude);
            var object = new THREE.CSS3DObject(element);

            object.position.x = position.x;
            object.position.y = position.y;
            object.position.z = 50;

            object.lookAt({ x: position.x, y: position.y - 400, z: 1000 });

            this.scene.add(object);
        }
    }, {
        key: 'get2DPosition',
        value: function get2DPosition(latitude, longitude) {
            // No need for precision for theses level of details. Linear tranformation is enough
            var x = planeWidth / 330.0 * (180 + longitude) - planeWidth / 2 - 360;
            var y = -(planeHeight / 138.0 * (90 - latitude)) + planeHeight / 2 + 120;

            return { x: x, y: y };
        }
    }]);

    return Engine;
}();

exports.default = Engine;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
 * @author mrdoob / http://mrdoob.com/
 */

/* eslint-disable */

THREE.CSS3DObject = function (element) {

	THREE.Object3D.call(this);

	this.element = element;
	this.element.style.position = 'absolute';
	this.element.style.WebkitTransformStyle = 'preserve-3d';
	this.element.style.MozTransformStyle = 'preserve-3d';
	this.element.style.oTransformStyle = 'preserve-3d';
	this.element.style.transformStyle = 'preserve-3d';

	this.addEventListener('removed', function (event) {

		if (this.element.parentNode !== null) {

			this.element.parentNode.removeChild(this.element);

			for (var i = 0, l = this.children.length; i < l; i++) {

				this.children[i].dispatchEvent(event);
			}
		}
	});
};

THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype);

THREE.CSS3DSprite = function (element) {

	THREE.CSS3DObject.call(this, element);
};

THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype);

//

THREE.CSS3DRenderer = function () {

	console.log('THREE.CSS3DRenderer', THREE.REVISION);

	var _width, _height;
	var _widthHalf, _heightHalf;

	var matrix = new THREE.Matrix4();

	var domElement = document.createElement('div');
	domElement.style.overflow = 'hidden';

	domElement.style.WebkitTransformStyle = 'preserve-3d';
	domElement.style.MozTransformStyle = 'preserve-3d';
	domElement.style.oTransformStyle = 'preserve-3d';
	domElement.style.transformStyle = 'preserve-3d';

	this.domElement = domElement;

	var cameraElement = document.createElement('div');

	cameraElement.style.WebkitTransformStyle = 'preserve-3d';
	cameraElement.style.MozTransformStyle = 'preserve-3d';
	cameraElement.style.oTransformStyle = 'preserve-3d';
	cameraElement.style.transformStyle = 'preserve-3d';

	domElement.appendChild(cameraElement);

	this.setSize = function (width, height) {

		_width = width;
		_height = height;

		_widthHalf = _width / 2;
		_heightHalf = _height / 2;

		domElement.style.width = width + 'px';
		domElement.style.height = height + 'px';

		cameraElement.style.width = width + 'px';
		cameraElement.style.height = height + 'px';
	};

	var epsilon = function epsilon(value) {

		return Math.abs(value) < 0.000001 ? 0 : value;
	};

	var getCameraCSSMatrix = function getCameraCSSMatrix(matrix) {

		var elements = matrix.elements;

		return 'matrix3d(' + epsilon(elements[0]) + ',' + epsilon(-elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(elements[6]) + ',' + epsilon(elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(-elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(-elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
	};

	var getObjectCSSMatrix = function getObjectCSSMatrix(matrix) {

		var elements = matrix.elements;

		return 'translate3d(-50%,-50%,0) matrix3d(' + epsilon(elements[0]) + ',' + epsilon(elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(-elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(-elements[6]) + ',' + epsilon(-elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
	};

	var renderObject = function renderObject(object, camera) {

		if (object instanceof THREE.CSS3DObject) {

			var style;

			if (object instanceof THREE.CSS3DSprite) {

				// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

				matrix.copy(camera.matrixWorldInverse);
				matrix.transpose();
				matrix.copyPosition(object.matrixWorld);
				matrix.scale(object.scale);

				matrix.elements[3] = 0;
				matrix.elements[7] = 0;
				matrix.elements[11] = 0;
				matrix.elements[15] = 1;

				style = getObjectCSSMatrix(matrix);
			} else {

				style = getObjectCSSMatrix(object.matrixWorld);
			}

			var element = object.element;

			element.style.WebkitTransform = style;
			element.style.MozTransform = style;
			element.style.oTransform = style;
			element.style.transform = style;

			if (element.parentNode !== cameraElement) {

				cameraElement.appendChild(element);
			}
		}

		for (var i = 0, l = object.children.length; i < l; i++) {

			renderObject(object.children[i], camera);
		}
	};

	this.render = function (scene, camera) {

		var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * _height;

		domElement.style.WebkitPerspective = fov + "px";
		domElement.style.MozPerspective = fov + "px";
		domElement.style.oPerspective = fov + "px";
		domElement.style.perspective = fov + "px";

		scene.updateMatrixWorld();

		if (camera.parent === undefined) camera.updateMatrixWorld();

		camera.matrixWorldInverse.getInverse(camera.matrixWorld);

		var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) + " translate3d(" + _widthHalf + "px," + _heightHalf + "px, 0)";

		cameraElement.style.WebkitTransform = style;
		cameraElement.style.MozTransform = style;
		cameraElement.style.oTransform = style;
		cameraElement.style.transform = style;

		renderObject(scene, camera);
	};
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});
/**
 * @author Eberhard Graether / http://egraether.com/
 */

/* eslint-disable */

THREE.TrackballControls = function (object, domElement) {

		var _this = this;
		var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM: 4, TOUCH_PAN: 5 };

		this.object = object;
		this.domElement = domElement !== undefined ? domElement : document;

		// API

		this.enabled = true;

		this.screen = { left: 0, top: 0, width: 0, height: 0 };

		this.rotateSpeed = 1.0;
		this.zoomSpeed = 1.2;
		this.panSpeed = 0.3;

		this.noRotate = false;
		this.noZoom = false;
		this.noPan = false;
		this.noRoll = false;

		this.staticMoving = false;
		this.dynamicDampingFactor = 0.2;

		this.minDistance = 0;
		this.maxDistance = Infinity;

		this.keys = [65 /*A*/, 83 /*S*/, 68 /*D*/];

		// internals

		this.target = new THREE.Vector3();

		var lastPosition = new THREE.Vector3();

		var _state = STATE.NONE,
		    _prevState = STATE.NONE,
		    _eye = new THREE.Vector3(),
		    _rotateStart = new THREE.Vector3(),
		    _rotateEnd = new THREE.Vector3(),
		    _zoomStart = new THREE.Vector2(),
		    _zoomEnd = new THREE.Vector2(),
		    _touchZoomDistanceStart = 0,
		    _touchZoomDistanceEnd = 0,
		    _panStart = new THREE.Vector2(),
		    _panEnd = new THREE.Vector2();

		// for reset

		this.target0 = this.target.clone();
		this.position0 = this.object.position.clone();
		this.up0 = this.object.up.clone();

		// events

		var changeEvent = { type: 'change' };

		// methods

		this.handleResize = function () {

				if (this.domElement === document) {

						this.screen.left = 0;
						this.screen.top = 0;
						this.screen.width = window.innerWidth;
						this.screen.height = window.innerHeight;
				} else {

						this.screen = this.domElement.getBoundingClientRect();
				}
		};

		this.handleEvent = function (event) {

				if (typeof this[event.type] == 'function') {

						this[event.type](event);
				}
		};

		this.getMouseOnScreen = function (clientX, clientY) {

				return new THREE.Vector2((clientX - _this.screen.left) / _this.screen.width, (clientY - _this.screen.top) / _this.screen.height);
		};

		this.getMouseProjectionOnBall = function (clientX, clientY) {

				var mouseOnBall = new THREE.Vector3((clientX - _this.screen.width * 0.5 - _this.screen.left) / (_this.screen.width * .5), (_this.screen.height * 0.5 + _this.screen.top - clientY) / (_this.screen.height * .5), 0.0);

				var length = mouseOnBall.length();

				if (_this.noRoll) {

						if (length < Math.SQRT1_2) {

								mouseOnBall.z = Math.sqrt(1.0 - length * length);
						} else {

								mouseOnBall.z = .5 / length;
						}
				} else if (length > 1.0) {

						mouseOnBall.normalize();
				} else {

						mouseOnBall.z = Math.sqrt(1.0 - length * length);
				}

				_eye.copy(_this.object.position).sub(_this.target);

				var projection = _this.object.up.clone().setLength(mouseOnBall.y);
				projection.add(_this.object.up.clone().cross(_eye).setLength(mouseOnBall.x));
				projection.add(_eye.setLength(mouseOnBall.z));

				return projection;
		};

		this.rotateCamera = function () {

				var angle = Math.acos(_rotateStart.dot(_rotateEnd) / _rotateStart.length() / _rotateEnd.length());

				if (angle) {

						var axis = new THREE.Vector3().crossVectors(_rotateStart, _rotateEnd).normalize(),
						    quaternion = new THREE.Quaternion();

						angle *= _this.rotateSpeed;

						quaternion.setFromAxisAngle(axis, -angle);

						_eye.applyQuaternion(quaternion);
						_this.object.up.applyQuaternion(quaternion);

						_rotateEnd.applyQuaternion(quaternion);

						if (_this.staticMoving) {

								_rotateStart.copy(_rotateEnd);
						} else {

								quaternion.setFromAxisAngle(axis, angle * (_this.dynamicDampingFactor - 1.0));
								_rotateStart.applyQuaternion(quaternion);
						}
				}
		};

		this.zoomCamera = function () {

				if (_state === STATE.TOUCH_ZOOM) {

						var factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
						_touchZoomDistanceStart = _touchZoomDistanceEnd;
						_eye.multiplyScalar(factor);
				} else {

						var factor = 1.0 + (_zoomEnd.y - _zoomStart.y) * _this.zoomSpeed;

						if (factor !== 1.0 && factor > 0.0) {

								_eye.multiplyScalar(factor);

								if (_this.staticMoving) {

										_zoomStart.copy(_zoomEnd);
								} else {

										_zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor;
								}
						}
				}
		};

		this.panCamera = function () {

				var mouseChange = _panEnd.clone().sub(_panStart);

				if (mouseChange.lengthSq()) {

						mouseChange.multiplyScalar(_eye.length() * _this.panSpeed);

						var pan = _eye.clone().cross(_this.object.up).setLength(mouseChange.x);
						pan.add(_this.object.up.clone().setLength(mouseChange.y));

						_this.object.position.add(pan);
						_this.target.add(pan);

						if (_this.staticMoving) {

								_panStart = _panEnd;
						} else {

								_panStart.add(mouseChange.subVectors(_panEnd, _panStart).multiplyScalar(_this.dynamicDampingFactor));
						}
				}
		};

		this.checkDistances = function () {

				if (!_this.noZoom || !_this.noPan) {

						if (_eye.lengthSq() > _this.maxDistance * _this.maxDistance) {

								_this.object.position.addVectors(_this.target, _eye.setLength(_this.maxDistance));
						}

						if (_eye.lengthSq() < _this.minDistance * _this.minDistance) {

								_this.object.position.addVectors(_this.target, _eye.setLength(_this.minDistance));
						}
				}
		};

		this.update = function () {

				_eye.subVectors(_this.object.position, _this.target);

				if (!_this.noRotate) {

						_this.rotateCamera();
				}

				if (!_this.noZoom) {

						_this.zoomCamera();
				}

				if (!_this.noPan) {

						_this.panCamera();
				}

				_this.object.position.addVectors(_this.target, _eye);

				_this.checkDistances();

				_this.object.lookAt(_this.target);

				if (lastPosition.distanceToSquared(_this.object.position) > 0) {

						_this.dispatchEvent(changeEvent);

						lastPosition.copy(_this.object.position);
				}
		};

		this.reset = function () {

				_state = STATE.NONE;
				_prevState = STATE.NONE;

				_this.target.copy(_this.target0);
				_this.object.position.copy(_this.position0);
				_this.object.up.copy(_this.up0);

				_eye.subVectors(_this.object.position, _this.target);

				_this.object.lookAt(_this.target);

				_this.dispatchEvent(changeEvent);

				lastPosition.copy(_this.object.position);
		};

		// listeners

		function keydown(event) {

				if (_this.enabled === false) return;

				window.removeEventListener('keydown', keydown);

				_prevState = _state;

				if (_state !== STATE.NONE) {

						return;
				} else if (event.keyCode === _this.keys[STATE.ROTATE] && !_this.noRotate) {

						_state = STATE.ROTATE;
				} else if (event.keyCode === _this.keys[STATE.ZOOM] && !_this.noZoom) {

						_state = STATE.ZOOM;
				} else if (event.keyCode === _this.keys[STATE.PAN] && !_this.noPan) {

						_state = STATE.PAN;
				}
		}

		function keyup(event) {

				if (_this.enabled === false) return;

				_state = _prevState;

				window.addEventListener('keydown', keydown, false);
		}

		function mousedown(event) {

				if (_this.enabled === false) return;

				event.preventDefault();
				event.stopPropagation();

				if (_state === STATE.NONE) {

						_state = event.button;
				}

				if (_state === STATE.ROTATE && !_this.noRotate) {

						_rotateStart = _this.getMouseProjectionOnBall(event.clientX, event.clientY);
						_rotateEnd.copy(_rotateStart);
				} else if (_state === STATE.ZOOM && !_this.noZoom) {

						_zoomStart = _this.getMouseOnScreen(event.clientX, event.clientY);
						_zoomEnd.copy(_zoomStart);
				} else if (_state === STATE.PAN && !_this.noPan) {

						_panStart = _this.getMouseOnScreen(event.clientX, event.clientY);
						_panEnd.copy(_panStart);
				}

				document.addEventListener('mousemove', mousemove, false);
				document.addEventListener('mouseup', mouseup, false);
		}

		function mousemove(event) {

				if (_this.enabled === false) return;

				event.preventDefault();
				event.stopPropagation();

				if (_state === STATE.ROTATE && !_this.noRotate) {

						_rotateEnd = _this.getMouseProjectionOnBall(event.clientX, event.clientY);
				} else if (_state === STATE.ZOOM && !_this.noZoom) {

						_zoomEnd = _this.getMouseOnScreen(event.clientX, event.clientY);
				} else if (_state === STATE.PAN && !_this.noPan) {

						_panEnd = _this.getMouseOnScreen(event.clientX, event.clientY);
				}
		}

		function mouseup(event) {

				if (_this.enabled === false) return;

				event.preventDefault();
				event.stopPropagation();

				_state = STATE.NONE;

				document.removeEventListener('mousemove', mousemove);
				document.removeEventListener('mouseup', mouseup);
		}

		function mousewheel(event) {

				if (_this.enabled === false) return;

				event.preventDefault();
				event.stopPropagation();

				var delta = 0;

				if (event.wheelDelta) {
						// WebKit / Opera / Explorer 9

						delta = event.wheelDelta / 40;
				} else if (event.detail) {
						// Firefox

						delta = -event.detail / 3;
				}

				_zoomStart.y += delta * 0.01;
		}

		function touchstart(event) {

				if (_this.enabled === false) return;

				switch (event.touches.length) {

						case 1:
								_state = STATE.TOUCH_ROTATE;
								_rotateStart = _rotateEnd = _this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY);
								break;

						case 2:
								_state = STATE.TOUCH_ZOOM;
								var dx = event.touches[0].pageX - event.touches[1].pageX;
								var dy = event.touches[0].pageY - event.touches[1].pageY;
								_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(dx * dx + dy * dy);
								break;

						case 3:
								_state = STATE.TOUCH_PAN;
								_panStart = _panEnd = _this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY);
								break;

						default:
								_state = STATE.NONE;

				}
		}

		function touchmove(event) {

				if (_this.enabled === false) return;

				event.preventDefault();
				event.stopPropagation();

				switch (event.touches.length) {

						case 1:
								_rotateEnd = _this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY);
								break;

						case 2:
								var dx = event.touches[0].pageX - event.touches[1].pageX;
								var dy = event.touches[0].pageY - event.touches[1].pageY;
								_touchZoomDistanceEnd = Math.sqrt(dx * dx + dy * dy);
								break;

						case 3:
								_panEnd = _this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY);
								break;

						default:
								_state = STATE.NONE;

				}
		}

		function touchend(event) {

				if (_this.enabled === false) return;

				switch (event.touches.length) {

						case 1:
								_rotateStart = _rotateEnd = _this.getMouseProjectionOnBall(event.touches[0].pageX, event.touches[0].pageY);
								break;

						case 2:
								_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
								break;

						case 3:
								_panStart = _panEnd = _this.getMouseOnScreen(event.touches[0].pageX, event.touches[0].pageY);
								break;

				}

				_state = STATE.NONE;
		}

		this.domElement.addEventListener('contextmenu', function (event) {
				event.preventDefault();
		}, false);

		this.domElement.addEventListener('mousedown', mousedown, false);

		this.domElement.addEventListener('mousewheel', mousewheel, false);
		this.domElement.addEventListener('DOMMouseScroll', mousewheel, false); // firefox

		this.domElement.addEventListener('touchstart', touchstart, false);
		this.domElement.addEventListener('touchend', touchend, false);
		this.domElement.addEventListener('touchmove', touchmove, false);

		window.addEventListener('keydown', keydown, false);
		window.addEventListener('keyup', keyup, false);

		this.handleResize();
};

THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);

exports.default = THREE.TrackballControls;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _engine = __webpack_require__(0);

var _engine2 = _interopRequireDefault(_engine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function worldmap() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, worldmap);

    this._name = 'worldmap';
    this._engine = new _engine2.default(options);

    this._engine.run();
  }

  _createClass(worldmap, [{
    key: 'addElementAtPosition',
    value: function addElementAtPosition(element, latitude, longitude) {
      this._engine.addElementAtPosition(element, latitude, longitude);
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }]);

  return worldmap;
}();

/***/ })
/******/ ]);
});
//# sourceMappingURL=worldmap.js.map