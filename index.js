const fs = require('fs');
const request = require('request-promise');

let args = [];
args = process.argv.slice(2);

/**
 * Creates the request to be used to upload file.
 * @param {File} file to be uploaded
 * @param {String} fileName name of the file.
 */
function createRequest(file, fileName) {
  const options = {
    method: 'PUT',
    uri: 'https://transfer.sh/' + fileName,
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
  if (args.length == 0) {
    console.log('Error : No file provided');
    process.exit(-1);
  }
  const fileName = args[0];
  fs.readFile(__dirname + '/' + fileName, (err, data) => {
    if (err) {
      console.log(err);
      process.exit(-10);
    } else {
      createRequest(data, fileName);
    }
  });
}

main();
