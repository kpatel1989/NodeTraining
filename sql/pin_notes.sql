-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2015 at 04:50 PM
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `adminId`) VALUES
(2, 'asd', 1),
(3, '123', 1),
(4, '2222grp', 3),
(5, 'a sdasdasd', 3),
(6, 'asd', 1),
(7, 'gp1', 3),
(8, 'gp2', 1),
(9, 'gewr1', 3);

-- --------------------------------------------------------

--
-- Table structure for table `group_association`
--

CREATE TABLE IF NOT EXISTS `group_association` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `group_id` (`groupId`,`userId`),
  KEY `user_id` (`userId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `group_association`
--

INSERT INTO `group_association` (`id`, `groupId`, `userId`, `approved`) VALUES
(7, 7, 1, 1),
(8, 8, 3, 1),
(9, 3, 3, 1),
(10, 4, 1, 1);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `description`, `userId`, `groupId`) VALUES
(22, 'asdasd', 'adwdawd', 1, NULL),
(24, '222', 'asdsd', 3, NULL),
(25, 'asd grp', 'desc', 1, 2),
(26, '123 title', 'desc', 1, 3),
(27, '123 t1', 'asdasd', 1, 3),
(28, 'asd', 'asdasd', 1, NULL),
(32, 'aw1231', '2 312313as dasdsaw dawd', 3, NULL),
(33, 'jhn', 'yfghjasd asda', 3, NULL),
(35, 'a sd', 'asda', 3, NULL),
(36, 'as d', 'asd asda dadasd', 3, NULL),
(37, 'asd', 'awas dasda sdasd', 3, NULL),
(43, 'awd awdawd', 'awd awdawd w123123', 3, NULL),
(44, 'ttt123aw d', 'dddaw dawd awdas dawdawd awdawd', 3, 7),
(45, 'awd awd', ' daw dawdawd awd awd', 3, 7),
(46, 'sync', 'hurray  !!!', 3, 7),
(47, 'wdawdq dqw qw', 'ad da 321231213 ad adawaw da wd', 3, 7),
(48, 'wd awdawdaw', 'awd a', 3, NULL),
(49, 'w dawdawd', 'aw da', 3, 7),
(50, 'd awd', 'aw dawa dawdawd', 3, 7),
(51, 'Q Sqs', 'Q qs', 3, 7),
(52, 'aw dawd', 'awd awd#$#$@#$@#$@', 3, 7),
(53, 'd awdawd', ' dawda', 3, 7);

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
-- Constraints for table `group_association`
--
ALTER TABLE `group_association`
  ADD CONSTRAINT `fk_association_group_id` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_association_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_group_notes` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_notes` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
