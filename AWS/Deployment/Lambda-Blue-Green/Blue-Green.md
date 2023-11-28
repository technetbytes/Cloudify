# Apply Blue/Green Deployment Strategies
Today we are going to implement one of the most important deployment strategies of CI/CD and this Blue/Green deployment on AWS lambda function (which Serverless). In this deployment method we have two separate, but homogeneous running environments. The environment that executing current version of the application called Blue, while the second environment that executing the new or latest release of the application called Green.
Using this deployment strategy help in minimise downtime and risk. 

To demonstrate blue/green strategy we create a AWS lambda function. User can create Lambda function either by AWS console or AWS Cli option. For this post I'm using AWS console option.

Type Lambda in the AWS console search bar and create the function with name of "blue-green-testing"

Update the default code of the lambda function, check github repo.

To publish this function click Actions option on top right and select "Publish new version" and set it version to "Blue-version-1".

