docker build -t dilicfrancis/multi-client:latest -t dilicfrancis/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t dilicfrancis/multi-server:latest -t dilicfrancis/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t dilicfrancis/multi-worker:latest -t dilicfrancis/multi-worker:$SHA -f ./worker/Dockerfile ./worker

#push both sets of tags
docker push dilicfrancis/multi-client:latest
docker push dilicfrancis/multi-client:$SHA
docker push dilicfrancis/multi-server:latest
docker push dilicfrancis/multi-server:$SHA
docker push dilicfrancis/multi-worker:latest
docker push dilicfrancis/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment client=dilicfrancis/multi-client:$SHA
kubectl set image deployments/server-deployment server=dilicfrancis/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=dilicfrancis/multi-worker:$SHA

#new-commands
#kubectl rollout restart deployment/server-deployment
#kubectl rollout restart deployment/client-deployment
#kubectl rollout restart deployment/worker-deployment
