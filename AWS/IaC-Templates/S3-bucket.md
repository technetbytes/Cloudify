# Using AWS Cloudformation setup S3 Bucket
In this demo we will look at how to create a S3 bucket using IaC tempate. To write a infrastructure code we used Cloudformation snippets.

Here is the complete YAML template of Cloudformatiom [S3-Bucket-Template](https://github.com/technetbytes/Cloudify/blob/main/AWS/IaC-Templates/S3-bucket.yaml)
    
````
AWSTemplateFormatVersion: 2010-09-09
## =================== DESCRIPTION =================== ##
Description: ---
  AWS CloudFormation S3 bucket template
  - Create a new S3 bucket without policy
Parameters: 
  paramS3Name:
    Description: Name of s3 bucket
    Type: String
    Default: 'test-s3bucket-using-iac'
Resources: 
  mytestings3Bucket:
    Type: 'AWS::S3::Bucket'
    DeletionPolicy: Delete #allow CloudFormation delete the bucket when stack is deleted
    Properties:
      BucketName: !Ref paramS3Name
      Tags:
        - Key: 'name'
          Value: 'testing-bucket'
Outputs:
  bucketName:
    Value: !Ref mytestings3Bucket
    Description: my testing bucket description
````

To create the above Cloudformation template we need to upload this on S3 buckut. To upload the IaC snippet we can either use aws console or aws-cli, here we are using aws-cli option and assuming that cli is pre-configured. To check the existing aws-cli configuration use the following command.

````
$ aws configure list
````
Here we are uploading the [S3-Bucket-Template](https://github.com/technetbytes/Cloudify/blob/main/AWS/IaC-Templates/S3-bucket.yaml) on our existing bucket called **su-bucket**.

````
$ aws s3 cp S3-bucket.yaml s3://su-bucket
````
To verify that file is copyed in the bucket use following command. You will get the file listing.

````
$ aws s3 ls s3://su-bucket
````
Now it a time to create Cloudformation stack with the uploaded script. So we need to specify the template-url in the command. One thing that is really important here is --template-url parameter want complete template file details, I mean in which region you upload the file. To get the region details using give s3 api.

````
aws s3api get-bucket-location --bucket su-bucket
````
Then, let's create the stack by using S3 object URL as template source!
````
$ aws cloudformation create-stack --stack-name test-s3bucket-demo --template-url https://subucket.s3.us-west-1.amazonaws.com/S3-bucket.yaml
````
To get to know the result of the above step, we can do either check the status executing cloudformation stack or directly take the listing of s3 bucket.

Using describe-stacks to get stack execution status or directly take S3 bucket listing.
````
aws cloudformation describe-stacks --stack-name test-s3bucket-demo
------------------------------------------------------------------
aws s3 ls
````