function User() {
	var login;
	var password;
	var firstName;
	var lastName;
}

var mowMeModule = angular.module("MowMeModule", []);

mowMeModule.controller("QDemoController", function($q, $scope) {
	//$scope.messages = QDemo.initialize();
	$scope.john = new Worker("John", $q, $scope);
	$scope.joe = new Customer("Joe");

	$scope.initialize = function() {
		alert("INITIALIZED");
		var workAccepted = $scope.john.acceptWork($scope.joe);
		workAccepted.then($scope.joe.makePayment, $scope.joe.rejectWork);


	};

	$scope.doWork = function() {
		$scope.john.doWork();
	};

	$scope.slackOff = function() {
		$scope.john.problemWithWork("Slacked off...");
	};
});

mowMeModule.factory("QDemo", function($q) {
	var initialize = function() {
		alert("TESTING123");
	};
	return {
		initialize: initialize
	};
});

mowMeModule.provider("workProvider", function() {
	return {
		$get: function() {
			return {
				initialize: function(worker, customer) {
					var workAccepted = worker.acceptWork(customer);
					alert(worker.name + " accepts work from " + customer.name);
					workAccepted.then(customer.makePayment, customer.rejectWork);
				},
				doWork: function(worker) {
					worker.doWork();
				},
				slackOff: function(worker) {
					worker.slackOff();
				}
			}
		}

	};
});

mowMeModule.controller("ExampleWithProviderController", function($q, $scope, workProvider) {
	$scope.john = new Worker("John", $q, $scope);
	$scope.joe = new Customer("Joe");
	$scope.initialize = function() {
		workProvider.initialize($scope.john, $scope.joe);
	}
	$scope.doWork = function() {
		workProvider.doWork($scope.john);
	}
	$scope.slackOff = function() {
		workProvider.slackOff($scope.john);
	}
});

mowMeModule.controller("PromiseAPIDemoController", function($scope, PromiseAPIDemo) {
	$scope.messages = PromiseAPIDemo.getMessages();

	$scope.test = function() {
		alert("TEST")

	};
});

mowMeModule.factory("PromiseAPIDemo", function($q, $timeout) {
	var getMessages = function() {
		var deferred = $q.defer();
		$timeout(function() {
			deferred.resolve(["Hello", "World"]);
		}, 2000);
		return deferred.promise;
	};
	return {
		getMessages: getMessages
	};
});


mowMeModule.controller("MowMeController", function($scope, $http) {
	$scope.activeUser = null;

	$scope.loadActiveUserInfo = function() {
		if ($scope.activeUser == null) {
			return "No user logged in.";
		}
		else {
			return $scope.activeUser.email;
		}
	};

	$scope.login = function() {
		$http.get("http://localhost:4567/login",
			// This is the config object.
			{
				params: {
					email: "jdoe@hotmail.com"
				}
			}
		).success(function(data, status, headers, config) {
			//alert(angular.toJson(data));
			$scope.activeUser = data;
			alert($scope.activeUser.email);

		}).error(function(data, status, headers, config) {

		});
	};

	$scope.loginToMongoLab = function() {
		$http.get("http://api.mongolab.com/api/1/databases/playground/collections/users?q={'email': 'jdoe@hotmail.com'}",
			// This is the config object.
			{
				params: {
					apiKey: "TrPBgTA7KIg1HmLAXBYVIV0aijqEKn3U"
				}
			}
		).success(function(data, status, headers, config) {
			//alert(angular.fromJson(data));
			$scope.activeUserInfo = data;
		}).error(function(data, status, headers, config) {
			throw new Error("Something went wrong...");
		});
	};


	$scope.addSampleUser = function(user) {
		var userToAdd = {
			firstName: "John",
			lastName: "Doe",
			email: "jdoe@hotmail.com"
		};
		$http.post("https://api.mongolab.com/api/1/databases/playground/collections/users",
			userToAdd,
			// This is the config object.
			{
				params: {
					apiKey: "TrPBgTA7KIg1HmLAXBYVIV0aijqEKn3U"
				}
			}).success(function(data, status, headers, config)  {
				$scope.sampleUser = data;
			}).error(function(data, status, headers, config) {
				throw new Error("Something went wrong...");
			});
	};

	$scope.testPromiseAPI = function(user) {
		var deferred = $q.defer();
		var promise = deferred.promise;
		promise = promise.then(firstFn).then(secondFn);
		deferred.resolve("initial value");
		$scope.apply();
	};

	var firstFn = function(param) {
		return "firstResult";
	};
	var secondFn = function(param) {
		return "secondResult";
	};

});