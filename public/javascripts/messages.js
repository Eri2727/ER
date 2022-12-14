$(document).ready(function () {
	console.log('READY')
	setTimeout(() => {
		$('#chatBox').animate({ scrollTop: $('#messageItems').height() }, 100)
	}, 300);

});