var Worker = function(name, $q, $rootScope) {
	this.name = name;
	this.currentWork;

	this.acceptWork = function(customer) {
		this.currentWork = {
			deferred: $q.defer(),
			customer: customer,
			status: 0
		};
		return this.currentWork.deferred.promise;
	};

	this.doWork = function() {
		if (this.currentWork == null) {
			alert("No work!");
			return;
		}
		this.currentWork.deferred.resolve(this.currentWork.customer);
	};

	this.problemWithWork = function(reason) {
		if (this.currentWork == null) {
			alert("No work!");
			return;
		}
		this.currentWork.deferred.reject(reason);
	};
};