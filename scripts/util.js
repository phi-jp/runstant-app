var fs      = require('fs');
var remote  = require('remote');
var Dialog  = remote.require('dialog');

var file = {
  filename: null,
  data: null,
};

var open = function(filename, callback) {
  if (filename) {
    fs.readFile(filename, 'utf8', function(error, data) {
      if (error) { throw error; }
      file.filename = filename;
      file.data = data;

      callback && callback();
    });
  }
};
var openFileDialog = function() {
  Dialog.showOpenDialog(function(filenames) {
    if (!filenames) return ;
    open(filenames[0]);
  });
};
var save = function(filename, data) {
  fs.writeFile(filename, data, function(error, data) {
    if (error) { throw error; }
    console.log('saved', filename);
  });
};
var saveFileDialog = function() {
  if (file.filename) {
    save(file.filename, file.data);
  }
  else {
    Dialog.showSaveDialog(function(filename) {
      if (filename) {
        file.filename = filename;
        save(file.filename, file.data);
      }
    });
  }
};
