-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2015 at 02:43 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pin_notes`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `adminId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `admin` (`adminId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `adminId`) VALUES
(2, 'asd', 1),
(3, '123', 1),
(4, '2222grp', 3),
(5, 'a sdasdasd', 3),
(6, 'asd', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` text,
  `userId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `groupId` (`groupId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `description`, `userId`, `groupId`) VALUES
(22, 'asdasd', 'adwdawd', 1, NULL),
(23, 'ert', 'zcx', 1, NULL),
(24, '222', 'asdsd', 3, NULL),
(25, 'asd grp', 'desc', 1, 2),
(26, '123 title', 'desc', 1, 3),
(27, '123 t1', 'asdasd', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emailId` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emailId_UNIQUE` (`emailId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `emailId`, `password`) VALUES
(1, 'katk.1989@gmail.com', 'kartik'),
(3, 'kartik.patel@inknowledge.com', 'kartik'),
(4, 'asd@asd.com', 'asd'),
(5, 'asd@ad.asc', 'asd'),
(6, 'asd@qwe.df', '123'),
(7, 'asd@qwe.df123123', 'asd');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `fk_group_admin_id` FOREIGN KEY (`adminId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_group_notes` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_notes` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
