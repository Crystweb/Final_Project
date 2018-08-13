INSERT INTO `role` (`r_name`) VALUES ('admin');
INSERT INTO `role` (`r_name`) VALUES ('manager');

INSERT INTO `user` (r_id, u_login, u_password) VALUES (1, 'rostyslav@mail.com','1');
INSERT INTO `user` (r_id, u_login, u_password) VALUES (2, 'myroslav@mail.com','1');

INSERT INTO `schedule` (id, r_id, start, end) VALUES (1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO `work_shift` (id, u_id, s_id, date) VALUES (1, 1, 1, CURRENT_TIMESTAMP);

INSERT INTO `comment` (u_id, c_message, w_shift_id) VALUES (1, 'first comment', 1);
INSERT INTO `comment` (u_id, c_message, w_shift_id) VALUES (2, 'second comment', 1);