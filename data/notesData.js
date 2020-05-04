// Initially set dummy notes title and some text against it.
// Write code to read the notes saved in file and return it as an array of JSON obj - notesArray
var currentId = 1;
var notesArray = [
    {
        id: 1,
        title: "firstNote",
        text: "This is my first note"
    }
];

function nextId() {
    return currentId++;
}