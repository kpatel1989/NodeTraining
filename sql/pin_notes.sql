-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2015 at 09:30 PM
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
-- Table structure for table `notes`
--

CREATE TABLE IF NOT EXISTS `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `description`) VALUES
(1, 'asd', 'awd'),
(2, 'asd', 'awd'),
(3, 'asd', 'awd'),
(4, 'asd', 'awdawd'),
(5, 'asd', 'awdawdawdad'),
(6, 'aw daw d', 'ad awdawd'),
(7, 'aw daw d', 'ad awdawd'),
(8, 'asdw', 'awdawd'),
(9, 'asdw', 'awdawd'),
(10, 'adwawd', 'awdawd');

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
