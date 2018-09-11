DROP TABLE IF EXISTS `dish_comment`;
DROP TABLE IF EXISTS `dish_accounting`;
DROP TABLE IF EXISTS `dish_balance`;
DROP TABLE IF EXISTS `dish_type`;
DROP TABLE IF EXISTS `wash_stats_materials`;
DROP TABLE IF EXISTS `wash_stats`;
DROP TABLE IF EXISTS `cleaning_material`;
DROP TABLE IF EXISTS `wash_period`;
DROP TABLE IF EXISTS `bed_linen_stats`;
DROP TABLE IF EXISTS `bed_linen_type`;
DROP TABLE IF EXISTS `vacancy_comment`;
DROP TABLE IF EXISTS `vacancy`;
DROP TABLE IF EXISTS `food_supply`;
DROP TABLE IF EXISTS `mealtime_category`;
DROP TABLE IF EXISTS `consumer`;
DROP TABLE IF EXISTS `task_comment`;
DROP TABLE IF EXISTS `task_location`;
DROP TABLE IF EXISTS `task`;
DROP TABLE IF EXISTS `location`;
DROP TABLE IF EXISTS `shift_comment_position`;
DROP TABLE IF EXISTS `shift_comment`;
DROP TABLE IF EXISTS `work_shift`;
DROP TABLE IF EXISTS `schedule`;
DROP TABLE IF EXISTS `employee`;
DROP TABLE IF EXISTS `user_role`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `position`;
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

CREATE TABLE IF NOT EXISTS `position` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `p_title` VARCHAR(127) NOT NULL UNIQUE,
  `pinned_to_comment` bit,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_login` VARCHAR(32) NOT NULL UNIQUE,
  `u_password` VARCHAR(32) NOT NULL,
  `position_id` BIGINT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`position_id`) REFERENCES `position`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `user_role` (
  `u_id` BIGINT NOT NULL,
  `r_id` BIGINT NOT NULL,
  PRIMARY KEY (`u_id`, `r_id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`r_id`) REFERENCES `role`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `employee` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT,
  `p_id` BIGINT NOT NULL,
  `e_forename` VARCHAR(32) NOT NULL,
  `e_surname` VARCHAR(32) NOT NULL,
  `e_patronymic` VARCHAR(32),
  `e_phone_number` VARCHAR(32),
  `e_info` VARCHAR(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`p_id`) REFERENCES `position`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `p_id` BIGINT NOT NULL,
  `start` TIME NOT NULL,
  `end` TIME NOT NULL,
  `uuid` VARCHAR(255),
  `created_at` TIMESTAMP,
  `expired` TIMESTAMP,
  `last_update` TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`p_id`) REFERENCES `position`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `shift_comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `c_message` VARCHAR(511) NOT NULL,
  `c_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `shift_comment_position` (
    `comment_id` BIGINT NOT NULL,
    `position_id` BIGINT NOT NULL,
    PRIMARY KEY (`comment_id`, `position_id`),
    FOREIGN KEY (`comment_id`) REFERENCES `shift_comment` (`id`),
    FOREIGN KEY (`position_id`) REFERENCES `position` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `location` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `l_title` VARCHAR(50) NOT NULL,
  `l_info` VARCHAR(127),
  CONSTRAINT `l_title_info` UNIQUE (`l_title`, `l_info`),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `task` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id_assignee` BIGINT,
  `u_id_delegator` BIGINT NOT NULL,
  `t_message` VARCHAR(1023),
  `t_status` VARCHAR(31) CHECK (`t_status` in ('REMOVED', 'OPENED', 'CLOSED', 'REJECTED', 'PENDING','IN_PROGRESS', 'EXPIRED', 'CHANGE')),
  `t_frequency` VARCHAR(31) CHECK (`t_frequency` in ('ONCE', 'DAILY', 'WEEKLY', 'MONTHLY')),
  `expired` TIMESTAMP,
  `updated` TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id_assignee`) REFERENCES `user`(`id`),
  FOREIGN KEY (`u_id_delegator`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `task_location` (
  `t_id` BIGINT NOT NULL,
  `l_id` BIGINT NOT NULL,
  PRIMARY KEY (`t_id`, `l_id`),
  FOREIGN KEY (`t_id`) REFERENCES `task`(`id`),
  FOREIGN KEY (`l_id`) REFERENCES `location`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `task_comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `t_id` BIGINT NOT NULL,
  `u_id` BIGINT NOT NULL,
  `c_message` VARCHAR(511) NOT NULL,
  `c_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`t_id`) REFERENCES `task`(`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `consumer` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `c_name` VARCHAR(127) NOT NULL UNIQUE,
  `c_description` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `mealtime_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `m_title` VARCHAR(127) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `food_supply` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `m_id` BIGINT NOT NULL,
  `u_id` BIGINT NOT NULL,
  `c_id` BIGINT NOT NULL,
  `l_id` BIGINT,
  `f_amount` INT NOT NULL,
  `f_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`m_id`) REFERENCES `mealtime_category`(`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`c_id`) REFERENCES `consumer`(`id`),
  FOREIGN KEY (`l_id`) REFERENCES `location`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `vacancy` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `p_id` BIGINT NOT NULL,
  `v_salary` VARCHAR(32),
  `v_status` VARCHAR(15) NOT NULL CHECK(`v_status` IN ('OPENED', 'CLOSED')),
  `v_info` VARCHAR(255) NOT NULL,
  `p_publication` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`p_id`) REFERENCES `position` (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `vacancy_comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `v_id` BIGINT NOT NULL,
  `c_message` VARCHAR(511) NOT NULL,
  `c_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`v_id`) REFERENCES `vacancy` (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `bed_linen_type` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `b_title` VARCHAR(127) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `bed_linen_stats` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `b_id` BIGINT NOT NULL,
  `b_amount` INT,
  `c_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`b_id`) REFERENCES `bed_linen_type`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `wash_period` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `w_period` VARCHAR(31) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `cleaning_material` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `m_title` VARCHAR(31) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `wash_stats` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `w_p_id` BIGINT NOT NULL,
  `c_id` BIGINT,
  `w_weight` INT,
  `date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`w_p_id`) REFERENCES `wash_period`(`id`),
  FOREIGN KEY (`c_id`) REFERENCES `consumer` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `wash_stats_materials` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `w_s_id` BIGINT NOT NULL,
  `m_id` BIGINT NOT NULL,
  `m_amount` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`w_s_id`) REFERENCES `wash_stats` (`id`),
  FOREIGN KEY (`m_id`) REFERENCES `cleaning_material`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `dish_type` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `d_title` VARCHAR(31) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `dish_balance` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `d_id` BIGINT NOT NULL,
  `l_id` BIGINT,
  `u_id` BIGINT NOT NULL,
  `d_amount` INTEGER NOT NULL,
  `date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`d_id`) REFERENCES `dish_type`(`id`),
  FOREIGN KEY (`l_id`) REFERENCES `location`(`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `dish_accounting` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `d_id` BIGINT NOT NULL,
  `l_id` BIGINT,
  `u_id` BIGINT NOT NULL,
  `d_delta` INTEGER NOT NULL,
  `date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`d_id`) REFERENCES `dish_type`(`id`),
  FOREIGN KEY (`l_id`) REFERENCES `location`(`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS `dish_comment` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `u_id` BIGINT NOT NULL,
  `d_id` BIGINT NOT NULL,
  `c_message` VARCHAR(511) NOT NULL,
  `c_date` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`d_id`) REFERENCES `dish_accounting` (`id`),
  FOREIGN KEY (`u_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
