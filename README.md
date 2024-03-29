# Informační systém Centrin  
![version](https://img.shields.io/badge/version-1.0.0-blue)
![contributors](https://img.shields.io/badge/contributors-1-green)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/broz07/centrin-nextjs)
![license](https://img.shields.io/badge/license-MIT-green)


Tento projekt vznikl jako výsledek bakalářské práce a je zaměřen na zlepšení správy a efektivity provozního úseku domova důchodců. Informační systém poskytuje řešení pro centralizované sledování a správu různých aspektů denního provozu v domově důchodců, což přináší výhody v organizaci a poskytování péče seniorům.

## Použité technologie
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)


## Instalace a spuštění

>❗ Pro spuštění je nutné mít nainstalovaný [Docker](https://www.docker.com/) a [Docker Compose](https://docs.docker.com/compose/) ❗

### Instalace a spuštění Docker

#### Windows a MacOS
1. Stáhněte si [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Spusťte instalaci
3. Po dokončení instalace spusťte Docker Desktop

#### Linux
1. Nastavte si repozitář Dockeru
```bash
# Přidání oficiálního Docker GPG klíče:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Přidání oficiálního Docker repozitáře do zdrojů apt:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
>❗ Pokud používáte odvozenou distribuci Ubuntu, například Linux Mint, může být nutné použít UBUNTU_CODENAME místo VERSION_CODENAME ❗

2. Nainstalujte poslední verzi Dockeru
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Ověřte, že je Docker nainstalován a funguje
```bash
sudo docker run hello-world
```

4. Pokud service Dockeru není spuštěná, spusťte ji
```bash
sudo service docker start
```

### Instalace a spuštění projektu

* Stáhněte si projekt
```bash
git clone https://github.com/broz07/centrin-nextjs.git
```

* Přejděte do složky projektu
```bash
cd centrin-nextjs
```

* Spusťte inicializaci projektu
>❗ Projekt používá Makefile, který je dostupný pouze na Linuxu a MacOS ❗

```bash
# MacOS a Linux
make initialize 

# Windows
docker compose build && \
docker compose up -d postgres init app backup
```

* Po dokončení inicializace je projekt dostupný na adrese [`http://localhost:3000`](http://localhost:3000) a databáze na adrese `localhost:5432`

## Další příkazy

### Spuštění předtím inicializovaného projektu
```bash
# MacOS a Linux
make start

# Windows
docker compose up -d postgres app backup
```


### Zastavení projektu
```bash
# MacOS a Linux
make stop

# Windows
docker compose down
```

### Zastavení projektu a smazání všech dat
```bash
# MacOS a Linux
make purge

# Windows
docker compose down -v --remove-orphans && \
rm -rf ./postgres-data && \
rm -rf ./backups
```

### Zálohování databáze
```bash
# MacOS a Linux
make backup

# Windows
docker compose up backup
```

### Obnovení databáze z nejnovější zálohy
```bash
# MacOS a Linux
make restore

# Windows
docker compose up restore
```

