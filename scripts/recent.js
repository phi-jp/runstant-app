var path = require('path');

var RECENT_KEY = '__recent__';
var recent = {
  logs: [],

  init: function() {
    var logs = localStorage.getItem(RECENT_KEY);
    if (logs) {
      this.logs = JSON.parse(logs);
    }
    else {
      this.logs = [];
    }
  },

  current: function() {
    return this.logs[0] || {};
  },

  add: function(filepath) {
    this.logs = this.logs.filter(function(file) {
      return file.filepath !== filepath;
    });
    
    this.logs.unshift({
      filepath: filepath,
      filename: path.basename(filepath),
    });
    this.save();

    return this;
  },

  save: function() {
    var str = JSON.stringify(this.logs);
    localStorage.setItem(RECENT_KEY, str);
    return this;
  },

  clear: function() {
    localStorage.removeItem(RECENT_KEY);
  },
};

recent.init();