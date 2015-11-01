'use strict';

// 共通モジュール
var fs = require('fs');

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');
var dialog = require('dialog');
var Menu = require('menu');
// 起動 URL
// var currentURL = 'file://' + __dirname + '/index.html';
var currentURL = 'http://lite.runstant.com';

// クラッシュレポート
require('crash-reporter').start();

var openDialog = function() {
  var win = BrowserWindow.getFocusedWindow();
  dialog.showOpenDialog(
    win,
    {
      properties: ['openFile'],
    },
    function(filename) {
      fs.readFile(filename[0], function(error, text) {
        console.log(text.toString());
      });
    });
};

// setup menu
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
          console.log('save');
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
      // {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
      // {label: 'Paste', accelerator: 'Command+V', selector: 'paste'}
    ]
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

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadUrl(currentURL);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.toggleDevTools();

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  Menu.setApplicationMenu(menu);
});

