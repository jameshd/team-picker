(function(){

    // the minimum version of jQuery we want
    var v = "1.9.1";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function() {
            var names = [];
            $('tr.participant td[title*="Yes"]').each(function(i, el) {
                var name = $(this).attr('title').split(",");
                if(name) {
                   names.push(name[0]);
                }
            });

            alert(names.join('\n') + '\n\nThat\'s ' + names.length + ' yer bitch!');
        })();
    }

})();