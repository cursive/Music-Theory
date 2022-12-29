var showLetters = true;
var showBlacks = true;
var compact = false;
var tonesNotes = [];
var chordNotes = [[], [], [], []];
var scaleNotes = [[], [], [], []];


/**
 * Data, should probably live in in ajson file
 */
var dalphabet = ["C", "C#", "D", "Em", "E", "F", "F#", "G", "G#", "A", "Bm", "B", "C", "C#", "D", "Em", "E", "F", "F#", "G", "G#", "A", "Bm", "B", "C"]
var dblacknotes = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22]
var dscaleNotes = [0, 2, 4, 5, 7, 9, 11]

var dscales = [
    { "name": "Major", "details": { "pattern": [2, 2, 1, 2, 2, 2, 1], "positions": [0, 2, 4, 5, 7, 9, 11, 12] } },
    { "name": "Minor", "details": { "pattern": [2, 1, 2, 2, 1, 2, 1], "positions": [0, 2, 3, 5, 7, 8, 10, 11] } },
]

var dchords = [
    { "name": "Augemented", "details": { "pattern": [0, 4, 4] } },
    { "name": "Major", "details": { "pattern": [0, 4, 3] } },
    { "name": "Minor", "details": { "pattern": [0, 3, 4] } },
    { "name": "Diminished", "details": { "pattern": [0, 3, 3] } },
]


var dchordinversionss = [
    { "name": "Default", "details": { "pattern": [0, 0, 0] } },
    { "name": "First Inversion", "details": { "pattern": [12, 0, 0] } },
    { "name": "Second Inversion", "details": { "pattern": [12, 12, 0] } },
]

var dmodes = [
    { "name": "Ionian", "details": { "pattern": [2, 2, 1, 2, 2, 2, 1] } },
    { "name": "Dorian", "details": { "pattern": [2, 1, 2, 2, 2, 1, 2] } },
    { "name": "Phrygian", "details": { "pattern": [1, 2, 2, 2, 1, 2, 2] } },
    { "name": "Lydian", "details": { "pattern": [2, 2, 2, 1, 2, 2, 1] } },
    { "name": "Mixolydian", "details": { "pattern": [2, 2, 1, 2, 2, 1, 2] } },
    { "name": "Aeolian", "details": { "pattern": [2, 1, 2, 2, 1, 2, 2] } },
    { "name": "Locrian", "details": { "pattern": [1, 2, 2, 1, 2, 2, 2] } }
]





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
 * 
 * Create the main UI blocks
 * 
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
    //clearNotes(parent, arr)
    console.log(parent)
    for (var i = 0; i < 24; i++) {
        $(".notes", parent).append('<div class="note"><div class="letter">empty</div></div>')
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

function clearNotes(parent, arr) {
    arr = [];
    $(".notes", parent).empty()
}



/**
 * Behaviors for showing notes
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



/**
 * UI controls
 */


function toggleBlacks() {
    showBlacks = !showBlacks;
    if (showBlacks) {
        $(".black").removeClass("hideblack")
    } else {
        $(".black").addClass("hideblack")
    }
}

function toggleLetters() {
    showLetters = !showLetters;
    if (showLetters) {
        $(".letter").removeClass("invisible")
    } else {
        $(".letter").addClass("invisible")
    }
}
function toggleCompact() {
    compact = !compact;
    if (compact) {
        $("body").addClass("compact")
    } else {
        $("body").removeClass("compact")
    }
}


/**
 * Utilsites
 */



function resetChords() {
    $(".chords .note.active").removeClass("active");
}

function resetScales() {
    $(".scales .note.active").removeClass("active");
}


function getModeByName() {
    for (prop in dmodes) {
        //console.log("fdfds", prop);
        if (dmodes[prop].name === "Dorian") {
            console.log(dmodes[prop].details.pattern)
        }
    }
}


var samples = [130.8, 138.6, 146.85, 155.55, 164.8, 174.6, 185, 196, 207.65, 220, 233.1, 246.95, 261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370, 392, 415.3, 440, 466.2, 493.9]

function playSound(synth, note) {
    console.log(note, "note")
    synth.playSound(samples[note])
    setTimeout(() => {
        stopSounds()
    }
        , 500);

}

function stopSounds() {
    synth1.stopSound()
    synth2.stopSound()
    synth3.stopSound()
}

function playChord() {
    playSound(synth1, 1)
    playSound(synth2, 9)
    playSound(synth3, 14)

}

var is = [0, 1, 2, 3, 4, 5]
function playScale() {
    for (var i = 0; i < array.length; i++) {
        playScale2(i)
    }
}
var array = [0, 1, 2, 3, 4, 5]

function playScale2(i) {
    setTimeout(() => {
        console.log(array[i])
        playSound(synth1, array[i])
    }, i * 510);
}


var synth1 = new MIDIControlledSynth();
var synth2 = new MIDIControlledSynth();
var synth3 = new MIDIControlledSynth();
