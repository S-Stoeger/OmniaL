#!/usr/bin/env bash
set -e

TAG=$(date +"%d-%m-%y_%H-%M")

echo DELETING OLD BUILDS.....

cd ../frontend/docker
sudo rm -f -r dist

cd ../../backend/omnial/src/main/docker
rm -r omnial-1.0-SNAPSHOT-runner.jar

echo "----------------------------------"
echo SUCCESSFULLY DELETED
echo "----------------------------------"
echo CREATING AND MOVING BUILDS....

cd ../../../

mvn -D skipTests=true clean package
sudo mv ./target/omnial-1.0-SNAPSHOT-runner.jar ./src/main/docker/

cd ../../frontend
ng build
sudo mv dist ./docker/

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND MOVED BUILDS
echo "----------------------------------"


echo BUILDING AND PUSHING FRONTEND...

cd ../frontend/docker

#docker build --no-cache . -t ghcr.io/s-stoeger/shop-frontend:latest
#docker push ghcr.io/s-stoeger/shop-frontend:latest

docker build --no-cache . -t ghcr.io/s-stoeger/shop-frontend:$TAG -t ghcr.io/s-stoeger/shop-frontend:latest
docker push ghcr.io/s-stoeger/shop-frontend:$TAG
docker push ghcr.io/s-stoeger/shop-frontend:latest

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND PUSHED FRONTEND
echo "----------------------------------"

echo BUILDING AND PUSHING BACKEND....
cd ../../backend/omnial/src/main/docker

#docker build --no-cache . -t ghcr.io/s-stoeger/backend:latest
#docker push ghcr.io/s-stoeger/backend:latest
docker build --no-cache . -t ghcr.io/s-stoeger/backend:$TAG -t ghcr.io/s-stoeger/backend:latest
docker push ghcr.io/s-stoeger/backend:$TAG
docker push ghcr.io/s-stoeger/backend:latest

echo "----------------------------------"
echo SUCCESSFULLY BUILT AND PUSHED BACKEND
echo "----------------------------------"


cd ../../../../..

kubectl delete configmap nginx-config || echo "nginx-config does not yet exist"
kubectl create configmap nginx-config --from-file ./frontend/docker/default.conf

kubectl rollout restart deployment nginx
kubectl rollout restart deployment appsrv
kubectl get pods
