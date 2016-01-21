var app = angular.module('app', []);
	app.controller('trackingController', ['$scope', '$window', '$interval',function($scope, $window, $interval) {

		//console.log($window.innerHeight)

		$scope.logVal = function() {
			console.log(11111);
		}

		$scope.navTemplate = [
			{
				name: 'Main',
				link: '#'
			},
			{
				name: 'Try It',
				link: '#'
			},
			{
				name: 'How It Works',
				link: '#'
			},
			{
				name: 'Hamburger',
				link: '#'
			},
		];

		$scope.paragraphTemplate = [
			{
				header: 'Hipsters',
				img:  'http://placehold.it/300x150',
				content: "Beard bespoke meggings tote bag, you probably haven't heard of them jean shorts church-key butcher biodiesel dreamcatcher banjo migas. VHS disrupt taxidermy, cronut flannel tote bag messenger bag chicharrones. Green juice pitchfork williamsburg synth, locavore fixie dreamcatcher skateboard actually biodiesel irony. Bicycle rights scenester kickstarter actually crucifix, freegan locavore health goth cliche etsy. Pour-over cardigan literally letterpress twee stumptown. Listicle sriracha pinterest roof party skateboard, trust fund mixtape migas helvetica brunch hoodie VHS. Etsy quinoa lumbersexual, migas chambray seitan neutra man bun."
			},
			{
				header: 'Pirates',
				img:  'http://placehold.it/300x150',
				content: "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters."
			},
			{
				header: 'Bacon',
				img:  'http://placehold.it/300x150',
				content: 'Venison salami jerky turkey turducken cupim sirloin pork belly beef porchetta tongue landjaeger. Picanha pork loin ball tip kevin turducken capicola. Kevin pork belly tongue, strip steak jowl biltong alcatra short loin ham sausage turkey. Pork belly biltong meatball bresaola shankle ball tip, pig shank flank beef ribs spare ribs. Strip steak tri-tip kielbasa leberkas salami chicken andouille sirloin short ribs chuck.'
			},
		]



		$scope.tracking = {
			scrollTracking : {
				pageHeight : 1533,
				maxScroll : 0,
				scrollPercent : 0,
				scrollDistance : 0,
				lastScrollPosition : 0,
				calculatePercent : function() {
					$scope.tracking.scrollTracking.scrollPercent = $scope.tracking.scrollTracking.maxScroll / $scope.tracking.scrollTracking.pageHeight * 100;
					//console.log($scope.tracking.scrollTracking.scrollPercent)
				},
				increaseScrollDistance : function(windowPosition) {
					$scope.tracking.scrollTracking.scrollDistance += Math.abs($scope.tracking.scrollTracking.lastScrollPosition - windowPosition);
					//console.log($scope.tracking.scrollTracking.scrollDistance)
				}
			},
			timeTracking : {
				timeOnPage: 0,
				timeUntilClick: 0,

			},
			elementTracking : [
				{
					name: 'navbar',
					bottom: 45,
					viewed: false,
				},
				{
					name: 'jumbotron',
					bottom: 355,
					viewed: false
				},
				{
					name: 'sign-up-link',
					bottom: 395,
					viewed: false
				},
				{
					name: 'section-1-header',
					bottom: 460,
					viewed: false,
				},
				{
					name: 'section-1-image',
					bottom: 630,
					viewed: false
				},
				{
					name: 'section-1-text',
					bottom: 825,
					viewed: false
				},
				{
					name: 'section-2-header',
					bottom: 865,
					viewed: false
				},
				{
					name: 'section-2-image',
					bottom: 1040,
					viewed: false
				},
				{
					name: 'section-2-text',
					bottom: 1130,
					viewed: false
				},
				{
					name: 'section-3-header',
					bottom: 1165,
					viewed: false
				},
				{
					name: 'section-3-image',
					bottom: 1340,
					viewed: false
				},
				{
					name: 'section-3-text',
					bottom: 1465,
					viewed: false
				}
			]
		}

		$scope.tracking.elementTracking.forEach(function(val,i,arr) {
			arr[i].viewTime = 0;
		})

		var second;
		second = $interval(function() {
				$scope.tracking.timeTracking.timeOnPage++;
				$scope.tracking.elementTracking.forEach(function(val,i,arr) {
					if ( arr[i].bottom > $window.pageYOffset && arr[i].bottom < $window.pageYOffset + $window.innerHeight) {
						arr[i].viewTime++;
					}
				})	
		},
		1000);

		$scope.checkViewed = function() {
			$scope.tracking.elementTracking.forEach(function(val,i,arr){
            	//console.log(arr[i].name + " : " + (arr[i].bottom <= $scope.tracking.scrollTracking.maxScroll))
            	if (arr[i].bottom <= $scope.tracking.scrollTracking.maxScroll) {
            		if (arr[i].viewed == false) {
            			console.log(arr[i].name)
            		}
            		arr[i].viewed = true;
            	}
            })
		};



		$scope.tracking.scrollTracking.maxScroll = $window.innerHeight;
		$scope.checkViewed();

		


	}]);

app.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            var bottomOfWindow = this.pageYOffset + this.innerHeight;
            //console.log(bottomOfWindow, scope.tracking.scrollTracking.maxScroll);
            if (bottomOfWindow > scope.tracking.scrollTracking.maxScroll) {
            	scope.tracking.scrollTracking.maxScroll = bottomOfWindow;
            }
            scope.checkViewed();
            scope.tracking.scrollTracking.calculatePercent()
            scope.tracking.scrollTracking.increaseScrollDistance(bottomOfWindow);
            scope.tracking.scrollTracking.lastScrollPosition = bottomOfWindow;
            scope.$apply();
        });
    };
});