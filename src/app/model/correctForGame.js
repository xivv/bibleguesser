const { Console } = require("console");
const fs = require("fs");


var map = {}

fs.readFile("bible.json", (error, data) => {
  var bible = JSON.parse(data);
  var verses = {
    verses: [],
  };

  for (var i = 0; i < bible.books.length; i++) {
    for (var a = 0; a < bible.books[i].cap.length; a++) {
      for (var k = 0; k < bible.books[i].cap[a].verses.length; k++) {
        var vers = {
          book: bible.books[i].name,
          vers: bible.books[i].cap[a].verses[k].vers,
        };
        verses.verses.push(vers);
       
      }
    }
    console.log(bible.books[i].name);
}
  fs.writeFile("verses.json",JSON.stringify(verses,null,2), (err) => {
          
});
});
