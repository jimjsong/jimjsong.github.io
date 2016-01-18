(function () {
  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ]).controller('CompCalcCtrl',
    ["$scope", "$state", "$http", function ($scope, $state, $http) {
      var vm = this;

      // Tab counter
      var counter = 1;
      // Array to store the tabs
      vm.tabs = [];
      vm.updateTaxRate = function (tab) {

        if (isNaN(tab.annualSalary)) {
          tab.taxRate = 0;
          return;
        }

        var sal = tab.annualSalary;
        if (sal < 8925) {
          tab.taxRate = .10;
        } else if (sal < 36250) {
          tab.taxRate = .15;
        } else if (sal < 87850) {
          tab.taxRate = .25;
        } else if (sal < 183250) {
          tab.taxRate = .28;
        } else if (sal < 398350) {
          tab.taxRate = .35;
        } else {
          tab.taxRate = .396;
        }
      };

      vm.updateCommuteDist = function(tab) {
        tab.commuteYearly = tab.commuteDist * 10 * 0.575 * 48;
      }

      vm.companyMatchUpdate = function(tab) {
        if (!!tab.annualSalary && !!tab.four01kContribPercentage && !!tab.companyMatch) {
          tab.annual401KCompanyMatch = tab.annualSalary * tab.four01kContribPercentage / 100 * tab.companyMatch / 100;
        }
      }

      vm.four01kContribPercentageUpdate = function(tab) {
        if (!!tab.annualSalary && !!tab.four01kContribPercentage)
        {
          tab.annualFour01kContrib = tab.annualSalary * tab.four01kContribPercentage /100;
          vm.companyMatchUpdate(tab);
        }
      }

      // Add tab to the end of the array
      vm.addTab = function () {
        vm.tabs.push({
          title: 'Job ' + counter,
          description: "Decription " + counter,
          annualSalary: 10000 * counter,
          ptoWksOff: counter,
          bonusMiscBen: 500 * counter,
          companyMatch: 70 + 10 * counter,
          four01kContribPercentage: 3 + counter,
          taxRate: 0,
          healthMP: 300 * counter,
          commuteDist: 10 * counter,
          annual401KCompanyMatch: 0,
          annualFour01kContrib: 10000 * counter * (3 + counter) /10000
        });
        counter++;
      };

      // Remove tab by index
      vm.removeTab = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        vm.tabs.splice(index, 1);
      };

      // Initialize the scope functions

      // For demonstration add 10 tabs
      for (var i = 0; i < 3; i++) {
        vm.addTab();
        vm.updateTaxRate(vm.tabs[i]);
        vm.updateCommuteDist(vm.tabs[i]);
        vm.four01kContribPercentageUpdate(vm.tabs[i]);
      }


    }])  // Ensure you don't end in a semicolon, because more
    // actions are to follow.
    .config(config)
    .run(run);


  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }
})();
