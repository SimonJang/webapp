/**
 * Filters
 * Custom filter, werkt momenteel nog niet zoals gewenst
 */

(function() {
    angular.module('beheerApp')
        .filter('typeFilter', typeFilter);

    function typeFilter() {
        return function(levs, typeE, typeG) {
            if(typeof levs === 'undefined') {
                return null;
            }
            var filtered = [];
            var selectedTypes = [];
            if(typeof typeE !== 'undefined') {
                selectedTypes.push("Elektriciteit");
            }
            if(typeof typeG !== 'undefined') {
                selectedTypes.push("Gas");
            }
            if(typeof typeG === 'undefined' && typeof typeE === 'undefined') {
                return levs
            }
            for(var x = 0; x < levs.length; x++) {
                if(levs[x].type.length > 1) {
                    for(var t = 0; t < levs[x].type.length; t++) {
                        if(selectedTypes.indexOf(levs[x].type[t]) !== -1) {
                            filtered.push(levs[x]);
                            break;
                        }
                    }
                }
                else if(selectedTypes.indexOf(levs[x].type) !== -1) {
                    filtered.push(levs[x]);
                }
            }
            return filtered;
        }
    }

})();