# Layer 7 Load Balancing

Layer 7 load balancing or Application level load balancing is a technique to route traffic to your distributed backend (multiple servers) so as to distribute load evenly amongst servers.

Layer 7 (Application Layer) signifies that much of the routing logic is based on high level information present in the http layer which includes Urls, Host, and other information present in
the application message. All in all intelligent routing is possible here.

# Layer 7 load balancing A Node.js API using Nginx as a Reverse Proxy

To run this demo have nginx and docker installed.

## The index.js file essentially contains 4 routes.

1st route ("/") is essentially the index of the application

2nd route ("/app1") reprsents some application 1

3rd route ("/app2") represents some application 2

4th route ("/admin") is a restricted route 

We will now run our infrastructure using docker, The infrastructure will have 3 docker containers each running the same node applications on port 3333, 4444 & 5555.

First build the image using Dockerfile,

```sh
$ docker build -t nodeapp .
```

Now run 3 containers using the above image of our node app on port 3333, 4444 & 5555. We also pass in APPID as an environment variable using -e flag;

```sh
$ docker run --name nodeapp1 -d -e APPID=333 -p 3333:9999 nodeapp
$ docker run --name nodeapp2 -d -e APPID=444 -p 4444:9999 nodeapp
$ docker run --name nodeapp3 -d -e APPID=555 -p 5555:9999 nodeapp
```

Try accessing the api on localhost on port 3333, 4444 and 5555 to confirm everything is OK.

Now we need to start Nginx but before that you will need to delete the contents of nginx.conf file and replace it with contents of l7LoadBalancer.conf. nginx.conf is the
configuration file from where Nginx takes instructions on what to do and how to behave.

Read more about Nginx Configuration files and directives [here]

The configuration file is self explanatory once you know the semantics.

Start Nginx using the following command,

```sh
$ sudo nginx
```

## It essentially does the following

1. All the traffic to the index route ("/") is distributed to the 3 servers using Round Robin Algorithm which is default. The index route is the most accessed so all 3 servers are assigned to it.

![Route1](https://user-images.githubusercontent.com/38208071/122178420-31c6c280-cea4-11eb-9bcd-cd8817facaec.gif)

2. ("/app1") is assumed to be not accessed as frequently as the index route however it still has significant load so we assign 2 servers (AppId 333 and 444 Servers) to it.

![Route2](https://user-images.githubusercontent.com/38208071/122178437-368b7680-cea4-11eb-90c6-0391994694e4.gif)

3. ("/app2") is assumed to recieve much less traffic so a single Server (AppId 555) is assigned to it

![Route3](https://user-images.githubusercontent.com/38208071/122178474-4014de80-cea4-11eb-839f-68cd13d940c3.gif)

4. ("/admin") is a restricted route so we disable it for http traffic and return 403

![Forbidden_error](https://user-images.githubusercontent.com/38208071/122178505-4440fc00-cea4-11eb-93bd-187da4023dfd.JPG)



# Nginx resources

https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/
https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/


[here]: <https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/>
