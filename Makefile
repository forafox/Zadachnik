.env:
	cp .env.example .env

include .env

FRONTEND_IMAGE_NAME ?= zadachnik-frontend
BACKEND_IMAGE_NAME ?= zadachnik-backend

# Version of frontend component
# They are separated so that you could update backend and frontend
# independetly
FRONTEND_VERSION ?= 0.13.0
BACKEND_VERSION ?= 0.15.3

# Version of application that will be deployed to Customer server (i.e. Helios)
VERSION ?= 0.0.1

REGISTRY_URI ?= fegor04

FRONTEND_IMAGE = ${REGISTRY_URI}/${FRONTEND_IMAGE_NAME}:${FRONTEND_VERSION}
BACKEND_IMAGE = ${REGISTRY_URI}/${BACKEND_IMAGE_NAME}:${BACKEND_VERSION}
POSTGRES_IMAGE=postgres:17.2
TRAEFIK_IMAGE=traefik:3.2

export

all: build-backend build-frontend

build-backend: backend
	cd backend && ./gradlew bootBuildImage --imageName=${BACKEND_IMAGE}

push-backend: 
	docker push ${BACKEND_IMAGE}

build-frontend: frontend
	cd frontend && docker build . -t ${FRONTEND_IMAGE}

push-frontend: 
	docker push ${FRONTEND_IMAGE}

dev-up:
	docker compose -f docker-compose.dev.yaml up -d

dev-down:
	docker compose -f docker-compose.dev.yaml down

dev-up-postgres:
	docker compose -f docker-compose.dev.yaml up postgres -d

prod-up:
	docker compose -f docker-compose.yaml up -d

prod-down:
	docker compose -f docker-compose.yaml down

build-frontend-dist:
	cd frontend && pnpm run build

build-backend-jar:
	cd backend && ./gradlew bootJar


deploy-helios: 
	cd ansible && \
		ansible-playbook helios.yaml --extra-vars "version=${VERSION}"
