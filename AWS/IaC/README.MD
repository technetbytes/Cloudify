# AWS Cloudformation (IaC)

# *AWS EC2 Instance*
## All AMI-ID keys are store in Systems Manager Agent and to get the ami-id do the following steps

### Try to create an EC2 instance from the aws console
### Select required operating system from the give list, in this case we select Amazon Linux 2
![Amazon Linux 2 EC2 ](ami-id.png)

### Create an Amazon linux 2 EC2 instance (ami-0889a44b331db0194) [Basic EC2 Instance](ec2_instance_01.yaml) using AWS Cloudformation (IaC)<br/>
<br />

### **Using AWS CLI To Execute Cloudformation script**

<br />

### CREATE and DEPLOY YOUR STACK
___ 

```

$ aws cloudformation deploy --stack-name ec2-example --template-file ec2_instance_01.yaml --region us-east-1

Waiting for changeset to be created..
Waiting for stack create/update to complete
Successfully created/updated stack - ec2-example

```

***In case of error***

An error occurred (ValidationError) when calling the CreateChangeSet operation: Template format error: Unresolved resource dependencies [LatestAmiId] in the Resources block of the template.

```
$ aws cloudformation delete-stack --stack-name ec2-example
```

<br />

### Create an Amazon linux 2 EC2 dynamic instance [Dynamic EC2 Instance](dynamics_ec2.yaml) using AWS Cloudformation (IaC)<br/>

```
$ aws cloudformation update-stack --stack-name ec2-example --template-body file://dynamics_ec2.yaml --parameters ParameterKey=AvailabilityZone,ParameterValue=us-east-1a \
  ParameterKey=EnvironmentType,ParameterValue=dev ParameterKey=KeyPairName,ParameterValue=**key_file_name**
```

### DELETE YOUR STACK
___ 
```
$ aws cloudformation delete-stack --stack-name ***my-stack***
```

# *AWS Lambda Function*