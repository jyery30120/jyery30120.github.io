var mymap = L.map('mapid').setView([25.02605, 121.5436], 13);

	var greenIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	var redIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	var yellowIcon = new L.Icon({
		iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41]
	});

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1
	}).addTo(mymap);
	
	$.get('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',function(e){
    e.forEach(function(o){
        if (o["sbi"] === 0) {
			L.marker([o["lat"], o["lng"]], {icon: redIcon}).addTo(mymap)
	 	.bindPopup('<b>' + o["sna"] + '<b>' + '<br>總停車格: ' +  o['tot'] +"<br/>目前車輛數量: " + o['sbi'] + "<br>空位數量: " + o['bemp'] ).openPopup();
		}
		else if (o["sbi"] < 5){
			L.marker([o["lat"], o["lng"]], {icon: yellowIcon}).addTo(mymap)
	 	.bindPopup('<b>' + o["sna"] + '<b>'  + '<br>總停車格: ' +  o['tot'] + "<br/>目前車輛數量: " + o['sbi'] + "<br>空位數量: " + o['bemp'] ).openPopup();
		}else{
			L.marker([o["lat"], o["lng"]], {icon: greenIcon}).addTo(mymap)
	 	.bindPopup('<b>' + o["sna"] + '<b>'  + '<br>總停車格: ' +  o['tot'] + "<br/>目前車輛數量: " + o['sbi'] + "<br>空位數量: " + o['bemp'] ).openPopup();
		}
		
      });
    });


	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}

	mymap.on('click', onMapClick);