const fs = require("fs");
const booksdata = {
  totalVerses:0,
  totalCap :0,
  books: [],
};

const order = [
  "1-mose",
"2-mose",
"3-mose",
"4-mose",
"5-mose",
"josua",
"richter",
"ruth",
"1-samuel",
"2-samuel",
"1-Könige",
"2-Könige",
"1-chronika",
"2-chronika",
"esra",
"nehemia",
"esther",
"hiob",
"psalmen",
"Sprüche",
"prediger",
"hohes-lied",
"jesaja",
"jeremia",
"klagelieder",
"hesekiel",
"daniel",
"hosea",
"joel",
"amos",
"obadja",
"jona",
"micha",
"nahum",
"habakuk",
"zephanja",
"haggai",
"sacharja",
"maleachi",
"Matthäus",
"markus",
"lukas",
"johannes",
"apostelgeschichte",
"Römer",
"1-korinther",
"2-korinther",
"galater",
"epheser",
"philipper",
"kolosser",
"1-thessalonicher",
"2-thessalonicher",
"1-timotheus",
"2-timotheus",
"titus",
"philemon",
"Hebräer",
"jakobus",
"1-petrus",
"2-petrus",
"1-johannes",
"2-johannes",
"3-johannes",
"judas",
"offenbarung"
];

fs.readdir("./books/", (error, books) => {
  //books
  let bookcount = 0;
  books.forEach((element) => {
    // add books initially

    booksdata.books.push({
      name: element,
      cap: [],
      order: order.indexOf(element),
    });
    
    booksdata.books.sort((a,b) => a.order - b.order);
    bookcount++;

    //caps
    fs.readdir("./books/" + element + "/", (error, caps) => {
      caps.forEach((cap) => {
        fs.readFile("./books/" + element + "/" + cap, (error, data) => {
          try {
            const json = JSON.parse(data);
            const index = booksdata.books.findIndex(
              (book) => book.name === json.book
            );
            booksdata.books[index].cap.push({
              numb: Number(json.cap),
              verses: json.verses,
            });

            booksdata.totalCap += 1;
            booksdata.totalVerses += json.verses.length;
            booksdata.books[index].cap.sort((a,b) => a.numb - b.numb);
          } catch (error) {
            console.log(error + ":" + "./books/" + element + "/" + cap);
          }

          fs.writeFile(
            "./bible.json",
            JSON.stringify(booksdata, null, 2),
            (error) => {
              if(error);
              console.log(error);
            }
          );
        });
      });
    });
  });
});
