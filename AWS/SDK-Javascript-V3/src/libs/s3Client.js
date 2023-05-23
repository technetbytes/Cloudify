
// Create service client module using ES6 syntax.
import { S3Client } from "@aws-sdk/client-s3";

// Set the AWS region
const REGION = "us-west-2";

// Create Amazon S3 service object.
const s3 = new S3Client({ region: REGION });

// Export 's3' constant.
export {s3};
             