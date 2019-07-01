#!/bin/bash
##
## Description:
##
## Deploy script this script should able to deploy
## to any environmnet QA/Prod/Staging using AWS Code Deploy.
##
## Required environmnet variables
##
## - S3_BUCKET             the S3 bucket where the deployment artifacts are stored
## - AWS_ACCESS_KEY_ID     the AWS key id
## - AWS_SECRET_ACCESS_KEY the AWS secret
## - AWS_DEFAULT_REGION    the AWS region
## - CODE_DEPLOY_APP_NAME  the CodeDeploy application name
## - DEPLOYMENT_GROUP      the CodeDeploy deployment group
##


#Ensure that we run in bash not sh
if [ "$(ps -p "$$" -o comm=)" != "bash" ]; then
  # Taken from http://unix-linux.questionfor.info/q_unix-linux-programming_85038.html
  bash "$0" "$@"
  exit "$?"
fi

set -e

RED="\e[31m"
GREEN="\e[32m"
NORMAL="\e[0m"

function error() {
  echo -e "\n$RED-------> $1 $NORMAL"
}

function info() {
  echo -e "\n$GREEN-------> $1 $NORMAL"
}

function wait_for_deployment() {

  local deployment_id=$1
  local deployment_status_cmd="aws deploy get-deployment --deployment-id ${deployment_id} --query deploymentInfo.status"
  local deployment_status=$($deployment_status_cmd | tr -d '"')

  info "Checking status of deployment \"$deployment_id\""

  while true; do
    info "Current deployment status \"$deployment_status\""
    if [ "$deployment_status" == "Succeeded" ]; then
      info "Deployment successful"
      return 0
    fi

    if [ "$deployment_status" == "Failed" ]; then
      error "Deployment failed"
      echo "---------------------"
      return 1
    fi

    sleep 10
    deployment_status=$($deployment_status_cmd | tr -d '"')
  done
}

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ] || [ -z "$AWS_DEFAULT_REGION" ]; then
  error "No AWS credentials provided"
  exit 1
fi

if [ -z "$S3_BUCKET" ]; then
  error "No S3 bucket provided"
  exit 1
fi

if [ -z "$DEPLOYMENT_GROUP" ] || [ -z "$CODE_DEPLOY_APP_NAME" ]; then
  error "No deployment group or application name provided"
  exit 1
fi

GIT_BRANCH=$(echo ${bamboo_planRepository_branch} | sed 's/\//-/' )
BUILD_NUMBER=${bamboo_buildNumber}
VERSION=${GIT_BRANCH}-${BUILD_NUMBER}

DEPLOYMENT_ID=$(aws deploy create-deployment \
  --application-name "${CODE_DEPLOY_APP_NAME}" \
  --s3-location "bucket=${S3_BUCKET},key=frontend-30/builds/${GIT_BRANCH}/mc-${VERSION}.tar.gz,bundleType=tar" \
  --deployment-group-name "${DEPLOYMENT_GROUP}" --query deploymentId | tr -d '"')

info "Deployment \"$DEPLOYMENT_ID\" created"

wait_for_deployment $DEPLOYMENT_ID
