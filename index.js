const fs = require('fs');
const request = require('request-promise');

let filePath = undefined; // Directory Path
let fileName = undefined; // File Name Without Extension. (IDK why im saving it)
let fileNameWithExtension = undefined; // File Name with Extension.
let fileExtension = undefined; // File Extension.
let finalPath = undefined; // Final path to access the file.

/**
 * Set global filePath, fileName and fileExtension
 */
function createFilePath() {
  const arg = process.argv.slice(2);

  if (arg.length != 1) {
    console.log('Enter filepath correctly');
    console.log('Either filename (if file in current directory) or fullpath');
    console.log('Example: node index.js (file or /path/to/file) ');
    process.exit();
  }

  const filePathArray = arg[0].split('/');
  const fullFileName = filePathArray[filePathArray.length - 1].split('.');

  fileName = fullFileName[0];
  fileExtension = fullFileName[1];
  filePath = filePathArray.slice(0, (filePathArray.length - 1)).join('/');

  if (filePath == '' && arg[0].indexOf('/') == -1) {
    filePath = __dirname;
  }
  filePath = filePath.concat('/');

  if (fileExtension != undefined) {
    fileNameWithExtension = fileName + '.' + fileExtension;
    finalPath = filePath + fileName + '.' + fileExtension;
  } else {
    fileNameWithExtension = fileName;
    finalPath = filePath + fileName;
  }

  console.log(fileName);
  console.log(filePath);
  console.log(fileExtension);
}

/**
 * Creates the request to be used to upload file.
 * @param {File} file to be uploaded
 * @param {String} fileName name of the file.
 */
function createRequest(file) {
  const options = {
    method: 'PUT',
    uri: 'https://transfer.sh/' + fileNameWithExtension,
    headers: {
      'User-Agent': 'curl/7.58.0', // Thanks @MSF-Jarvis
    },
    body: file,
  };

  request(options)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
}

/**  @namespace */
function main() {
  createFilePath();

  if (fs.lstatSync(finalPath).isDirectory()) {
    console.log('Enter filepath correctly');
    console.log('Either filename (if file in current directory) or fullpath');
    console.log('Example: node index.js (file or /path/to/file) ');
    process.exit();
  }
  fs.readFile(finalPath, (err, data) => {
    if (err) {
      console.log(err);
      process.exit(-10);
    } else {
      console.log(data);
      createRequest(data);
    }
  });
}

main();
