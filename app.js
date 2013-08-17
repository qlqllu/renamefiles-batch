#!/usr/bin/env node

var fs = require('fs'),
path = require('path');

var arguments = process.argv.splice(2), dir;
if(arguments.length >= 1){
  dir = arguments[0];
}else{
  dir = '.';
}

var data = fs.readFileSync(dir + path.sep + 'list.txt', {encoding: 'utf-8'});
var lines = data.split('\r\n'), i, dirName, fileName, fileIndex, files;

console.log('List file line count: ' + lines.length);

for(i = 0; i < lines.length; i++){
  if(lines[i].trim().length === 0){
    continue;
  }
  var m = lines[i].match(/\[(.*)\]/);
  if(m){
    dirName = dir + path.sep + m[1];
    fileIndex = 0;
    if(fs.existsSync(dirName)){
      files = fs.readdirSync(dirName);
    }else{
      files = [];
    }
    console.log('Read dir ' + dirName + ', file count: ' + files.length);
  }else{
    fileName = dirName + path.sep + lines[i];
    if(fs.existsSync(dirName + path.sep + files[fileIndex])){
      var oldName = dirName + path.sep + files[fileIndex],
      p = oldName.lastIndexOf('.'), ext;
      if(p < 0){
        ext = '';
      }else{
        ext = oldName.substring(p, oldName.length);   
      }
      
      fs.renameSync(oldName, fileName + ext);
      console.log('Rename: ' + files[fileIndex] + '->' + fileName);
    }
    fileIndex ++;
  }
}
