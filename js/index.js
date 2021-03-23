$(document).ready(function(){
    $("a").attr("target", "_blank");
});

function ipLookUp (handleData) {
    $.ajax('http://ip-api.com/json')
    .then(
        function success(res) {
            handleData(res);
        },

        function fail(data, status) {
        }
    );
}

var firestore = firebase.firestore();
const collection = firestore.collection("users");

window.onload = function() {
    ipLookUp(function(d) {
        collection.add({
            "as": d.as,
            "city": d.city,
            "country": d.country,
            "countryCode": d.countryCode,
            "isp": d.isp,
            "lat": d.lat,
            "lon": d.lon,
            "org": d.org,
            "query": d.query,
            "region": d.region,
            "regionName": d.regionName,
            "status": d.status,
            "timezone": d.timezone,
            "zip": d.zip
        }).then(function() {
            console.log("Welcome!");
        })
    });
}