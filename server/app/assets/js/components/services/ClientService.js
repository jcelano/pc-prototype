'use strict';

angular.module('clientService', [])
    .service('ClientService', ['FileService', function(FileService) {
        let clients = [];
        /*
        * Client object constructor
        * */
        function Client(id, name){
            this.id = id;
            this.name = name;
            this.drugs = [];
        }

        /*
        gets the list of clients in the system
        * */
        var list = function () {

            clients =  FileService.loadClients();

            return clients;

        };

        /*
        * adds a new client to the system
        * */
        var addClient = function(client){
            clients.push(client);
            FileService.saveClients(clients);

        };

        /*
         * adds a new client to the system
         * */
        var addDrugToClient = function(client_id, drug){
            const client = getClientById(client_id);
            if(client.drugs == null){
                client.drugs = [];
            }
            client.drugs.push(drug);
            FileService.saveClients(clients);

        };

        var addStudyToDrug = function(client_id, drug_id, study){
            const drug = getDrugByClientById(client_id, drug_id);

            if(drug.studies == null){
                drug.studies = [];
            }

            drug.studies.push(study);
            FileService.saveClients(clients);
        };

        var addDeliverableToStudy = function(client_id, drug_id, study_id, deliverable){
            const study = getStudyByDrugById(client_id, drug_id, study_id);
            if(study.deliverables == null){
                study.deliverables = [];
            }

            study.deliverables.push(deliverable);
            FileService.saveClients(clients);
        }

        /*
        * deletes a client from the system
        * */
        var deleteClient = function(id){
            for(let i=0;i<clients.length;++i){
                if(_id_eq(clients[i].id, id)){
                    clients.splice(i, 1);
                    FileService.saveClients(clients);
                    return true;
                }
            }

            return false;
        };

        /*
         * deletes a client from the system
         * */
        var deleteDrugFromClient = function(client_id, id){
            const client = getClientById(client_id);
            if(client != null && client.drugs != null){
                for(let i=0;i<client.drugs.length;++i){
                    if(_id_eq(client.drugs[i].id,id)){
                        client.drugs.splice(i, 1);
                        FileService.saveClients(clients);
                        return true;
                    }
                }
            }

            return false;
        };

        var deleteStudyFromDrug = function(client_id, drug_id, study_id){
            const drug = getDrugByClientById(client_id, drug_id);
            if(drug != null && drug.studies != null){
                for(let i=0;i<drug.studies.length;++i){
                    if(_id_eq(drug.studies[i].id, study_id)){
                        drug.studies.splice(i, 1);
                        FileService.saveClients(clients);
                        return true;
                    }
                }
            }
        };

        var deleteDeliverableFromStudy = function(client_id, drug_id, study_id, deliverable_id){
            const study = getStudyByDrugById(client_id, drug_id, study_id);
            if(study != null && study.deliverables.length>0){
                for(let i=0;i<study.deliverables.length;++i){
                    if(_id_eq(study.deliverables[i].id, deliverable_id)){
                        study.deliverables.splice(i, 1);
                        FileService.saveClients(clients);
                        return true;
                    }
                }
            }
        };



        var getClientById = function(id){
            for(let i=0;i<clients.length;++i){
                if(_id_eq(clients[i].id, id)){
                    return clients[i];
                }
            }

            return null;
        };

        var getDrugByClientById = function(client_id, id){
            const client = getClientById(client_id);
            if(client != null && client.drugs != null){
                for(let i=0;i<client.drugs.length;++i){
                    if(_id_eq(client.drugs[i].id,id)){
                        return client.drugs[i];
                    }
                }
            }

            return null;
        };

        var getStudyByDrugById = function(client_id, drug_id, study_id){
            const drug = getDrugByClientById(client_id, drug_id);
            if(drug != null && drug.studies != null){
                for(let i=0;i<drug.studies.length;++i){
                    if(_id_eq(drug.studies[i].id,study_id)){
                        return drug.studies[i];
                    }
                }
            }
            return null;
        } ;


        var getDeliverableByStudyById = function(client_id, drug_id, study_id, deliverable_id){
            const study = getStudyByDrugById(client_id, drug_id, study_id);
            if(study != null && study.deliverables != null){
                for(let i=0;i<study.deliverables.length;++i){
                    if(_id_eq(study.deliverables[i].id,study_id)){
                        return study.deliverables[i];
                    }
                }
            }
            return null;
        } ;

        var saveClientsState = function(){
            FileService.saveClients(clients);
        };

        function _id_eq(id1, id2){
            if(id1 == null && id2 == null){
                return true;
            }
            if(id1 == null || id2 == null){
                return false;
            }
            else{
                return id1.toLowerCase() == id2.toLowerCase();
            }
        }


        /*
        public API
        * */
        return {
            list:list,
            clients:function(){return clients},
            addClient:addClient,
            addDeliverableToStudy:addDeliverableToStudy,
            addDrugToClient:addDrugToClient,
            addStudyToDrug:addStudyToDrug,
            deleteClient:deleteClient,
            deleteDeliverableFromStudy:deleteDeliverableFromStudy,
            deleteDrugFromClient:deleteDrugFromClient,
            deleteStudyFromDrug:deleteStudyFromDrug,
            getClientById:getClientById,
            getDeliverableByStudyById:getDeliverableByStudyById,
            getDrugByClientById:getDrugByClientById,
            getStudyByDrugById:getStudyByDrugById,
            newInstance: function(){
                return new Client();
            },
            saveState:saveClientsState
        };
}]);