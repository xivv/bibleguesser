const fs = require("fs");
fs.readdir("./books/", (error, books) => {
  books.forEach((element) => {
    // add books initially
    //caps
    fs.readdir("./books/" + element + "/", (error, caps) => {
      caps.forEach((cap) => {
        fs.readFile("./books/" + element + "/" + cap, (error, data) => {

          const input = JSON.parse(data);
          let output = JSON.stringify(input,null,2);
          output = output
          .replace("%C3%B6", "ö")
          .replace("%C3%BC", "ü")
          .replace("%C3%A4", "ä");

          fs.writeFile(
            "./books/" + element + "/" + cap,
            output,
            (error) => {
              if (error);
              console.log(error);
            }
          );
        });
      });
    });
  });
});
