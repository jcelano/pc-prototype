'use strict';

angular.module('drugFactory', [])
    .factory('DrugFactory', function() {

        function Drug(id, name){
            this.id = id;
            this.name = name;
            this.studies = [];
        }

        Drug.list = function (id) {

            if(id == null || id.length == 0){
                return [];
            }

            var temp = ['Ceftobiprole[2](5th generation)',
            'Ceftaroline (5th generation)',
            'Clindamycin',
            'Dalbavancin',
            'Daptomycin',
            'Linezolid',
            'Mupirocin (topical)',
            'Oritavancin',
            'Tedizolid',
            'Telavancin',
            'Tigecycline',
            'Vancomycin'];

            var ret = [];
            for(var i=0;i<temp.length;++i){
                ret.push(new Drug("id" + i, temp[i]))
            }

            return ret;
        };
        return Drug;
});