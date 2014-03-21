var G = 0;
var toggle = true;

$(document).ready(function () {
	chrome.storage.sync.get(['G','toggle'], function(obj) {
		G = obj['G'];
		$("#G").val(G*10);
		$('p').text(G);
		
		toggle = obj['toggle'];
		$("#toggle").prop('checked', toggle);
		
		window.onmousemove = function () {
			$('p').text($("#G").val() / 10);
		}
		window.onmouseup  = save;
		window.onmouseout = save;
	});
});

function save() {
	var newG = $("#G").val() / 10;
	if(G != newG) {
		G = newG;
		chrome.storage.sync.set({'G': G}, function() {
			console.log(chrome.runtime.lastError.message);
		});
	}
	
	var newToggle = $("#toggle").prop('checked');
	if(newToggle != toggle) {
		toggle = newToggle;
		chrome.storage.sync.set({'toggle': toggle}, function() {
			console.log(chrome.runtime.lastError.message);
		});
	}
}