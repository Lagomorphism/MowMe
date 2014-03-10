var Customer = function(name) {
	this.name = name;

	this.makePayment = function(worker) {
		alert("Payment made!");
	};

	this.rejectWork = function(worker) {
		alert("Work rejected!");
	};

};