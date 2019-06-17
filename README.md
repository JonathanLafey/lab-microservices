# lab-microservices

[Fleet Management System](https://github.com/spinning-spindle/lab-microservices/blob/master/3ms-event-opa.md)

## Setup

You'll need to install Docker and Docker Compose on your system, following the links below

1. Install [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
2. Install [Docker Compose](https://docs.docker.com/compose/install/)
3. (Optional) Install [Portainer](https://www.portainer.io/) for easy management of the containers and ease of access to their IPs/logs/shell

## Run

After having install Docker and Docker Compose, you simply have to create and run the containers.

Run `docker-compose up --build --detach` on the root of the project.

This should download all required images, create 2 mongodb databases, a rabbitmq server and fire up the 3 microservices.

## Usage

On microservices A and C you will find a postman collection that you can import, in order to have access on all exposed endpoints.

The said endpoints should give you the ability to list/view/add/edit/delete a car or a driver and assign a car to a driver.

Also, you will be able to see penalty points charged on a driver that was assigned to a car.

All the endpoints are using a variable for the host, so it's expected to create a postman environment.

## Known bugs or issues

* Even though deleting a car should stop the recurring heartbeat that produces messages about the car's status, this is not really happening and requires further debugging
* The geo coordinates of a car are randomly generated so they are not consistent
* The error handling must be fine-grained more
* It would be most appropriate if a validation middleware (like Joi) would be added