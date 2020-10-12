/******************* 전역설정 ********************/
var appid = '02efdd64bdc14b279bc91d9247db4722';
var dailyURL = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyURL = 'https://api.openweathermap.org/data/2.5/forecast';
var sendData = { units: 'metric', lang: 'kr', appid: appid }

/************** 카카오 지도 연동 **************/
// 1. 지도를 화면에 생성한다.
// 2. 도시정보를 불러와서 openweathermap에 정보를 요청한다.
// 3. 콜백된 각 도시의 날씨정보를 기존에 생성한 지도에 나타낸다.
var container, options, map;
container = document.getElementById('map');
options = {
	center: new kakao.maps.LatLng(35.823107, 127.44),
	level: 13
};
map = new kakao.maps.Map(container, options);
map.setDraggable(false);
map.setZoomable(false);
// map.addOverlayMapTypeId(kakao.maps.MapTypeId.TERRAIN);

$.get('../json/city.json', onGetCity);
function onGetCity(r) {
	//console.log(r);
	r.cities.forEach(function(v, i){
		sendData.lat = v.lat;
		sendData.lon = v.lon;
		$.get(dailyURL, sendData, onGetDaily);
		$("#city").append('<option value="'+v.id+'">'+v.name+'</option>'); //city-d option-g append

	});
}
function onGetDaily(r) {
	//console.log(r);
	var icon = 'https://openweathermap.org/img/wn/'+r.weather[0].icon+'@2x.png';
	var html;
	if(r.id == 1835848 || r.id == 1841811) html = '<div class="custom-window lt">';
	else if(r.id == 1841066 || r.id == 1843564) html = '<div class="custom-window rt">';
	else html = '<div class="custom-window">';
	html += '<img src="'+icon+'" style="width: 40px;">';
	html += '<div><b>온도 '+r.main.temp+'℃<br>체감 '+r.main.feels_like+'<b>℃ </div>';
	html += '<img src="../img/triangle.png" class="triangle">'
	html += '</div>';
	var position = new kakao.maps.LatLng(r.coord.lat, r.coord.lon);
	var customWindow = new kakao.maps.CustomOverlay({
			position : position,
			content : html
	});
	customWindow.setMap(map);
}


/* **************weathet ino of current location******************* */
navigator.geolocation.getCurrentPosition(onGetPositon, onErrorPosition); //onGetPositon - medeelel awchirwl, onErrorPosition - awchirch chadhq bol
function onGetPositon(r) {
	//console.log(r);
	sendData.lat = r.coords.latitude;
	sendData.lon = r.coords.longitude;
	$.get(dailyURL, sendData, onGetDailyWeather);
	$.get(weeklyURL, sendData, onGetWeeklyWeather);
}
function onErrorPosition(e) {
	console.log(e);
}
function onGetDailyWeather(r) {
	console.log(r);
	 var dt = new Date(r.dt * 1000); //초단위 1970년부터 지금 까지 초 (js 초, java 밀리초)
	 console.log(dt);
}
function onGetWeeklyWeather(r) {
	console.log(r);
}

