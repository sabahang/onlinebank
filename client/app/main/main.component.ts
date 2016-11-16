const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  accounts = [];
  newAccount = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('account');
    });
  }

  $onInit() {
    this.$http.get('/api/accounts').then(response => {
      this.accounts = response.data;
      this.socket.syncUpdates('account', this.accounts);
    });
  }

  addAccount() {
    if (this.newAccount) {
      this.$http.post('/api/accounts', { name: this.newAccount });
      this.newAccount = '';
    }
  }

  deleteAccount(account) {
    this.$http.delete('/api/accounts/' + account._id);
  }
}

export default angular.module('onlinebankApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
