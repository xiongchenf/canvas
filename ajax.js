(function(win){
function createXHR() {
	if(typeof XMLHttpRequest != undefined) {
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != undefined) {
		var version = [
			'MSXML2.XMLHttp.6.0',
			'MSXML2.XMLHttp.3.0',
			'MSXML2.XMLHttp'
		];
		for(var i = 0; i < version.length; i++) {
			try{
				return new ActiveXObject(version[i]);
			}catch (e){
				alert('请求失败，请尝试更换浏览器使用。');
			}
		}
	}else {
		throw new Error('您的浏览器不支持XMLHttpRequest对象。');
	}
}

var Ajax = function(obj) {
	var xhr = createXHR();
	obj.url = obj.url +'?rand='+ Math.random();
	if(obj.method === 'get') {
		obj.url += '&'+ formatData(obj.data);
	}
	if(obj.async === true) {
		callback();
	} else {
		xhr.onreadystatechange = function() {
			callback();
		};
	}
	xhr.open(method, url, async);
	if(obj.method === 'post') {
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.send(obj.data);
	}else {
		xhr.send(null);
	}

	function callback() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				obj.success(xhr.responseText);
			} else {
				obj.error({statr: xhr.status, message: xhr.responseText});
				alert('获取数据失败：错误代码: '+ xhr.status + ', 错误信息'+ xhr.statusText);
			}
		}
	}
}

win.Ajax = Ajax;

function formatData(data) {
	var arr = [];
	for(var i in data) {
		arr.push(encodeURIComponent(i) +"="+ encodeURIComponent(data[i]));
	}
	return	arr.join('&');
}
})(window)
