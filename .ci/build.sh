#!/bin/bash
##
## Description:
##
## Actual build script meant to be run inside the node docker container


source .ci/common.sh

GIT_BRANCH=$(echo $bamboo_repository_branch_name | sed 's/\//-/')
BUILD_NUMBER=${bamboo_buildNumber}
export VERSION=${GIT_BRANCH}-${BUILD_NUMBER}


if [ $UID -eq 0 ]; then
  info "Running as root dropping privileges"
  /usr/local/bin/su-exec builder $0
  exit $?
fi

info "Installing package dependencies..."
silent yarn install

info "Building..."
silent yarn build --dest mc
echo $VERSION > mc/version.html


info "Creating artifact with version ${VERSION}..."
tar czf mc-${VERSION}.tar.gz mc/ appspec.yml .deploy/

