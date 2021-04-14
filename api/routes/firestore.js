// var admin = require("firebase-admin");
// const {uuid} = require('uuidv4');

// var serviceAccount = require("../wildcat-roomie-firebase-adminsdk-zq7ts-7f4bd1c595.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: "wildcat-roomie.appspot.com"
// });

// var bucket = admin.storage().bucket();
// console.log(typeof bucket)

// var filename = "https://i.pinimg.com/564x/12/a8/c7/12a8c7a5cbe304b8b907f52b7896fc7b.jpg";

// async function uploadFile(filename) {
//   const metadata = {
//     metadata: {
//       // create download token
//       firebaseStorageDownloadTokens: uuid()
//     },
//     contentType: 'image/jpg',
//     cacheControl: 'public, max-age=31536000',
//   };
  
//   // Uploads a local file to the bucket
//   await bucket.upload(filename, {
//     // Support for HTTP requests made with `Accept-Encoding: gzip`
//     gzip: true,
//     metadata: metadata,
//     });

//     console.log(`${filename} uploaded.`);
// }

// uploadFile(filename);