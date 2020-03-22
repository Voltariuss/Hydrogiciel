function ajax(type, url, params, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.responseType = "json";
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			callback(xhr.response);
		}
	}
	let s = "";
	for(let attr in params) s += attr+"="+params[attr]+"&";
	xhr.send(s); 
}