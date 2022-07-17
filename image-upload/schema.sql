DROP DATABASE IF EXISTS project2_db;
CREATE DATABASE project2_db;

USE project2_db;

CREATE TABLE IF NOT EXISTS `users_image` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `mob_no` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;