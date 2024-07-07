# Coacheta-API

## Table des matières


- [Description du Projet](#description-du-projet)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Contributeurs](#contributeurs)
- [Licence](#licence)

### Description du Projet

** Coacheta-API est l'API de l'application Coacheta, ici nous aurons les routes qui vont permettre de communiquer avec l'application et ainsi réaliser des opérations entre une action utilisateur et l'enregistrement de ses données.**

### Prérequis
- node
- npm
- yarn
- Docker

### Installation

1. Clonez le repository Back :
   ```sh
   git clone https://github.com/Kevw94/coacheta-back.git
   cd coacheta-back
   npm install```

2. lancer la base de données MongoDB avec docker :
	```bash
	docker compose up -d
	```

3. Se créer un compte MailJet

4. Créez un fichier .env:
Nous avons un .env.example comme exemple
Mettre ce .env
	```bash
	PORT=8010
	BASE_URL="http://localhost:8010"
	WHITELIST=["http://localhost:8081","http://127.0.0.1:8081","http://localhost:8081","*"]


	## MONGO SETTINGS
	MONGO_URI="mongodb://localhost:27090/"
	MONGO_DBNAME="coacheta"

	## JWT AUTH SETTINGS
	JWT_SECRET="ZzrfvzMalriT17o6cQtr4747JzBnPUOxhnXu70sv"
	COOKIE_SECURE=false
	COOKIE_SAMESITE=false

	# MAILJET
	# mettre son compte Mailjet
	MAILJET_USER=
	MAILJET_PASS=
	MAILJET_NOREPLY="coacheta@gmail.com"

	```

5. Lancez le back:
	```sh
	npm run dev
	```



### Contributeurs
- Kevin Pinero
- Guilhem Clarisse
- Mohamed Niaissa
- Stéphanie Boisne-Garnier

### Licence
Ce projet est sous licence MIT - [MIT licensed](LICENSE).

