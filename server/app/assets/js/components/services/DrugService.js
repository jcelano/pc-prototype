'use strict';

angular.module('drugService', [])
    .service('DrugService', [function () {
        /*
         * Drug object constructor
         * */
        function Drug(id, name) {
            this.id = id;
            this.name = name;
            this.studies = null;
        }

        /*
         public API
         * */
        return {
            newInstance: function () {
                return new Drug();
            }
        };
    }]);