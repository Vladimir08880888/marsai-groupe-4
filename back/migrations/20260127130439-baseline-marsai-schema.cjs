'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      const queries = [
        `CREATE TABLE IF NOT EXISTS categorie (
          id_categorie int(11) NOT NULL AUTO_INCREMENT,
          nom varchar(255) NOT NULL,
          PRIMARY KEY (id_categorie)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

        `CREATE TABLE IF NOT EXISTS collaborateur (
          id_collaborateur int(11) NOT NULL AUTO_INCREMENT,
          civilite enum('Mme','Mr') NOT NULL DEFAULT 'Mr',
          prenom varchar(255) NOT NULL,
          nom varchar(255) NOT NULL,
          profession varchar(50) NOT NULL,
          email varchar(255) NOT NULL,
          PRIMARY KEY (id_collaborateur),
          UNIQUE KEY email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS evenement (
          id_evenement int(11) NOT NULL AUTO_INCREMENT,
          titre varchar(100) NOT NULL,
          description varchar(255) DEFAULT '',
          date date NOT NULL,
          lieu varchar(100) DEFAULT '',
          type enum('conference','projection','workshop') NOT NULL DEFAULT 'conference',
          PRIMARY KEY (id_evenement)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS utilisateur (
          id_utilisateur int(11) NOT NULL AUTO_INCREMENT,
          nom varchar(100) NOT NULL,
          prenom varchar(100) NOT NULL,
          email varchar(255) NOT NULL,
          password varchar(255) NOT NULL,
          tel varchar(20) NOT NULL,
          mobile varchar(20) NOT NULL,
          date_de_naissance date NOT NULL,
          rue varchar(50) NOT NULL,
          code_postal varchar(10) NOT NULL,
          ville varchar(50) NOT NULL,
          pays varchar(50) NOT NULL,
          biographie varchar(255) NOT NULL,
          metier_actuel varchar(255) DEFAULT NULL,
          portfolio varchar(255) NOT NULL,
          youtube varchar(255) NOT NULL,
          instagram varchar(255) NOT NULL,
          linkedin varchar(255) NOT NULL,
          facebook varchar(255) NOT NULL,
          tiktok varchar(255) NOT NULL,
          connu_mars_ia varchar(255) NOT NULL,
          role enum('ADMIN','JURY','REALISATEUR','PARTICIPANT') NOT NULL DEFAULT 'PARTICIPANT',
          PRIMARY KEY (id_utilisateur),
          UNIQUE KEY email (email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

        `CREATE TABLE IF NOT EXISTS film (
          id_film int(11) NOT NULL AUTO_INCREMENT,
          titre varchar(255) NOT NULL,
          traduction varchar(255) DEFAULT '',
          duree varchar(20) DEFAULT '',
          synopsis varchar(255) DEFAULT '',
          langue_principale varchar(100) DEFAULT '',
          synopsis_anglais varchar(255) DEFAULT '',
          lien_youtube varchar(255) DEFAULT '',
          sous_titre text DEFAULT NULL,
          outils_ia text DEFAULT NULL,
          vignette varchar(255) DEFAULT '',
          image2 varchar(255) DEFAULT '',
          image3 varchar(255) DEFAULT '',
          statut enum('soumis_selection','a_discuter','refuse','retenu','finaliste') NOT NULL DEFAULT 'soumis_selection',
          id_utilisateur int(11) NOT NULL,
          PRIMARY KEY (id_film),
          KEY idx_utilisateur (id_utilisateur)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

        `CREATE TABLE IF NOT EXISTS evaluation (
          id_evaluation int(11) NOT NULL AUTO_INCREMENT,
          note enum('OUI','A DISCUTER','NON') NOT NULL DEFAULT 'A DISCUTER',
          commentaire varchar(255) DEFAULT '',
          id_utilisateur int(11) NOT NULL,
          id_film int(11) NOT NULL,
          PRIMARY KEY (id_evaluation),
          UNIQUE KEY unique_eval (id_utilisateur,id_film),
          KEY idx_utilisateur (id_utilisateur),
          KEY idx_film (id_film)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS prix (
          id_prix int(11) NOT NULL AUTO_INCREMENT,
          nom_prix varchar(100) NOT NULL,
          annee_edition year(4) NOT NULL,
          prix varchar(100) NOT NULL,
          description_edition varchar(100) DEFAULT '',
          id_film int(11) NOT NULL,
          PRIMARY KEY (id_prix),
          KEY idx_film (id_film)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;`,

        `CREATE TABLE IF NOT EXISTS reservation (
          id_reservation int(11) NOT NULL AUTO_INCREMENT,
          nom varchar(100) NOT NULL,
          prenom varchar(100) NOT NULL,
          email varchar(255) NOT NULL,
          profession varchar(50) DEFAULT '',
          id_evenement int(11) NOT NULL,
          PRIMARY KEY (id_reservation),
          KEY idx_evenement (id_evenement)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS film_categories (
          id_film int(11) NOT NULL,
          id_categorie int(11) NOT NULL,
          PRIMARY KEY (id_film,id_categorie),
          KEY id_categorie (id_categorie)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,

        `CREATE TABLE IF NOT EXISTS collaborateur_film (
          id_collaborateur int(11) NOT NULL,
          id_film int(11) NOT NULL,
          PRIMARY KEY (id_collaborateur,id_film),
          KEY id_film (id_film)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,


        `ALTER TABLE film
          ADD CONSTRAINT film_ibfk_1
          FOREIGN KEY (id_utilisateur) REFERENCES utilisateur (id_utilisateur)
          ON DELETE CASCADE ON UPDATE CASCADE;`,

        `ALTER TABLE evaluation
          ADD CONSTRAINT evaluation_ibfk_1
          FOREIGN KEY (id_utilisateur) REFERENCES utilisateur (id_utilisateur)
          ON DELETE CASCADE ON UPDATE CASCADE,
          ADD CONSTRAINT evaluation_ibfk_2
          FOREIGN KEY (id_film) REFERENCES film (id_film)
          ON DELETE CASCADE ON UPDATE CASCADE;`,

        `ALTER TABLE prix
          ADD CONSTRAINT prix_ibfk_1
          FOREIGN KEY (id_film) REFERENCES film (id_film)
          ON DELETE CASCADE ON UPDATE CASCADE;`,

        `ALTER TABLE reservation
          ADD CONSTRAINT reservation_ibfk_1
          FOREIGN KEY (id_evenement) REFERENCES evenement (id_evenement)
          ON DELETE CASCADE ON UPDATE CASCADE;`,

        `ALTER TABLE film_categories
          ADD CONSTRAINT film_categories_ibfk_1 FOREIGN KEY (id_film) REFERENCES film (id_film) ON DELETE CASCADE ON UPDATE CASCADE,
          ADD CONSTRAINT film_categories_ibfk_2 FOREIGN KEY (id_categorie) REFERENCES categorie (id_categorie) ON DELETE CASCADE ON UPDATE CASCADE;`,

        `ALTER TABLE collaborateur_film
          ADD CONSTRAINT collaborateur_film_ibfk_1 FOREIGN KEY (id_collaborateur) REFERENCES collaborateur (id_collaborateur) ON DELETE CASCADE ON UPDATE CASCADE,
          ADD CONSTRAINT collaborateur_film_ibfk_2 FOREIGN KEY (id_film) REFERENCES film (id_film) ON DELETE CASCADE ON UPDATE CASCADE;`,
      ];

      for (const q of queries) {
        await queryInterface.sequelize.query(q, { transaction: t });
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      const drops = [
        `DROP TABLE IF EXISTS collaborateur_film;`,
        `DROP TABLE IF EXISTS film_categories;`,
        `DROP TABLE IF EXISTS reservation;`,
        `DROP TABLE IF EXISTS prix;`,
        `DROP TABLE IF EXISTS evaluation;`,
        `DROP TABLE IF EXISTS film;`,
        `DROP TABLE IF EXISTS utilisateur;`,
        `DROP TABLE IF EXISTS evenement;`,
        `DROP TABLE IF EXISTS collaborateur;`,
        `DROP TABLE IF EXISTS categorie;`,
      ];

      for (const q of drops) {
        await queryInterface.sequelize.query(q, { transaction: t });
      }
    });
  },
};