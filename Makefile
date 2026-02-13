all:
	docker compose up -d --build

build:
	docker compose build

up:
	docker compose up

test:
	cd backend && npm run test:e2e

down:
	docker-compose down

clean:
	rm -rf backend/data/database.sqlite
