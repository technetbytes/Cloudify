import { S3Client } from "@aws-sdk/client-s3";
import {fromIni}  from "@aws-sdk/credential-providers";
import { ListBucketsCommand } from "@aws-sdk/client-s3";

// Set the AWS region
const REGION = "us-west-2";

// Create Amazon S3 service object.
const s3 = new S3Client({ region: REGION, credentials: fromIni({profile: 'default'}) });

export const main = async () => {
  const command = new ListBucketsCommand({});

  try {
    const { Owner, Buckets } = await s3.send(command);
    console.log(
      `${Owner.DisplayName} owns ${Buckets.length} bucket${
        Buckets.length === 1 ? "" : "s"
      }:`
    );
    console.log(`${Buckets.map((b) => ` • ${b.Name}`).join("\n")}`);
  } catch (err) {
    console.error(err);
  }
};

main()