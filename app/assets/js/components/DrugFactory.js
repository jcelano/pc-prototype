'use strict';

angular.module('drugFactory', ['studyFactory'])
    .factory('DrugFactory', ['StudyFactory', function(StudyFactory) {

        function Drug(id, name){
            this.id = id;
            this.name = name;
            this.selectedStudy = null;
            this.studies = [];
            this.loadStudies = function(){
                if(this.id!= null && this.id.length>0){
                    this.studies = StudyFactory.list(this.id);
                }
            };

            this.loadStudies(id);
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
}]);