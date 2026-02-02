-- Добавить новые колонки в таблицу evenement
ALTER TABLE `evenement`
ADD COLUMN IF NOT EXISTS `heure` VARCHAR(10) DEFAULT '' AFTER `date`,
ADD COLUMN IF NOT EXISTS `places_max` INT DEFAULT 0 AFTER `lieu`,
ADD COLUMN IF NOT EXISTS `coach` VARCHAR(100) DEFAULT '' AFTER `places_max`;

-- Вставить примеры данных для конференций
INSERT INTO `evenement` (`titre`, `description`, `date`, `heure`, `lieu`, `type`, `places_max`, `coach`) VALUES
('Accueil & Café Networking', 'Bienvenue au festival MARS.AI', '2026-06-13', '09:30', 'La Plateforme', 'conference', 0, ''),
('Conférence d''ouverture : L''IA au service du Cinéma', 'Keynote principale du festival', '2026-06-13', '10:30', 'Salle des Sucres', 'conference', 0, ''),
('Déjeuner Libre', 'Pause déjeuner', '2026-06-13', '13:00', 'La Plateforme', 'conference', 0, ''),
('Projection Sélection Officielle', 'Projection des films finalistes', '2026-06-13', '14:30', 'Salle des Sucres', 'projection', 0, ''),
('Table Ronde : Futurs Souhaitables', 'Discussion sur les futurs souhaitables', '2026-06-13', '16:30', 'Salle Plaza', 'conference', 0, ''),
('Grand Prix & Cérémonie de Clôture', 'Remise des prix MARS.AI', '2026-06-13', '19:00', 'Salle des Sucres', 'conference', 0, ''),
('MARS.A.I Night - DJ Set Immersif', 'Soirée de clôture', '2026-06-13', '21:00', 'La Plateforme', 'conference', 0, '');

-- Вставить примеры данных для workshops
INSERT INTO `evenement` (`titre`, `description`, `date`, `heure`, `lieu`, `type`, `places_max`, `coach`) VALUES
('GÉNÉRATION VIDÉO : LES BASES', 'Apprenez les fondamentaux de la génération vidéo par IA', '2026-06-13', '14h30', 'Salle Workshop A', 'workshop', 15, 'THOMAS AUBERT'),
('IA & SCÉNARIO : CO-ÉCRITURE', 'Techniques de co-écriture avec l''IA', '2026-06-13', '15h45', 'Salle Workshop B', 'workshop', 15, 'THOMAS AUBERT'),
('POST-PROD IA & EFFETS SPÉCIAUX', 'Post-production et effets spéciaux avec l''IA', '2026-06-13', '17h00', 'Salle Workshop A', 'workshop', 15, 'THOMAS AUBERT'),
('ÉTHIQUE & DROIT DE L''IA', 'Questions éthiques et juridiques de l''IA', '2026-06-13', '18h15', 'Salle Workshop B', 'workshop', 15, 'NICOLAS LAMBERT');

-- Вставить примеры фильмов
INSERT INTO `film` (`titre`, `traduction`, `duree`, `synopsis`, `statut`, `id_utilisateur`) VALUES
('PROTOCOL ALPHA', 'Protocole Alpha', '60s', 'Un voyage dans le futur de Marseille', 'finaliste', 1),
('NEURAL DREAM', 'Rêve Neural', '60s', 'Exploration des rêves générés par IA', 'finaliste', 1),
('CYBER MARSEILLE', 'Cyber Marseille', '60s', 'Marseille en 2050', 'finaliste', 1);
