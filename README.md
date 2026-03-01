[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/lmmHya3U)
# Starter Kit (kit de démarrage) pour le projet MarsAI

## Prérequis

- Node.js 24+ (nvm)
- Express
- MySQL 8+
- React.js avec Vite

## Avoir la dernière version LTS de Node.js

```sh
nvm install 24.13.0

nvm use 24.13.0
```

## Installer les dépendences front et back

```sh
npm install
```

## Lancer le serveur back

```sh
npm run back
```

## Lancer le serveur front

```sh
npm run front
```

---

## Deployment (Production)

### Sites

| Service | URL |
|---------|-----|
| **Frontend** | https://front-two-olive.vercel.app |
| **Backend API** | https://marsai-api.fly.dev |

### Stack utilisé

| Composant | Plateforme |
|-----------|-----------|
| Frontend (React + Vite) | **Vercel** |
| Backend (Node.js + Express) | **Fly.io** (1024 MB RAM, alpine) |
| Base de données (PostgreSQL) | **Fly Postgres** |

### Comptes de test

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| **Admin** | `admin1@marsai.test` | `password123` |
| **Jury** | `jury1@marsai.test` | `password123` |
| **Producer** | `producer1@marsai.test` | `password123` |

> Admin → `/admin` dashboard
> Jury → `/jury` dashboard
> Producer → profil + soumission de films
