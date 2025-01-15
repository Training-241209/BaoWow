cd into your pem key

```bash
sudo chmod 400 mykey.pem
```

```bash
ssh -i mykey.pem ec2-user@ec2-XX-XX-XX-XX.compute-1.amazonaws.com
```

Update package manager

```bash
sudo yum update -y
```

Install docker

```bash
sudo yum install docker -y
```

Start docker service

```bash
sudo service docker start
```

Add your user to docker group so you don’t need sudo for docker commands

```bash
sudo usermod -a -G docker ec2-user
```

Enable docker to start on boot

```bash
sudo systemctl enable docker
```

Verify Docker is installed and running

```bash
docker --version
docker ps
```

If the last command gives a permission error you need to log out and log back in

```bash
exit
ssh -i mykey.pem ec2-user@ec2-XX-XX-XX-XX.compute-1.amazonaws.com
docker ps
```

## Create Jenkins Container with Docker Access

```bash
docker run -d \
  --name jenkins \
  --restart=on-failure \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(which docker):/usr/bin/docker \
  jenkins/jenkins:lts
```

Then, we need to install Docker in the Jenkins container and set proper permissions:

```bash
# Enter the container as root
docker exec -u root -it jenkins bash

# Install Docker
apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce-cli

# Add jenkins user to docker group
groupadd -f docker
usermod -aG docker jenkins

# Fix permissions on Docker socket
chmod 666 /var/run/docker.sock

# Exit the container
exit

# Restart Jenkins container
docker restart jenkins
```

## Install Maven for Jenkins

```bash
docker exec -it -u root jenkins bash
apt-get update
apt-get install maven -y
```

Go to EC2 http://[Public_IPv4_address]:8080

Get the Jenkins initial password

```bash
docker logs jenkins
```
