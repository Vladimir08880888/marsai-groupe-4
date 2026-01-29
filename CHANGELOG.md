# Mars.A.I — Journal des modifications

## Identifiants de test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Administrateur | `admin@marsai.io` | `admin123` |
| Jury | `jury1@marsai.io` | `jury123` |
| Producteur | `producer1@marsai.io` | `prod123` |

---

## Conventions adoptées (compatibilité branche main)

- **Authentification** : par email (pas username)
- **Noms de champs** : anglais, snake_case (`title`, `status`, `thumbnail`, `user_id`, etc.)
- **Tables** : minuscules avec `freezeTableName: true` (`users`, `films`, `tags`, etc.)
- **Timestamps** : `created_at` / `updated_at` (underscored)
- **Rôles** : ADMIN, JURY, PRODUCER
- **Statuts film** : `submitted`, `under_review`, `rejected`, `selected`, `finalist`

---

## Modifications réalisées

### Phase 1 — Modèles de base de données (Backend)

**Modèle Film** (`back/src/models/Film.js`) — champs :
- `title`, `original_title`, `translated_title` — titres multilingues
- `duration` — durée en secondes (INTEGER)
- `type` — ENUM : `hybride` ou `total_ia`
- `language` — langue principale du film
- `synopsis`, `synopsis_en` — synopsis multilingues (TEXT)
- `creative_process` — description du processus créatif (TEXT)
- `ai_tools` — outils IA utilisés (TEXT)
- `youtube_link` — lien YouTube
- `video_file` — chemin vers le fichier vidéo MP4/MOV uploadé
- `thumbnail`, `image_2`, `image_3` — images
- `subtitles` — fichier de sous-titres
- `rgpd_accepted` — consentement RGPD (BOOLEAN)
- `status` — ENUM : submitted/under_review/rejected/selected/finalist
- `user_id` — clé étrangère vers users

**Modèle User** (`back/src/models/User.js`) — champs : `first_name`, `last_name`, `email` (unique), `password`, `phone`, `mobile`, `birth_date`, `street`, `postal_code`, `city`, `country`, `biography`, `current_job`, `social_*`, `discovery_source`, `role`.

**Nouveaux modèles créés :**
- `Tag.js` — tags/étiquettes avec relation many-to-many via table `film_tags`
- `Award.js` — prix/récompenses avec relation many-to-many via table `film_awards` (supporte l'ex-aequo)
- `JuryAssignment.js` — assignation de films aux membres du jury
- `JuryVote.js` — votes du jury (`aime`/`aime_pas` + commentaire)
- `SiteContent.js` — contenu éditable du site (clé/valeur/type)
- `models/index.js` — fichier centralisé avec toutes les associations entre modèles

**Modèle supprimé :** `Video.js` (remplacé par le champ `video_file` dans Film)

---

### Phase 2 — Upload de fichiers (Backend)

- Installation de `multer` pour la gestion des uploads
- Middleware `middlewares/upload.js` :
  - Vidéos : MP4/MOV, taille max 300 Mo → stockées dans `uploads/videos/`
  - Images : JPEG/PNG/WebP → stockées dans `uploads/images/`
- Serveur Express configuré pour servir les fichiers statiques via `/uploads`

---

### Phase 3 — Contrôleurs et routes (Backend)

**FilmController** — refactorisé :
- `createFilm` : accepte `multipart/form-data`, vérifie le consentement RGPD, signale automatiquement les films sans vidéo (`under_review`)
- `getPublicFilms` : retourne uniquement les films `selected` et `finalist`

**Nouveaux contrôleurs :**
- `TagController` — CRUD des tags
- `AwardController` — CRUD des prix, assignation de films aux prix
- `JuryController` — assignation de films au jury, vote, consultation des assignations
- `SiteContentController` — lecture/mise à jour du contenu du site

**AuthController** — modifié :
- Login par email, JWT signe l'email
- L'inscription crée toujours un utilisateur avec le rôle `PRODUCER`
- Requiert `first_name`, `last_name`, `email`, `password`, `rgpd_accepted`

**Nouvelles routes :**

| Route | Description | Accès |
|-------|-------------|-------|
| `GET /films/public` | Films publics (selected/finalist) | Public |
| `GET /films` | Tous les films | ADMIN |
| `POST /films` | Soumettre un film (multipart) | PRODUCER, ADMIN |
| `GET/POST/DELETE /tags` | Gestion des tags | GET public, autres ADMIN |
| `GET/POST/PUT/DELETE /awards` | Gestion des prix | GET public, autres ADMIN |
| `POST /awards/:id/films` | Assigner un film à un prix | ADMIN |
| `GET /jury/assignments` | Toutes les assignations | ADMIN |
| `POST /jury/assign` | Assigner un film au jury | ADMIN |
| `GET /jury/votes` | Tous les votes | ADMIN |
| `GET /jury/my-assignments` | Mes assignations | JURY |
| `POST /jury/vote` | Voter | JURY |
| `GET /content` | Contenu du site | Public |
| `PUT /content` | Modifier le contenu | ADMIN |

**Supprimé :** routes et contrôleur Video

---

### Phase 4 — Authentification et navigation (Frontend)

- **Navbar** : bouton « Connexion » supprimé, remplacé par des liens FILMS / PALMARÈS / SOUMETTRE. Liens ADMIN et MES FILMS affichés selon le rôle. Burger menu pour mobile.
- **Inscription** (`/auth/register`) : rôle toujours PRODUCER, champs prénom/nom/email + case RGPD obligatoire
- **Accès admin** (`/admin-access`) : route cachée réservée aux administrateurs
- **Soumission** (`/soumettre`) : page avec login intégré si l'utilisateur n'est pas connecté

**Nouvelles routes frontend :**
- `/films` — sélection officielle des films
- `/palmares` — palmarès avec les prix et lauréats
- `/soumettre` — formulaire de soumission de film
- `/admin-access` — connexion admin (route cachée)
- `/admin/films` — gestion des films (admin)
- `/admin/jury` — gestion du jury et votes (admin)
- `/admin/awards` — gestion des prix (admin)
- `/admin/content` — édition du contenu du site (admin)
- `/jury/mes-films` — interface jury

---

### Phase 5 — Page d'accueil redessinée (Frontend)

- Bannière dynamique avec fond, titre et sous-titre depuis l'API (`SiteContent`)
- KPI : nombre de films et fond de prix, avec compte à rebours configurable
- Cartes de films simplifiées : aperçu 16:9, titre, réalisateur
- CTA adapté à la phase du festival :
  - Phase `inscription` → « INSCRIRE MON FILM »
  - Phase `vote` → « VOIR LES FILMS »
  - Phase `palmares` → « VOIR LE PALMARÈS »
- Section sponsors alimentée depuis `SiteContent`

---

### Phase 6 — Panneau d'administration (Frontend)

- **Films** (`/admin/films`) : liste avec filtre par statut, changement de statut, assignation au jury, suppression
- **Contenu** (`/admin/content`) : édition de la bannière, KPI, date du compte à rebours, phase du festival, sponsors (JSON)
- **Jury** (`/admin/jury`) : visualisation des assignations et des votes, suppression d'assignations
- **Prix** (`/admin/awards`) : création de prix, assignation de films (supporte l'ex-aequo)
- Sidebar de navigation avec liens vers chaque section

---

### Phase 7 — Interface jury (Frontend)

- **Mes films** (`/jury/mes-films`) : liste des films assignés, lecteur vidéo (MP4 ou YouTube), vote (`j'aime` / `j'aime pas` + commentaire), affichage du statut du vote
- Protection par `RoleGuard` pour le rôle JURY

---

### Responsive design

- Burger menu sur mobile (< 768px)
- Padding adaptatif (`px-4` mobile → `px-8` desktop)
- Grilles responsives : 1 colonne mobile → 2-3 colonnes desktop
- Tailles de texte adaptatives
