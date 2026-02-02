# Mars.A.I — Guide d'installation

## Prérequis

- Node.js 18+
- MySQL (base `marsai` créée)
- npm

## Installation rapide

```bash
# 1. Cloner et se placer sur la branche
git checkout feature/full-festival-platform

# 2. Installer les dépendances
cd back && npm install
cd ../front && npm install
cd ..

# 3. Configurer la base de données
#    Éditer back/src/db/connection.js si vos identifiants MySQL diffèrent
#    Par défaut : user=root, password=rootroot, database=marsai, port=3306

# 4. Créer/mettre à jour les tables + utilisateurs de test
cd back && node src/db/seed.js

# 5. Lancer le backend
npm start
# ou : node index.js

# 6. Lancer le frontend (dans un autre terminal)
cd front && npm run dev
```

## Migration depuis l'ancienne base

Si vous aviez déjà une base `marsai` avec les anciennes tables :

```sql
-- Option 1 : Supprimer et recréer (recommandé)
DROP DATABASE marsai;
CREATE DATABASE marsai;

-- Puis relancer le seed :
-- cd back && node src/db/seed.js
```

Le `sequelize.sync({ alter: true })` créera toutes les tables automatiquement au lancement du backend ou du seed.

## Utilisateurs de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@marsai.io | admin123 |
| Jury | jury1@marsai.io | jury123 |
| Producteur | producer1@marsai.io | prod123 |

## URLs

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3000
- **Admin** : http://localhost:5173/admin-access (connexion avec admin@marsai.io)

## Structure des dossiers

```
back/
  src/
    controllers/    # Logique métier (Film, Auth, Jury, Award, Tag, SiteContent, User)
    db/             # Connexion Sequelize + seed
    middlewares/     # Auth JWT + Upload multer
    models/         # Sequelize models + associations (index.js)
    routes/         # Express routes
    utils/          # Helpers (password hash)
  uploads/
    videos/         # Fichiers MP4/MOV uploadés
    images/         # Thumbnails JPEG/PNG/WebP
  index.js          # Point d'entrée Express

front/
  src/
    api/            # Axios config + auth (page Login)
    components/     # Navbar, RoleGuard
    layouts/        # PublicLayout, AdminLayout
    pages/
      admin/        # AdminFilms, AdminJury, AdminAwards, AdminContent
      auth/         # Login, Register, AdminAccess
      jury/         # MyFilms
      public/       # Home, Films, Palmares, Soumettre
    services/       # API fetch layer (api.js)
    main.jsx        # Router
```
