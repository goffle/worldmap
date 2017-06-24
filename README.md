# 3D World map
A framework for 3D world map flat visualization in the browser

[![](https://cloud.githubusercontent.com/assets/7415400/25794250/b13929e0-3402-11e7-8999-24dd914f474c.gif)](https://goffle.github.io/example3)


# Examples
* Basic Exemple : [code](https://github.com/goffle/worldmap/tree/master/example/basic) ,        [live demo](https://goffle.github.io/example4/)
* Linkedin Office locations : [code](https://github.com/goffle/worldmap/tree/master/example/linkedin) ,        [live demo](https://goffle.github.io/example3/)

# Getting started


The first step is to add the latest worldmap distribution to your website:
```javascript
<script src="path/to/worldmap.min.js"></script>
```
From there you will have access to map object

You'll also want to add a HTML element that you want to contain your worldmap visualisation:
```javascript
	<div id="worldmap"></div>
```

Code example


```javascript
	<script>
		var map = new worldmap();
		map.addElementAtPosition($('<div class=poi id="1"><img src=./ressources/cathedral-of-saint-basil.png style="width: 200px;"></div>')[0], 55.679850, 37.580286);
		map.addElementAtPosition($('<div class=poi id="2"><img src=./ressources/christ-the-redeemer.png style="width: 200px;"></div>')[0], -22.951995, -43.211131);
		map.addElementAtPosition($('<div class=poi id="3"><img src=./ressources/eiffel-tower.png style="width: 200px;"></div>')[0], 48.860419, 2.294340);
		map.addElementAtPosition($('<div class=poi id="4"><img src=./ressources/petronas-towers.png style="width: 200px;"></div>')[0], 3.157964, 101.711611);
		map.addElementAtPosition($('<div class=poi id="5"><img src=./ressources/statue-of-liberty.png style="width: 200px;"></div>')[0], 40.689746, -74.045305);
		map.addElementAtPosition($('<div class=poi id="6"><img src=./ressources/sydney-opera-house.png style="width: 200px;"></div>')[0], -33.856847, 151.215522);


		setTimeout(function () {
			[].forEach.call($('.poi'), function (v, i, a) {
				v.onclick = function () { map.centerOnElement(this.id) };
			});
		}, 1000);
	</script>
```
