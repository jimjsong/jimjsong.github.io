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
          title: 'Job 1',
          annualSalary: 65000,
          ptoWksOff: 2,
          bonusMiscBen: 2000,
          companyMatch: 100,
          four01kContribPercentage: 3,
          taxRate: .25,
          healthMP: 400,
          commuteDist: 10,
          annual401KCompanyMatch: 1950,
          annualFour01kContrib: 1950
        });
        vm.tabs.push({
          title: 'Job 2',
          annualSalary: 70000,
          ptoWksOff: 2,
          bonusMiscBen: 2000,
          companyMatch: 50,
          four01kContribPercentage: 3,
          taxRate: .25,
          healthMP: 200,
          commuteDist: 15,
          annual401KCompanyMatch: 1050,
          annualFour01kContrib: 1050,
          commuteDiff: 2
        });

      };

      // Remove tab by index
      vm.removeTab = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        vm.tabs.splice(index, 1);
      };

      // Initialize the scope functions

      vm.addTab();

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
