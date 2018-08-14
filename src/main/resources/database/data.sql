INSERT INTO `role` (`r_name`) VALUES ('owner');
INSERT INTO `role` (`r_name`) VALUES ('managingDirector');
INSERT INTO `role` (`r_name`) VALUES ('chef');
INSERT INTO `role` (`r_name`) VALUES ('manager');
INSERT INTO `role` (`r_name`) VALUES ('administrator');
INSERT INTO `role` (`r_name`) VALUES ('seniorHousemaid');
INSERT INTO `role` (`r_name`) VALUES ('seniorBartender');
INSERT INTO `role` (`r_name`) VALUES ('stateFarm');

INSERT INTO `user` (r_id, u_login, u_password) VALUES (1, 'rostyslav@mail.com','1');
INSERT INTO `user` (r_id, u_login, u_password) VALUES (2, 'myroslav@mail.com','1');
INSERT INTO `user` (r_id, u_login, u_password) VALUES (2, 'vas@mail.com','1');

INSERT INTO `vacancy` (v_position, v_salary) VALUES ('waiter', 10000);
INSERT INTO `vacancy` (v_position, v_salary) VALUES ('housekeeper', 10000);

INSERT  INTO  `employee` (u_id, e_forename, e_surname, e_patronymic, e_telephone, e_position) VALUES (1, 'Vasyl', 'Kit', 'Vasylovich', '+380556221486', 'admin');
INSERT  INTO  `employee` (u_id, e_forename, e_surname, e_patronymic, e_telephone, e_position) VALUES (2, 'Mykola', 'Kit', 'Vasylovich','+380995534219', 'boss');

INSERT INTO `schedule` (`id`, `r_id`, `start`, `end`) VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO `work_shift` (id, u_id, s_id, date) VALUES (1, 1, 1, CURRENT_TIMESTAMP);

INSERT INTO `comment` (u_id, c_message, w_shift_id) VALUES (1, 'first comment', 1);
INSERT INTO `comment` (u_id, c_message, w_shift_id) VALUES (2, 'second comment', 1);

