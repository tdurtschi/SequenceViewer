var ProteinSearch = new function () {
    this.search = function (protein, searchStr) {
        if (!searchStr || searchStr === "") { return true;}
        var searchTerms = searchStr.toLowerCase().split(" ");

        var isMatch = true;
        var searchCursor = 0;

        var sequenceString = protein.Sequence.toLowerCase();

        for(var i = 0; i < searchTerms.length; i++){
            var current = searchTerms[i];

            var termMatched = false;
            for (var j = searchCursor; j < sequenceString.length; j++) {
                if (sequenceString.substr(j, current.length) === current) {
                    termMatched = true;
                    searchCursor = j + current.length;
                    break;
                }
            }
            if(termMatched == false)
            {
                isMatch = false;
            }
        }

        return isMatch;
    }
}

var CreateProteinHighlight = function (sequenceStr, searchStr) {
    var searchTerms = searchStr.toLowerCase().split(" ");

    var output = sequenceStr.split('').map(function(char) {
        return {
            char: char, 
            highlighted: false}
    });

    sequenceStr = sequenceStr.toLowerCase();

    var t = { char: "C", highlighted: false };

    var searchCursor = 0;

    for (var i = 0; i < searchTerms.length; i++) {
        var current = searchTerms[i];

        var termMatched = false;
        for (var j = searchCursor; j < sequenceStr.length; j++) {
            if (sequenceStr.substr(j, current.length) === current) {
                termMatched = true;
                searchCursor = j + current.length;
                break;
            }
        }

        if (termMatched == true) {
            for(var k = j; k < j + current.length; k++)
            {
                output[k].highlighted = true;
            }
        }
    }

    return output;
    //<span class="highlighted"/>
}