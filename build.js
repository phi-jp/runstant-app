var packager = require('electron-packager');
var config = require('./package.json');
 
packager({
  'dir': './',
  'out': './dist',
  'name': config.name,
  'platform': 'darwin', // or win32
  'arch': 'x64',
  'version': '0.34.2',
  'icon': './app.icns', // アプリのアイコン

  'app-bundle-id': 'jp.phi.runstant',
  'app-version': config.version, // アプリのバージョン

  'overwrite': true,
  'asar': true,
  'prune': true,
  'ignore': "node_modules/(electron-packager|electron-prebuilt|\.bin)|release\.js",
  
  'version-string': {
    CompanyName: 'phiary',
    FileDescription: 'runstant',
    OriginalFilename: config.name,
    FileVersion: config.version,
    ProductVersion: config.version,
    ProductName: config.name,
    InternalName: config.name
  }
}, function done (err, appPath) {
  if(err) {
    throw new Error(err);
  }
  console.log('Done!!');
});