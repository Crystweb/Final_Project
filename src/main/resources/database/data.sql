INSERT INTO `role` (`r_name`) VALUES ('admin');
INSERT INTO `role` (`r_name`) VALUES ('manager');

INSERT INTO `user` (r_id, u_login, u_password) VALUES (1, 'rostyslav@mail.com','1');
INSERT INTO `user` (r_id, u_login, u_password) VALUES (2, 'myroslav@mail.com','1');

INSERT  INTO  `employee` (u_id, e_forename, e_surname, e_patronymic, e_telephone, e_position) VALUES (1, 'Vasyl', 'Kit', 'Vasylovich', '+380556221486', 'admin');
INSERT  INTO  `employee` (u_id, e_forename, e_surname, e_patronymic, e_telephone, e_position) VALUES (2, 'Mykola', 'Kit', 'Vasylovich','+380995534219', 'boss');

INSERT INTO `comment` (u_id, c_message) VALUES (1, 'first comment');
INSERT INTO `comment` (u_id, c_message) VALUES (2, 'second comment');

