DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `comment`;
DROP TABLE IF EXISTS `work_shift`;
DROP TABLE IF EXISTS `schedule`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `position`;
DROP TABLE IF EXISTS `user_role`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `role_permission`;
DROP TABLE IF EXISTS `role`;
DROP TABLE IF EXISTS `permission`;

CREATE TABLE IF NOT EXISTS `permission` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `p_name` VARCHAR(32) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `r_name` VARCHAR(32) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `role_permission` (
  `r_id` BIGINT NOT NULL,
  `p_id` BIGINT NOT NULL,
  PRIMARY KEY (`r_id`, `p_id`),
  FOREIGN KEY (`r_id`) REFERENCES `role`(`id`),
  FOREIGN KEY (`p_id`) REFERENCES `permission`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_login` VARCHAR(32) NOT NULL UNIQUE,
  `u_password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `user_role` (
  `u_id` BIGINT NOT NULL,
  `r_id` BIGINT NOT NULL,
  PRIMARY KEY (`u_id`, `r_id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`r_id`) REFERENCES `role`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `position` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `p_title` VARCHAR(127) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `employee` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `p_id` BIGINT NOT NULL,
  `e_forename` VARCHAR(32) NOT NULL,
  `e_surname` VARCHAR(32) NOT NULL,
  `e_patronymic` VARCHAR(32),
  `e_phone_number` VARCHAR(32),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`p_id`) REFERENCES `position`(`id`),
  CONSTRAINT `u_p_id` UNIQUE (`u_id`, `p_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `p_id` BIGINT NOT NULL,
  `start` TIME NOT NULL,
  `end` TIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`p_id`) REFERENCES `position`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `work_shift` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT,
  `s_id` BIGINT NOT NULL,
  `date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`s_id`) REFERENCES `schedule`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `w_shift_id` BIGINT NOT NULL,
  `c_message` VARCHAR(511) NOT NULL,
  `c_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`w_shift_id`) REFERENCES `work_shift`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `location` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `l_title` VARCHAR(50) NOT NULL,
  `l_info` VARCHAR(127),
  CONSTRAINT `l_title_info` UNIQUE (`l_title`, `l_info`),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;