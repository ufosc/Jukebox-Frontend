#!/bin/bash

set -e

BUCKET_NAME="jukebox-client-631bab280a434e28995fd3fcafd1fa5a"
APP_DIRNAME="jukebox-client"

npm run build
aws s3 cp ./dist "s3://$BUCKET_NAME/$APP_DIRNAME" --recursive
