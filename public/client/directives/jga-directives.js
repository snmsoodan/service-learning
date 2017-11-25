(function(){
    "use strict";
    angular
        .module("jgaDirectives", [])
        .directive("jgaSortable", jgaSortable);

    function jgaSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end = null;
            console.log(element);
            $(element)
                .sortable({
                    axis: "y",
                    sort: function (event, ui) {
                        start = ui.item.index();
                    },
                    stop: function (event, ui) {
                        end = ui.item.index();
                        if (start >= end) {
                            start--;
                        }
                        scope.jgaSortableCallback({start: start, end: end});
                    }
                });
        }

        return {
            scope: {
                jgaSortableCallback: '&'
            },
            link: link
        };
    }
})();

