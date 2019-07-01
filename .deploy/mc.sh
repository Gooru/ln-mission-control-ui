#!/bin/bash
BASE_PATH=/var/www
DEPLOY_SERVICE=mc
SERVICE_BKP=mc-bkp
SERVICE=mission-control
USER=ubuntu
GROUP=ubuntu

checkStatus() {
  if [ $? -eq 0 ]; then
    echo "[info] '$moduleName' done"
  else
    echo "[warn] '$moduleName' failed" && exit 1
  fi
}

checkServiceDir() {
  moduleName=$1
  echo "[info] '$moduleName' initiated"
  [ -d $BASE_PATH/$DEPLOY_SERVICE ]
  checkStatus
}

renameServiceDir() {
  moduleName=$1
  echo "[info] '$moduleName' initiated"
  if [ -d $BASE_PATH/$SERVICE ]; then
    sudo rm -rf $BASE_PATH/$SERVICE_BKP
    sudo mv $BASE_PATH/$SERVICE $BASE_PATH/$SERVICE_BKP
    sudo mv $BASE_PATH/$DEPLOY_SERVICE $BASE_PATH/$SERVICE
  else
    sudo rm -rf $BASE_PATH/$SERVICE_BKP
    sudo mv $BASE_PATH/$DEPLOY_SERVICE $BASE_PATH/$SERVICE
  fi
}

updateOwnership() {
  moduleName=$1
  echo "[info] '$moduleName' initiated"
  sudo chown $USER:$GROUP $BASE_PATH/${SERVICE} -R
  checkStatus
}

reloadAppln() {
  moduleName=$1
  echo "[info] '$1' initiated"
  sudo systemctl reload nginx
  checkStatus
}

##After install steps
checkServiceDir "check mc dir"
renameServiceDir "rename mc dir"
updateOwnership "update ownership"
reloadAppln "application reload"

