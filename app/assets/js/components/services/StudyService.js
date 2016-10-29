'use strict';

angular.module('studyService', [])
    .service('StudyService', [function () {
        /*
         * Study object constructor
         * */
        function Study(id, name) {
            this.id = id;
            this.name = name;
            this.studies = null;
        }

        /*
         public API
         * */
        return {
            newInstance: function () {
                return new Study();
            }
        };
    }]);