import csv
import io
import boto3
import urllib3

# Create an S3 client
s3 = boto3.client('s3')

def lambda_handler(event, context):
    # Get the object context data
    getObjectContext = event['getObjectContext']

    # Get the input and output details from the event
    userRequest = event['userRequest']
    url = getObjectContext['inputS3Url']
    outputRoute = getObjectContext['outputRoute']
    outputToken = getObjectContext['outputToken']

    # Get the CSV file content from the S3 pre-signed URL
    http = urllib3.PoolManager()
    response = http.request('GET', url)
    csv_content = response.data.decode('utf-8')

    # Create a CSV reader and redact the sensitive data
    csv_reader = csv.DictReader(io.StringIO(csv_content))
    redacted_rows = []
    for row in csv_reader:
        # Redact social_security_number and email
        row['social_security_number'] = 'REDACTED'
        row['email'] = 'REDACTED'
        redacted_rows.append(row)

    # Convert the redacted data back to CSV format
    redacted_data = io.StringIO()
    writer = csv.DictWriter(redacted_data, fieldnames=csv_reader.fieldnames)
    writer.writeheader()
    writer.writerows(redacted_rows)

    # Write the redacted data back to the output route
    s3.write_get_object_response(
        Body=redacted_data.getvalue(),
        RequestRoute=outputRoute,
        RequestToken=outputToken)