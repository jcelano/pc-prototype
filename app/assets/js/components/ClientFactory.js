'use strict';

angular.module('clientFactory', ['drugFactory'])
    .factory('ClientFactory', ['DrugFactory', 'FileService', function(DrugFactory, FileService) {

        function Client(id, name){
            this.id = id;
            this.name = name;
            this.drug = null;
        }

        Client.list = function () {

            return FileService.loadClients();

            // var ret = [];
            //
            // var temp = [
            //     'Acute Lamp Builders',
            //     'Cheeky Fox Films',
            //     'Small Apple Films',
            //     'Jealous Tiger Web Design',
            //     'Happy Crab Marketing'
            // ];
            //
            //
            // for(var i=0;i<temp.length;++i){
            //     ret.push(new Client("CLI" + i, temp[i]))
            // }
            //
            // return ret;
        };
        return Client;
}]);