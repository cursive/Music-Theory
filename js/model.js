/**
 * These are popoluated when notes, scales and chords are first created
 */

var tonesNotes = [];
var chordNotes = [[], [], [], []];
var scaleNotes = [[], [], [], []];


/**
 * Data, should probably live in in json file
 */
var dalphabet = ["C", "C#", "D", "Em", "E", "F", "F#", "G", "G#", "A", "Bm", "B", "C", "C#", "D", "Em", "E", "F", "F#", "G", "G#", "A", "Bm", "B", "C"]
var dmidinotes = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6"]
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