var fs = require("fs");

/*var notesArrayObj = [
    {
        id: 1,
        title: "firstNote",
        text: "This is my first note"
    }
];*/
var getNotesDB = () => {
    var notesArrayStr = fs.readFileSync("./db/db.json", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        console.log("notesArray: " + data);
        return data;
    });
    return notesArrayStr;
}; 

module.exports = {
    getNotesDB: getNotesDB
}

