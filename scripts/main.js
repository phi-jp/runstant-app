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
      file.data = JSON.stringify(res.data);
      saveFileDialog();
    }
    else if (res.action === 'load') {
      file.filename = res.data.path;
      localStorage.setItem('history', file.filename);
    }
  };

  // open from history
  var filename = localStorage.getItem('history');
  if (filename) {
    open(filename, function() {
      runstantFrame.contentWindow.postMessage(JSON.stringify({
        action: 'set',
        data: file.data,
      }), "*");
    });
  }
};

var sync = function(v) {
};
