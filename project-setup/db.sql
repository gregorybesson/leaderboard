-- phpMyAdmin SQL Dump
-- version 3.3.3
-- http://www.phpmyadmin.net
--
-- Serveur: localhost
-- Généré le : Dim 24 Février 2013 à 17:32
-- Version du serveur: 5.1.50
-- Version de PHP: 5.3.9-ZS5.6.0

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `leaderboard`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `clientid` int(11) NOT NULL,
  `apikey` varchar(45) NOT NULL,
  PRIMARY KEY (`apikey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`clientid`, `apikey`) VALUES
(2, 'key_first'),
(3, 'key_second'),
(4, 'key_third'),
(1, 'key_zero');

-- --------------------------------------------------------

--
-- Structure de la table `leaderboard`
--

CREATE TABLE IF NOT EXISTS `leaderboard` (
  `idleaderboard` int(11) NOT NULL,
  `user_iduser` int(11) NOT NULL,
  `client_apikey` varchar(45) NOT NULL,
  PRIMARY KEY (`idleaderboard`),
  KEY `fk_leaderboard_user1_idx` (`user_iduser`),
  KEY `fk_leaderboard_client1_idx` (`client_apikey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `leaderboard`
--

INSERT INTO `leaderboard` (`idleaderboard`, `user_iduser`, `client_apikey`) VALUES
(1, 1, 'key_zero'),
(2, 2, 'key_zero'),
(3, 3, 'key_first'),
(4, 4, 'key_first'),
(5, 5, 'key_first'),
(6, 6, 'key_second'),
(7, 7, 'key_second'),
(8, 8, 'key_third'),
(9, 9, 'key_third'),
(10, 10, 'key_zero');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `total_points` int(11) DEFAULT '200',
  `last_updt` datetime DEFAULT NULL,
  `last_points_updt` int(11) DEFAULT '1000',
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`iduser`, `total_points`, `last_updt`, `last_points_updt`) VALUES
(1, 651651, '2013-01-25 12:30:03', 321),
(2, 64846, '2013-01-01 12:30:03', 64),
(3, 646464, '2013-02-25 12:30:03', 968),
(4, 561531, '2013-01-22 12:30:03', 654),
(5, 65415, '2013-01-12 12:30:03', 849),
(6, 12315, '2013-01-09 12:30:03', 456),
(7, 615316, '2013-01-28 12:30:03', 65),
(8, 1651543, '2013-01-02 12:30:03', 65),
(9, 35165, '2013-02-11 12:30:03', 321),
(10, 165161, '2013-01-25 12:30:03', 1000);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD CONSTRAINT `fk_leaderboard_user1` FOREIGN KEY (`user_iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_leaderboard_client1` FOREIGN KEY (`client_apikey`) REFERENCES `client` (`apikey`) ON DELETE NO ACTION ON UPDATE NO ACTION;
