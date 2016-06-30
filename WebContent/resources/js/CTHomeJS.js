function sendquestionOrTopic() {
	$.ajax({
		type : "GET",		
		url : "/ct/start-new-conversation",
		data : "topic=" +  encodeURIComponent(document.getElementById('questionOrTopic').value),		
		success : function(id) {			
			console.log(id);
			setTimeout(function(){ 
				window.location.href = "/ct/responses?conv_id=" + id;
				}, 1500);
		},
		error : function(e) {
			console.log("ERROR: ", e);
			console.log(e);
		},
		done : function(e) {
			console.log("DONE");
		}
	});
}
