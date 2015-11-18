'use strict';

// 共通モジュール
var fs = require('fs');

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');
// 起動 URL
var currentURL = 'file://' + __dirname + '/index.html';

// クラッシュレポート
require('crash-reporter').start();

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  // if (process.platform != 'darwin') {
    app.quit();
  // }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadUrl(currentURL);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.toggleDevTools();

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

