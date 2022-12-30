

$(function () {
    console.log("init")
    createTonesBlock();
    createScalesBlock();
    createChordsBlock();
    $(".toggleBlacks").click(function () {
        toggleBlacks()
    });
    $(".toggleLetters").click(function () {
        toggleLetters()
    });
    $(".compact").click(function () {
        toggleCompact()
    });


});

/**
 * Create the notes, scales and chord blocks
 */

function createTonesBlock() {
    createNotes(".tones", tonesNotes);
    $(".tones .note").click(function () {
        $(".tones .active").removeClass("active");
        $(this).addClass("active")
        showLegalScaleNotes()
        $('.scales .note:nth-child(' + ($(this).index() + 1) + ')').trigger('click');
    });

}

function createScalesBlock() {

    var c = $(".scales .row")

    for (var i = 0; i < dscales.length - 1; i++) {
        c.clone().appendTo(".scales .rows");
    }
    $(".scales .info").click(function () {
        console.log("next", $(this).next());
        playRow($(this).parent(), 0.5, 0.5);
    });
    for (var i = 0; i < dscales.length; i++) {
        $(".scales .rows .row:nth-of-type(" + (i + 1) + ") h3").text(dscales[i].name)
        createNotes(".scales .row:nth-of-type(" + (i + 1) + ")", scaleNotes[i]);
    }
    $(".scales .note").click(function () {
        $(".scales .notes .active").removeClass("active");
        $(this).addClass("active")
        showLegalChordsNotes()
    });
    createVariants(".scales", dmodes)
    $(".scales ul li").click(function () {
        $(".scales ul .active").removeClass("active");
        $(".scales .notes .active").removeClass("active");
        $(this).addClass("active")
        showLegalScaleNotes();
    });
}




function createChordsBlock() {
    createVariants(".chords", dchordinversionss);
    var c = $(".chords .row")
    for (var i = 0; i < 3; i++) {
        c.clone().appendTo(".chords .rows");
    }
    $(".chords .info").click(function () {
        playRow($(this).parent(), 0.5, 0);
    });
    for (var i = 0; i < 4; i++) {
        $(".chords .rows .row:nth-of-type(" + (i + 1) + ") h3").text(dchords[i].name)
        createNotes(".chords .row:nth-of-type(" + (i + 1) + ")", chordNotes[i]);
    }
    $(".chords ul li").click(function () {
        $(".chords ul .active").removeClass("active");
        $(this).addClass("active")
        showLegalChordsNotes();
    });
}

/**
 * 
 *The UI inside the blocks
 */



function createNotes(parent, arr) {
    for (var i = 0; i < 24; i++) {
        $(".notes", parent).append('<div class="note" data-midinote="' + dmidinotes[i] + '"><div class="letter">empty</div></div>')
        arr.push($(".notes .note:last-child", parent))
        for (var j = 0; j < dblacknotes.length; j++) {
            if (i == dblacknotes[j]) {
                arr[i].addClass("black");
            } else {
                $(".letter", arr[i]).text(dalphabet[i])
            }
        }
    }
}

function createVariants(parent, source) {
    for (var i = 0; i < source.length; i++) {
        $("ul", parent).append('<li class="variant">' + source[i].name + '</li>')
        $("ul li:first-child", parent).addClass("active")
    }
}





/**
 * Behaviors and interactions
 */




function showLegalScaleNotes() {
    $(".scales .note").removeClass("legal")
    for (var i = 0; i < dscales.length; i++) {
        var mode = 1 + dscales[i].details.positions[$(".scales .variants li.active").index()];
        for (var j = 0; j < dscales[i].details.pattern.length; j++) {
            $(".scales .rows .row:nth-of-type(" + (i + 1) + ") .note:nth-child(" + (mode + dscales[i].details.positions[j]) + ")").addClass("legal")
        }
    }

}



function showLegalChordsNotes() {
    var inversion = dchordinversionss[$(".chords .variants li.active").index()].details.pattern;
    $(".chords .note").removeClass("legal")

    for (var i = 0; i < dchords.length; i++) {
        console.log("chord row")
        var n = $(".scales .note.active").index() + 1

        for (var j = 0; j < 3; j++) {
            console.log("--", n)
            n += dchords[i].details.pattern[j]
            $(".chords .rows .row:nth-of-type(" + (i + 1) + ") .note:nth-child(" + (n + inversion[j]) + ")").addClass("legal")

        }
    }
}


function playRow(parent, duration, delay) {
    let notesToPlay = [];
    let notesToHighlight = []
    $(".note", parent).each(function (index) {
        if ($(this).hasClass("legal")) {
            console.log(index + ": " + $(this).data("midinote"));
            notesToPlay.push($(this).data("midinote"))
            notesToHighlight.push($(this))
        }
    });
    synthPlayAndHighlightRow(notesToPlay, notesToHighlight, duration, delay)
}




