var histories = [];

window.onload = function() {
  var runstantFrame = document.querySelector('#runstant iframe')

  runstantFrame.contentWindow.postMessage(JSON.stringify({
    action: 'type',
    data: 'app',
  }), "*");

  window.onmessage = function(e) {
    var res = JSON.parse(e.data);
    if (res.action === 'save') {
      var file = recent.current();
      saveFileDialog(file.filepath, JSON.stringify(res.data));
    }
    else if (res.action === 'load') {
      recent.add(res.data.path);
      riot.update();
    }
  };

  window.onopenfile = function(e) {
    recent.add(e.filename);
    riot.update();

    runstantFrame.contentWindow.postMessage(JSON.stringify({
      action: 'set',
      data: e.data,
    }), "*");
  };

  window.onsavefile = function(e) {

  };

  // // open from history
  // var filename = localStorage.getItem('history');
  // if (filename) {
  //   open(filename);
  // }
};



var sync = function(v) {
};
