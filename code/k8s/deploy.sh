#!/usr/bin/env bash
set -e

# docker package names cannot contain uppercase letters:
LC_GH_USER_NAME=s-stoeger
BACKEND_IMAGE_NAME=ghcr.io/$LC_GH_USER_NAME/backend:latest
FRONTEND_IMAGE_NAME=ghcr.io/$LC_GH_USER_NAME/shop-frontend:latest

export BACKEND_IMAGE_NAME
export FRONTEND_IMAGE_NAME


echo Building Frontend ...

cd ../frontend/
ng build
sudo rm -f -r /docker/dist
sudo mv dist /docker/
cd ./docker 

docker build . -t ghcr.io/s-stoeger/shop-frontend:latest
docker push ghcr.io/s-stoeger/shop-frontend:latest

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND PUSHED FRONTEND
echo "----------------------------------"

echo Building backend...
cd ../../backend/omnial/

sudo rm -f omnial-1.0-SNAPSHOT-runner.jar
mvn -D skipTests=true clean package

sudo mv ./target/omnial-1.0-SNAPSHOT-runner.jar ./src/main/docker/

cd ./src/main/docker

docker build . -t ghcr.io/s-stoeger/backend:latest
docker push ghcr.io/s-stoeger/backend:latest

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND PUSHED BACKEND
echo "----------------------------------"


cd ../../../../..

kubectl delete configmap nginx-config || echo "nginx-config does not yet exist"
kubectl create configmap nginx-config --from-file ./frontend/docker/default.conf

kubectl get pods

