# Start from a base Ubuntu image
FROM ubuntu:latest

LABEL manteiner="Saqib Ullah Siddiqui <saqibullah@msn.com>"

# -- Layer: Image Metadata
ARG build_date

LABEL org.label-schema.build-date=${build_date}
LABEL org.label-schema.name="Base Ubuntu OS Image - based on AWS S3 mountpoint"
LABEL org.label-schema.description="latest Ubuntu base docker image, which configured with AWS S3 mountpoint library."
LABEL org.label-schema.url="https://github.com/technetbytes/Cloudify/AWS/S3-Mountpoint-Docker"
LABEL org.label-schema.schema-version="1.0"

# Set environment variables
ENV AWS_PROFILE=<AWS_PROFILE>

ENV S3_BUCKET=<BUCKET_NAME>
ENV MOUNT_PATH=/mount_s3

RUN ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    apt-get update && \
    apt-get install -y awscli wget python3 fuse libfuse2 && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    wget https://s3.amazonaws.com/mountpoint-s3-release/latest/arm64/mount-s3.deb && \
    dpkg -i mount-s3.deb && \
    apt clean && \
    mkdir $MOUNT_PATH && \
    rm -rf /var/lib/apt/lists/* /mount-s3.deb

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]