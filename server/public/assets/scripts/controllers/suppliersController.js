myApp.controller('SuppliersController', ['$http','$location','$uibModal','$log','supplierService', function ($http, $location,$uibModal,$log,supplierService) {
  var vm = this;
  vm.suppliers = supplierService.suppliers;
  supplierService.getSuppliers();

  vm.sortType     = 'name'; // set the default sort type
  vm.sortReverse  = false;  // set the default sort order
  vm.searchSuppliers   = '';     // set the default search/filter term

  vm.open = function ( size, parentSelector ) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.add-supplier-modal' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'addSupplierModalContent.html',
      controller: 'addSupplierModalInstanceCtrl',
      controllerAs: 'asmc',
      size: size,
      appendTo: parentElem,
      resolve: {
      }
    }); // end modalInstance
  }; // end open
}]);


myApp.controller( 'addSupplierModalInstanceCtrl', [ '$uibModalInstance', '$uibModal', '$log', 'supplierService', function ( $uibModalInstance, $uibModal, $log, supplierService) {
  var vm = this;

  vm.addNewSupplier = function(){
    var itemToSend = {
      name: vm.name,
      website: vm.website,
      phone_number: vm.phone_number,
      address: vm.address,
      city: vm.city,
      state: vm.state,
      zip: vm.zip,
      description: vm.description
    };
    // check for empty fields
    if ( vm.name === '' || vm.website === '' || vm.phone_number === '' || vm.address === '' || vm.city === '' || vm.state === '' || vm.zip === '' ) {
      console.log( 'fields are empty' );
      swal({
        title: "Empty Fields!",
        text: "Please enter all necessary fields!",
        type: "error",
        confirmButtonText: "Ok"
      });
    } else {
      console.log(itemToSend);
      supplierService.addSupplier(itemToSend);
      $uibModalInstance.close();
      swal({
        title: "Supplier Added!",
        type: "success",
        confirmButtonText: "Ok"
      });
    }
  };//end add Item


  vm.clearSupplierInputs = function (){
    vm.name = '';
    vm.website = '';
    vm.phone_number = '';
    vm.address = '';
    vm.city = '';
    vm.state = '';
    vm.zip = '';
    vm.description = '';

    $uibModalInstance.close();
  };

  vm.clearSupplierInputs();
}]);
