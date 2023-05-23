const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "AKIAVWLANWHXBIOLVIVP",
    secretAccessKey: "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",
});

const listBuckets = (s3) => {
    s3.listBuckets(function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
			console.log("=============")
          console.log("Success", data.Buckets);
        }
    });
}

listBuckets(s3)

const listDirectories = params => {
  return new Promise ((resolve, reject) => {
    const s3params = {
      Bucket: 'ahsantest01',
      MaxKeys: 20,
      Delimiter: '/',
    };
    s3.listObjectsV2 (s3params, (err, data) => {
      if (err) {
        reject (err);
      }
      resolve (data);
	  console.log("=======*======")
    });
  });
};


//listDirectories(s3)