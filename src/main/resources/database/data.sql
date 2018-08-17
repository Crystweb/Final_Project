INSERT INTO `role` (`r_name`) VALUES ('owner');
INSERT INTO `role` (`r_name`) VALUES ('managingDirector');
INSERT INTO `role` (`r_name`) VALUES ('chef');
INSERT INTO `role` (`r_name`) VALUES ('manager');
INSERT INTO `role` (`r_name`) VALUES ('administrator');
INSERT INTO `role` (`r_name`) VALUES ('seniorHousemaid');
INSERT INTO `role` (`r_name`) VALUES ('seniorBartender');
INSERT INTO `role` (`r_name`) VALUES ('stateFarm');

 INSERT INTO `user` (u_login, u_password) VALUES ('rostyslav@mail.com','1');
 INSERT INTO `user` (u_login, u_password) VALUES ('myroslav@mail.com','1');
 INSERT INTO `user` (u_login, u_password) VALUES ('vas@mail.com','1');

 INSERT INTO `permission` (p_name) VALUES ('change comment');
 INSERT INTO `permission` (p_name) VALUES ('create vacancy');
 INSERT INTO `permission` (p_name) VALUES ('get tasks');
 INSERT INTO `permission` (p_name) VALUES ('delegate tasks');

 INSERT INTO `role_permission` (r_id, p_id) VALUES (1,1);
 INSERT INTO `role_permission` (r_id, p_id) VALUES (1,2);
 INSERT INTO `role_permission` (r_id, p_id) VALUES (2,2);
 INSERT INTO `role_permission` (r_id, p_id) VALUES (3,1);
 INSERT INTO `role_permission` (r_id, p_id) VALUES (3,2);
 INSERT INTO `role_permission` (r_id, p_id) VALUES (1,3);

INSERT INTO `user_role` (u_id, r_id) VALUES (1,1);
INSERT INTO `user_role` (u_id, r_id) VALUES (1,2);
INSERT INTO `user_role` (u_id, r_id) VALUES (2,3);
INSERT INTO `user_role` (u_id, r_id) VALUES (2,5);

INSERT INTO `position` (p_title) VALUES ('manager');
INSERT INTO `position` (p_title) VALUES ('admin');
INSERT INTO `position` (p_title) VALUES ('waiter');
INSERT INTO `position` (p_title) VALUES ('cleaner');


INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (1,1,'Vasyl', 'Vasyliv', 'Vasylovich', '4509654345', 'blablabla1');
INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (2,2,'Petro', 'Petriv',  'Petrovych',  '094586403', 'blablabla2');
INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic) VALUES (3,3,'Mykola', 'Saint', 'Mykolayovych');

--INSERT INTO `schedule` (p_id, start, end) VALUES (2,  1534530168, 1534530595 );
--INSERT INTO `schedule` (p_id, start, end) VALUES (1,  1534530168, 1534530595 );
--INSERT INTO `schedule` (p_id, start, end) VALUES (3,  1534530168, 1534530595 );

--INSERT INTO `work_shift` (u_id, start, end, date) VALUES (1, 1534530168, 1534530595, 1534530815);
--INSERT INTO `work_shift` (u_id, start, end, date) VALUES (2, 1534530168, 1534530595, 1534530815);
--INSERT INTO `work_shift` (start, end, date) VALUES ( 1534530168, 1534530595, 1534530815);

--INSERT INTO `shift_comment` (u_id, w_shift_id, c_message, c_date) VALUES (1, 1, 'message 1', CURRENT_TIMESTAMP);
--INSERT INTO `shift_comment` (u_id, w_shift_id, c_message, c_date) VALUES (2, 1, 'message 1', CURRENT_TIMESTAMP);
--INSERT INTO `shift_comment` (u_id, w_shift_id, c_message, c_date) VALUES (3, 2, 'message 1', CURRENT_TIMESTAMP);

INSERT INTO `location` (l_title, l_info) VALUES ('restaurant 1', 'restaurant in hotel');
INSERT INTO `location` (l_title, l_info) VALUES ('restaurant 2', 'restaurant outside');
INSERT INTO `location` (l_title, l_info) VALUES ('laundry', 'laundry');
INSERT INTO `location` (l_title) VALUES ('room 200');

INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, t_frequency, updated) VALUES (1, 2, 'clean rooms', 'OPENED', 'DAILY', CURRENT_TIMESTAMP);
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, t_frequency, updated) VALUES (2, 2, 'call taxi', 'IN_PROGRESS', 'WEEKLY', CURRENT_TIMESTAMP);
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, t_frequency, updated) VALUES (3, 3, 'look in the window', 'CLOSED', 'MONTHLY', CURRENT_TIMESTAMP);

INSERT INTO `task_location` (t_id, l_id) VALUES (1,2);
INSERT INTO `task_location` (t_id, l_id) VALUES (2,1);

INSERT INTO `task_comment` (t_id, u_id, c_message, c_date) VALUES (1, 2, 'first comment of task_comment', CURRENT_TIMESTAMP);
INSERT INTO `task_comment` (t_id, u_id, c_message, c_date) VALUES (2, 1, 'second comment of task_comment', CURRENT_TIMESTAMP);

INSERT INTO `consumer` (c_name, c_description) VALUES ('rich people', 'too rich people');
INSERT INTO `consumer` (c_name) VALUES ('football team');