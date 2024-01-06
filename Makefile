initialize:
	docker compose build && \
	docker compose up -d postgres init app backup

backup:
	docker compose restart backup

restore:
	docker compose up restore

start:
	docker compose up -d postgres app backup

stop:
	docker compose down

prune:
	docker compose down -v --remove-orphans && \
	rm -rf ./postgres-data && \
	rm -rf ./backups