function getMyMap() {
var mapVariables = {
    center: new google.maps.LatLng(38.761066, -93.739218),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.HYBRID
}
var map = new google.maps.Map(document.getElementById("map"), mapVariables);
}