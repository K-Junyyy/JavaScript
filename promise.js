let request = require("request");

// API url
let url = "http://info.cern.ch/";

// function main() {
//   let res = request(url, function (error, response) {
//     if (!error && response.statusCode == 200) {
//       //console.log(response.body);
//     }
//   });
//   console.log(res.body);
// }

// main();

function doRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response) {
      if (!error && response.statusCode == 200) {
        resolve(response);
      } else {
        reject(error);
      }
    });
  });
}
async function main() {
  doRequest(url).then(function (res) {
    console.log(res.body);
  });
}

main();

// function doRequest(url) {
//   return new Promise(function (resolve, reject) {
//     request(url, function (error, response) {
//       if (!error && response.statusCode == 200) {
//         resolve(response);
//       } else {
//         reject(error);
//       }
//     });
//   });
// }
// async function main() {
//   let res = await doRequest(url);
//   console.log(res.body);
// }

// main();
