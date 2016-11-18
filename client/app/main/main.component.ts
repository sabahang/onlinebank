const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  accounts = [];
  newAccount = '';
  isLoggedIn: Function;
  isAdmin: Function;
  getCurrentUser: Function;
  isCollapsed = true;

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {

    this.$http = $http;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    // isLoggedIn: Function;
    // isAdmin: Function;
    // getCurrentUser: Function;
    //isCollapsed = true;

    // constructor(Auth) {
    //   'ngInject';
    //   this.isLoggedIn = Auth.isLoggedInSync;
    //   this.isAdmin = Auth.isAdminSync;
    //   this.getCurrentUser = Auth.getCurrentUserSync;
    // }
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('account');
    });
  }

  $onInit() {
    // this.$http.get('/api/accounts').then(response => {
    //   this.accounts = response.data;
    //   this.socket.syncUpdates('account', this.accounts);
    // });
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
