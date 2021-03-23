$(document).ready(function(){
    $("a").attr("target", "_blank");
});

function ipLookUp (handleData) {
    $.get("https://api.ipdata.co?api-key=test", function(response) {
        handleData(response);
    }, "jsonp");
}

var firestore = firebase.firestore();
const collection = firestore.collection("users");

window.onload = function() {
    ipLookUp(function(d) {
        collection.add({
            "asn_name": d.asn.name,
            "asn_domain": d.asn.domain,
            "current_time": d.time_zone.current_time,
            "country_code": d.country_code,
            "country_name": d.country_name,
            "city": d.city,
            "region": d.region,
            "region_code": d.region_code,
            "postal": d.postal,
            "ip": d.ip,
            "language_name": d.languages[0].name,
            "language_native": d.languages[0].native,
            "latitude": d.latitude,
            "longitude": d.longitude,
            "time_zone": d.time_zone.name,
            "z_threat_anonymous": d.threat.is_anonymous,
            "z_threat_bogon": d.threat.is_bogon,
            "z_threat_known_abuser": d.threat.is_known_abuser,
            "z_threat_known_attacker": d.threat.is_known_attacker,
            "z_threat_proxy": d.threat.is_proxy,
            "z_threat_threat": d.threat.is_threat,
            "z_threat_tor": d.threat.is_tor,
        }).then(function() {
            console.log("Welcome!");
        })
    });
}