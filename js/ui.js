var showLetters = true;
var showBlacks = true;
var compact = false;

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
