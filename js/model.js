/**
 * These are popoluated when notes, scales and chords are first created
 */

var tonesNotes = [];
var progressionNotes = [[], [], [], [], [], [], [], [], []];
var chordNotes = [[], [], [], []];
var scaleNotes = [[], [], [], []];


/**
 * Data, should probably live in in json file
 */
var dalphabet = ["C", "C#", "D", "Em", "E", "F", "F#", "G", "G#", "A", "Bm", "B", "C", "C#", "D", "Em", "E", "F", "F#", "G", "G#", "A", "Bm", "B", "C"]
var dmidinotes = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"]
var dblacknotes = [1, 3, 6, 8, 10, 13, 15, 18, 20, 22]
var dscaleNotes = [0, 2, 4, 5, 7, 9, 11]

var dscales = [
    { "name": "Major", "details": { "pattern": [2, 2, 1, 2, 2, 2, 1], "positions": [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24] } },
    { "name": "Minor", "details": { "pattern": [2, 1, 2, 2, 1, 2, 1], "positions": [0, 2, 3, 5, 7, 8, 10, 11, 12, 14, 15, 17, 19, 20, 22, 23, 24] } },
]

var dchords = [
    { "name": "major", "details": { "pattern": [0, 4, 3] } },
    { "name": "minor", "details": { "pattern": [0, 3, 4] } },
    { "name": "diminished", "details": { "pattern": [0, 3, 3] } },
    { "name": "augemented", "details": { "pattern": [0, 4, 4] } }
]


var dchordinversions = [
    { "name": "Default", "details": { "pattern": [0, 0, 0] } },
    { "name": "First Inversion", "details": { "pattern": [12, 0, 0] } },
    { "name": "Second Inversion", "details": { "pattern": [12, 12, 0] } }
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


var dprogressions = [
    { "name": "Major", "details": { "pattern": [0, 1, 1, 0, 0, 1, 2] } },
    { "name": "minor", "details": { "pattern": [1, 2, 0, 1, 1, 2, 2] } }
]