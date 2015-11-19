var remote  = require('remote');
var Menu = remote.require('menu');
var mainWindow = remote.getCurrentWindow();

var menu = Menu.buildFromTemplate([
  {
    label: 'Runstant',
    submenu: [
      {
        label: 'About',
        click: function() {
          mainWindow.loadUrl('http://lite.runstant.com/about');
        }
      },
      { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }},
    ]
  },
  {
    label: 'File',
    submenu: [
      { label: 'New File' },
      {
        label: 'Open',
        click: function() {
          openDialog();
        },
      },
      { type: 'separator' },
      {
        label: "Save",
        accelerator: "CmdOrCtrl+S",
        click: function() {
          saveFileDialog();
        }
      },
      {
        label: 'Save As...',
      },
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
      { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
      { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
      { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: function() { mainWindow.restart(); }
      },
      {
        label: 'Toggle Full Screen',
        accelerator: 'CmdOrCtrl+Ctrl+F',
        click: function() {
          mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+Alt+I',
        click: function() {
          mainWindow.toggleDevTools();
        }
      },
    ],
  }
]);
Menu.setApplicationMenu(menu);
