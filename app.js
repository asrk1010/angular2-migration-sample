var module = angular.module('Brewery', []);
module.factory('BreweryService', function(){
	return {
		getBeers : function(){
			return [
				{name:'Heinekken', note: 0, description:'Heineken International est un groupe brassicole d’origine néerlandaise fondé en 1873 par Gerard Adriaan Heineken. C’est en 2011 le 3e brasseur au niveau mondial3, avec une part de marché en volume de 8,8 %, derrière Anheuser-Busch InBev (18,3 %) et SABMiller (9,8 %)4.'},
				{name:'Leffe', note: 2.5, description:'La Leffe (ou Abbaye de Leffe) est une bière belge d\'Abbaye reconnue.'},
				{name:'Chouffe', note: 4, description:'La Chouffe est une bière blonde belge. Elle est produite par la brasserie d\'Achouffe, dans le village du même nom, en province de Luxembourg. Elle fait partie des « blondes des Ardennes ».'},
				{name:'Cuvée des Jonquilles', note: 4.5, description:'La Brasserie Au Baron, propriété de la famille Bailleux est située à Gussignies dans le département du Nord.'},
				{name:'Moinette', note: 4, description:'La Brasserie Dupont est une entreprise belge établie à Tourpes dans la commune de Leuze-en-Hainaut, au centre du Hainaut occidental.'},
				{name:'Saint Feuillien', note: 4, description:'La St Feuillien est une bière belge d\'Abbaye reconnue produite au Rœulx (province de Hainaut) dans la brasserie St-Feuillien appelée aussi brasserie Friart.'}
			];
		},

		getOnePinte : function(beer){
			alert('The pint ' + beer.name + ' is almost ready !');
		}
	}
});
module.controller('BreweryCtrl', ['$scope', 'BreweryService', function($scope, BreweryService){
	$scope.beers = BreweryService.getBeers();
}]);
module.filter('NoteFilter', function(){
	return function(value){
		return value > 3 ? 'glyphicon glyphicon-heart' : '';
	};
})
module.directive('beerItem', ['BreweryService', function(){
	return {
		restrict: 'E',
		scope: {
			beer: '='
		},
		template: '<div class="col-md-4 panel panel-default">' +
				'<div class="panel-heading">' +
					'<span ng-class="beer.note | NoteFilter"></span>{{beer.name}}</div>' +
					'<div class="panel-body">' +
						'{{beer.description}}' +
					'</div>' +
					'<button ng-click="selectBeer()" class="btn btn-primary">Give me a pinte !</button>' +
				'</div>',
		controller: ['$scope', 'BreweryService', function($scope, BreweryService){
			$scope.selectBeer = function(){
				BreweryService.getOnePinte($scope.beer);
			};
		}]
	};
}]);
