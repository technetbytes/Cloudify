import boto3

# Create an S3 client
s3 = boto3.client('s3')

def lambda_handler(event, context):
  
    object_lambda_access_point_arn = 'YOUR-S3-OBJECT-LAMBDA-ACCESS-POINT-ARN'
    transformed = s3.get_object(
      Bucket=object_lambda_access_point_arn,
      Key='original.csv')
      
    print(transformed['Body'].read().decode('utf-8'))