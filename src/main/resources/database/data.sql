INSERT INTO `role` (`r_name`) VALUES ('admin');
INSERT INTO `role` (`r_name`) VALUES ('manager');

INSERT INTO `user` (r_id, u_login, u_password) VALUES (1, 'rostyslav@mail.com','1');
INSERT INTO `user` (r_id, u_login, u_password) VALUES (2, 'myroslav@mail.com','1');

INSERT INTO `comment` (u_id, c_message) VALUES (1, 'first comment');
INSERT INTO `comment` (u_id, c_message) VALUES (2, 'second comment');