var fs      = require('fs');
var remote  = require('remote');
var Dialog  = remote.require('dialog');


var open = function(filename) {
  if (filename) {
    fs.readFile(filename, 'utf8', function(error, data) {
      if (error) { throw error; }

      window.onopenfile && window.onopenfile({
        filename: filename,
        data: data,
      });
    });
  }
};
var save = function(filename, data) {
  fs.writeFile(filename, data, function(error, data) {
    if (error) { throw error; }

    console.log('saved', filename);
  });
};


// var file = {
//   filename: null,
//   data: null,
// };

// var openFileDialog = function() {
//   Dialog.showOpenDialog(function(filenames) {
//     if (!filenames) return ;
//     open(filenames[0]);
//   });
// };

var saveFileDialog = function(filename, data) {
  if (filename) {
    save(filename, data);
  }
  else {
    Dialog.showSaveDialog(function(filename) {
      if (filename) {
        save(filename, data);
      }
    });
  }
};
