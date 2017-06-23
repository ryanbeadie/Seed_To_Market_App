myApp.controller('PlannerController', ['$http', '$location', '$uibModal', '$log', 'seedService', 'plantService', function($http, $location, $uibModal, $log, seedService, plantService ) {
  var vm = this;

  vm.sortType     = 'crop'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSeeds   = '';     // set the default search/filter term

  // create the list of seeds
  vm.inventory = seedService.inventory;
  seedService.getSeeds();

  //hard code until get data from db
  vm.planted = {list: [{planted:"beans"},{planted:"corn"}]};


  //show/hide inventory table
  vm.isVisible = false;
  vm.showHide = function () {
   //If DIV is visible it will be hidden and vice versa.
   vm.isVisible = vm.isVisible ? false : true;
 };


  vm.open = function ( seed, size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-plant-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addPlantModalContent.html',
      controller: 'addPlantModalInstanceCtrl',
      controllerAs: 'apmic',
      size: size,
      appendTo: parentElem,
      resolve: {
        seed: function() {
          return seed;
        }
      }
    }); // end modalInstance
  }; // end newActivity

  vm.openHarvest = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-harvest-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addHarvestModalContent.html',
      controller: 'addHarvestModalInstanceCtrl',
      controllerAs: 'ahmic',
      size: size,
      appendTo: parentElem,
      resolve: {

      }
    }); // end modalInstance
  }; // end newActivity

}]);//end of PlannerController

//controller for PLANT modal
myApp.controller( 'addPlantModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'plantService', 'seed',function ( $uibModalInstance, $uibModal, $log, seedService, plantService, seed ) {
  var vm = this;

  vm.inventory = seedService.inventory;
  vm.crop = seed.crop;
  vm.variety = seed.variety;

  console.log( 'seed_id in modal:', seed.seed_id );
  console.log ('apmic controller inventory',vm.inventory);

  vm.addPlant = function(){
    var itemToSend = {
      seed_id: seed.seed_id,
      location: vm.location,
      date_planted: vm.date_planted,
      quantity: vm.quantity,
      area_sqft: vm.area_sqft,
      notes: vm.notes,
    };
    plantService.addPlant(itemToSend);
    console.log(itemToSend);

    $uibModalInstance.close();
  };//end add Item


  vm.clearPlantInputs = function (){
    vm.crop = '';
    vm.location = '';
    vm.date_planted = '';
    vm.quantity = '';
    vm.area_sqft = '';
    vm.notes = '';


    $uibModalInstance.close();
  };

  vm.clearPlantInputs();
}]);//end of addPlantModalInstanceCtrl controller

//conroller for HARVEST modal
myApp.controller( 'addHarvestModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'seedService', 'plantService', function ( $uibModalInstance, $uibModal, $log, seedService, plantService) {
  var vm = this;

  console.log ('ahmic controller inventory');

  vm.addHarvest = function(){
    var itemToSend = {
      seed_id: seed.seed_id,

    };
    // plantService.addPlant(itemToSend);
    console.log(itemToSend);

    $uibModalInstance.close();
  };//end add Item


  vm.clearHarvestInputs = function (){

    vm.location = '';

    $uibModalInstance.close();
  };

  vm.clearHarvestInputs();
}]);//end of addHarvestModalInstanceCtrl controller
