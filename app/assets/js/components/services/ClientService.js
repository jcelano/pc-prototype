'use strict';

angular.module('clientService', ['drugFactory'])
    .service('ClientService', ['FileService', function(FileService) {
        let clients = [];
        function Client(id, name){
            this.id = id;
            this.name = name;
            this.drug = null;
        }

        var list = function () {

            clients =  FileService.loadClients();

            return clients;

        };

        var addClient = function(client){
            clients.push(client);
        };

        var deleteClient = function(id){
            for(let i=0;i<clients.length;++i){
                if(clients[i].id == id){
                    clients.splice(i, 1);
                    return true;
                }
            }

            return false;
        }

        return {
            list:list,
            clients:function(){return clients},
            addClient:addClient,
            deleteClient:deleteClient,
            newInstance: function(){
                return new Client();
            }
        };
}]);