SET @OPENED = 'OPENED';
SET @CLOSED = 'CLOSED';

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


INSERT INTO `schedule` (p_id, start, end) VALUES (2,  '19:30:10', '20:30:10' );
INSERT INTO `schedule` (p_id, start, end) VALUES (1,  '21:00:30', '23:30:10' );
INSERT INTO `schedule` (p_id, start, end) VALUES (3,  '08:55:10', '10:30:10' );

INSERT INTO `work_shift` (u_id, start, end, date) VALUES (1, '23:30:10', '00:40:10', CURRENT_TIMESTAMP);
INSERT INTO `work_shift` (u_id, start, end, date) VALUES (2, '10:30:10', '15:30:10', CURRENT_TIMESTAMP);
INSERT INTO `work_shift` (start, end, date) VALUES ( '13:30:10', '16:30:10', CURRENT_TIMESTAMP);

INSERT INTO `shift_comment` (u_id, w_shift_id, c_message, c_date) VALUES (1, 1, 'message 1', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (u_id, w_shift_id, c_message, c_date) VALUES (2, 1, 'message 2', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (u_id, w_shift_id, c_message, c_date) VALUES (3, 2, 'message 3', CURRENT_TIMESTAMP);

INSERT INTO `location` (l_title, l_info) VALUES ('restaurant 1', 'restaurant in hotel');
INSERT INTO `location` (l_title, l_info) VALUES ('restaurant 2', 'restaurant outside');
INSERT INTO `location` (l_title, l_info) VALUES ('laundry', 'laundry');
INSERT INTO `location` (l_title) VALUES ('room 200');

INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, t_frequency, updated) VALUES (1, 2, 'clean rooms', @OPENED, 'DAILY', CURRENT_TIMESTAMP);
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, t_frequency, updated) VALUES (2, 2, 'call taxi', 'IN_PROGRESS', 'WEEKLY', CURRENT_TIMESTAMP);
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, t_frequency, updated) VALUES (3, 3, 'look in the window', @CLOSED, 'MONTHLY', CURRENT_TIMESTAMP);

INSERT INTO `task_location` (t_id, l_id) VALUES (1,2);
INSERT INTO `task_location` (t_id, l_id) VALUES (2,1);

INSERT INTO `task_comment` (t_id, u_id, c_message, c_date) VALUES (1, 2, 'first comment of task_comment', CURRENT_TIMESTAMP);
INSERT INTO `task_comment` (t_id, u_id, c_message, c_date) VALUES (2, 1, 'second comment of task_comment', CURRENT_TIMESTAMP);

INSERT INTO `consumer` (c_name, c_description) VALUES ('rich people', 'too rich people');
INSERT INTO `consumer` (c_name) VALUES ('football team');
INSERT INTO `consumer` (c_name) VALUES ('hotel clients');

INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 1');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 2');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 3');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 4');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 5');

INSERT INTO `food_supply` (m_id, u_id, c_id, l_id, f_amount, f_date) VALUES (1, 1, 1, 1, 10, CURRENT_TIMESTAMP);
INSERT INTO `food_supply` (m_id, u_id, c_id, l_id, f_amount, f_date) VALUES (2, 2, 2, 2, 20, CURRENT_TIMESTAMP);
INSERT INTO `food_supply` (m_id, u_id, c_id, l_id, f_amount, f_date) VALUES (3, 3, 3, 3, 30, CURRENT_TIMESTAMP);

INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (1, 1, 10000, @CLOSED, 'need worker 1', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (1, 2, 20000, @OPENED, 'need worker 2', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (2, 3, 30000, @OPENED, 'need worker 3', CURRENT_TIMESTAMP );
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (3, 3, 40000, @OPENED, 'need worker 4', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (1, 2, 500000, @CLOSED, 'need worker 5', CURRENT_TIMESTAMP);

INSERT INTO `vacancy_comment` (u_id, v_id, c_message, c_date) VALUES (1, 1, 'comment 1: we dont need him', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (u_id, v_id, c_message, c_date) VALUES (1, 1, 'comment 2: we need him but maybe later', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (u_id, v_id, c_message, c_date) VALUES (2, 1, 'comment 3: we dont need him', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (u_id, v_id, c_message, c_date) VALUES (2, 2, 'comment 4: we need him', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (u_id, v_id, c_message, c_date) VALUES (1, 1, 'comment 5: we need this vacancy', CURRENT_TIMESTAMP);

INSERT INTO `bed_linen_type` (b_title) VALUES ('pillow');
INSERT INTO `bed_linen_type` (b_title) VALUES ('veil');
INSERT INTO `bed_linen_type` (b_title) VALUES ('pillowcase');
INSERT INTO `bed_linen_type` (b_title) VALUES ('blanket');
INSERT INTO `bed_linen_type` (b_title) VALUES ('stretch');

INSERT INTO `bed_linen_stats` (u_id, b_id, b_amount, c_date) VALUES (1, 1, 10, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (u_id, b_id, b_amount, c_date) VALUES (1, 2, 100, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (u_id, b_id, b_amount, c_date) VALUES (1, 3, 20, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (u_id, b_id, b_amount, c_date) VALUES (1, 4, 50, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (u_id, b_id, b_amount, c_date) VALUES (1, 5, 40, CURRENT_TIMESTAMP);

INSERT INTO `wash_period` (w_period) VALUES ('day');
INSERT INTO `wash_period` (w_period) VALUES ('night');

INSERT INTO `cleaning_material` (m_title) VALUES ('powder');
INSERT INTO `cleaning_material` (m_title) VALUES ('soap');

INSERT INTO `wash_stats` (u_id, w_p_id, c_id, w_weight, date) VALUES (1, 1, 1, 10, CURRENT_TIMESTAMP);
INSERT INTO `wash_stats` (u_id, w_p_id, c_id, w_weight, date) VALUES (1, 2, 2, 50, CURRENT_TIMESTAMP);
INSERT INTO `wash_stats` (u_id, w_p_id, c_id, w_weight, date) VALUES (1, 1, 3, 200, CURRENT_TIMESTAMP);

INSERT INTO `wash_stats_materials` (w_s_id, m_id, m_amount) VALUES (1, 1, 10);
INSERT INTO `wash_stats_materials` (w_s_id, m_id, m_amount) VALUES (1, 2, 20);
INSERT INTO `wash_stats_materials` (w_s_id, m_id, m_amount) VALUES (1, 1, 30);

INSERT INTO `dish_type` (d_title) VALUES ('dish');
INSERT INTO `dish_type` (d_title) VALUES ('spoon');
INSERT INTO `dish_type` (d_title) VALUES ('fork');

INSERT INTO `dish_balance` (d_id, l_id, u_id, d_amount, date) VALUES (1, 1, 1, 50, CURRENT_TIMESTAMP);
INSERT INTO `dish_balance` (d_id, l_id, u_id, d_amount, date) VALUES (2, 2, 2, 100, CURRENT_TIMESTAMP);
INSERT INTO `dish_balance` (d_id, l_id, u_id, d_amount, date) VALUES (3, 3, 3, 500, CURRENT_TIMESTAMP);

INSERT INTO `dish_accounting` (d_id, l_id, u_id, d_delta, date) VALUES (1, 1, 1, 5, CURRENT_TIMESTAMP);
INSERT INTO `dish_accounting` (d_id, l_id, u_id, d_delta, date) VALUES (2, 2, 2, 2, CURRENT_TIMESTAMP);
INSERT INTO `dish_accounting` (d_id, l_id, u_id, d_delta, date) VALUES (3, 3, 3, 3, CURRENT_TIMESTAMP);

INSERT INTO `dish_comment` (u_id, d_id, c_message, c_date) VALUES (1, 1, 'broke dishes', CURRENT_TIMESTAMP);
INSERT INTO `dish_comment` (u_id, d_id, c_message, c_date) VALUES (2, 2, 'broke spoons', CURRENT_TIMESTAMP);
INSERT INTO `dish_comment` (u_id, d_id, c_message, c_date) VALUES (3, 3, 'broke forks', CURRENT_TIMESTAMP);

INSERT INTO `work_shift` (u_id, start, end, date) VALUES (1, '00:00:00', '18:00:00', CURRENT_TIMESTAMP);