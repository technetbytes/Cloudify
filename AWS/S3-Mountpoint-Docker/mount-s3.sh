#!/bin/bash
docker run --name s3mount-test --device /dev/fuse --cap-add SYS_ADMIN -v ~/.aws:/root/.aws -it s3-mountpoint bash