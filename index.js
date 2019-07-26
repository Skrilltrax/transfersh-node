const fs = require('fs');
const request = require('request-promise');

let args = [];
args = process.argv.slice(2);

/**
 * Creates the request to be used to upload file.
 * @param {File} file to be uploaded
 */
function createRequest(file) {
  const options = {
    method: 'PUT',
    uri: 'https://transfer.sh/' + file.name,
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
  } else {
    const file = fs.createReadStream(__dirname + '/' + args[0]);
    if (file == undefined) {
      console.log('Error reading file');
      process.exit();
    } else {
      createRequest(file);
    }
  }
}

main();
