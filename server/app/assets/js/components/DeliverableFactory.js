'use strict';

angular.module('deliverableFactory', [])
    .factory('DeliverableFactory', function() {

        function Deliverable(id, name, date){
            this.id = id;
            this.name = name;
            this.date = date;
        }

        Deliverable.list = function (clientId, drugId, studyId) {

            if(studyId == null || studyId.length == 0){
                return [];
            }

            var ret = [];
            for(var i=0;i<5;++i){
                var date = new Date();
                date.setMonth(i+1);
                date.setDate(1);
                ret.push(new Deliverable("DEL" + i, "Deliverable #" + i, date))
            }

            return ret;
        };
        return Deliverable;
});