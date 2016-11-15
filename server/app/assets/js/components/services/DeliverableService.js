'use strict';

angular.module('deliverableService', [])
    .service('DeliverableService', [function () {
        /*
         * Deliverable object constructor
         * */
        function Deliverable(id, name, date) {
            this.id = id;
            this.name = name;
            this.date = date;
        }

        /*
         public API
         * */
        return {
            newInstance: function (id, name, date) {
                return new Deliverable(id, name, date);
            }
        };
    }]);