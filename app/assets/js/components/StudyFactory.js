'use strict';

angular.module('studyFactory', [])
    .factory('StudyFactory', function() {

        function Study(id, name){
            this.id = id;
            this.name = name;
            this.deliverables = [];
        }

        Study.list = function (id) {

            if(id == null || id.length == 0){
                return [];
            }

            var temp = ['amusing',
                'watery',
                'fumbling',
                'mitten',
                'respect',
                'victorious',
                'surround',
                'finger',
               'melted',
                'truck',
                'smash',
                'lethal'];

            var ret = [];
            for(var i=0;i<temp.length;++i){
                ret.push(new Study("id" + i, temp[i] + " study "))
            }

            return ret;
        };
        return Study;
});