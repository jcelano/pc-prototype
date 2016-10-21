'use strict';

angular.module('clientFactory', ['drugFactory'])
    .factory('ClientFactory', ['DrugFactory', function(DrugFactory) {

        function Client(id, name){
            this.id = id;
            this.name = name;
            this.selectedDrug = null;
            this.loadDrugs = function(){
                if(this.id!= null && this.id.length>0){
                    this.drugs = DrugFactory.list(this.id);
                }
            }

            this.loadDrugs(id);
        }

        Client.list = function () {
            var ret = [];
            for(var i=0;i<10;++i){
                ret.push(new Client("cl" + i, "Client " + i))
            }

            return ret;
        };
        return Client;
}]);