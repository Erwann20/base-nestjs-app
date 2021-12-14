# Nest base app

### Requirements:

- Docker
- and that's all :)

### Start project

- Start the script dcUp
- Wait until all services are started
- And dev

### Detail of the docker stack

- Database with mysql v8.0 (port: 3306): `docker exec -it nestbaseapp_database_1 mysql`
- Database with phpmtadmin (port: 8888): `http://locahost:8888`
- Database with nestjs (port: 5000): `http://locahost:5000` et `docker exec -it nestbaseapp_nest_1 bash`

### Command nest in nestjs container
- `nest g resource [ServiceName]`

