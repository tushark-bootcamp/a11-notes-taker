var fs = require("fs");
var newNote = require("./objects/note");

// Reads and returns all the notes from db.json file
var getNotesDB = () => {
    var notesArrayStr = fs.readFileSync("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log("notesArray: " + data);
        return data;
    });
    return notesArrayStr;
};

// Adds the new note to notesArray and saves to db.json file
var saveNote = (note, notesArray) => {
    var uuid = uuidv4();
    console.log("logging note and newNote: ");
    console.log(note);
    // Caste back the note object into newNote object with the id field
    newNote = JSON.parse(JSON.stringify(note));
    newNote.id = uuid;
    console.log(newNote);
    notesArray.push(newNote);
    createNoteDB(notesArray);
}

// file function to add new note to db.json file
var createNoteDB = (notesArray) => {
    var notes = JSON.stringify(notesArray);
    fs.writeFileSync("./db/db.json", notes, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

// Deletes the note from the notesArray and deletes it from the db.json file
var deleteNote = (noteId, notesArray) => {
    console.log("toDelete: " + noteId);
    notesArray.forEach((note, i) => {
        //console.log("ith id: " + i + " " + note.id);
        if (note.id === noteId) {
            notesArray.splice(i, 1);
        }
    });
    createNoteDB(notesArray);
}

// generates unique id for the note
var uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    getNotesDB: getNotesDB,
    saveNote: saveNote,
    createNoteDB: createNoteDB,
    deleteNote: deleteNote
}

