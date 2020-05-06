// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesData = require("../data/notesData");
var notesArray = [];

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    var notesDB = notesData.getNotesDB();
    // Set the list of notes read from file into the global notesArray[]
    notesArray = JSON.parse(notesDB); 
    console.log("notesData.getNotesDB(): " + notesDB);
    res.json(notesArray);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the notesData array which is eventually saved in a file)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    // Note the code here. Our "server" will respond to requests by saving the notes to a file.
    // It will do this by responding with true so the ViewX can redirect to /notes page to display
    // the new title and text value that was saved
    // req.body is available since we're using the body parsing middleware

    // save the new note to file by first setting the UUID
    notesData.saveNote(req.body, notesArray);
    res.json(true);

  });

  // ---------------------------------------------------------------------------
  // The below code deletes the note with a specified ID. ID is a hidden field that is stored in the 
  // array but never displayed.
  // It will return false if there is an error with any of the file operation e.g. read, update etc. 

  app.delete("/api/notes/:id", function (req, res) {
    // Empty out the arrays of data
    var toDelete = req.params.id;
    notesData.deleteNote(toDelete, notesArray);
    res.json(true);
  });
};
