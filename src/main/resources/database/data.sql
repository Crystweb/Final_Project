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

INSERT INTO `role_permission` (role_id, permission_id) VALUES (1,1);
INSERT INTO `role_permission` (role_id, permission_id) VALUES (1,2);
INSERT INTO `role_permission` (role_id, permission_id) VALUES (2,2);
INSERT INTO `role_permission` (role_id, permission_id) VALUES (3,1);
INSERT INTO `role_permission` (role_id, permission_id) VALUES (3,2);
INSERT INTO `role_permission` (role_id, permission_id) VALUES (1,3);

INSERT INTO `user_role` (user_id, role_id) VALUES (1,1);
INSERT INTO `user_role` (user_id, role_id) VALUES (1,2);
INSERT INTO `user_role` (user_id, role_id) VALUES (2,3);
INSERT INTO `user_role` (user_id, role_id) VALUES (2,5);

INSERT INTO `position` (p_title) VALUES ('manager');
INSERT INTO `position` (p_title) VALUES ('admin');
INSERT INTO `position` (p_title) VALUES ('managing director');
INSERT INTO `position` (p_title) VALUES ('cleaner');


INSERT INTO `employee`(user_id, position_id, forename, surname, patronymic, phone_number, info) VALUES (1,1,'Vasyl', 'Vasyliv', 'Vasylovich', '4509654345', 'blablabla1');
INSERT INTO `employee`(user_id, position_id, forename, surname, patronymic, phone_number, info) VALUES (2,2,'Petro', 'Petriv',  'Petrovych',  '094586403', 'blablabla2');


INSERT INTO `schedule` (position_id, start, end) VALUES (2,  '10:00:00', '21:00:00' );
INSERT INTO `schedule` (position_id, start, end) VALUES (2,  '21:00:00', '10:00:00' );
INSERT INTO `schedule` (position_id, start, end) VALUES (1,  '08:00:00', '20:00:00' );

INSERT INTO `work_shift` (position_id, start, end, date) VALUES (1, '23:30:10', '00:40:10', CURRENT_TIMESTAMP);
INSERT INTO `work_shift` (position_id, start, end, date) VALUES (2, '10:30:10', '15:30:10', CURRENT_TIMESTAMP);
INSERT INTO `work_shift` (position_id, start, end, date) VALUES (2, '13:30:10', '16:30:10', CURRENT_TIMESTAMP);

INSERT INTO `shift_comment` (user_id, c_message, c_date) VALUES (1, 'message to admin', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (user_id, c_message, c_date) VALUES (1, 'Hello, admin', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (user_id, c_message, c_date) VALUES (2, 'message to manager', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (user_id, c_message, c_date) VALUES (2, 'Hello, manager', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (user_id, c_message, c_date) VALUES (3, 'message to managing director', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (user_id, c_message, c_date) VALUES (3, 'Hello, Edward :)', CURRENT_TIMESTAMP);

INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (1, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (1, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (2, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (2, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (3, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (3, 1);

INSERT INTO `location` (l_title, l_info) VALUES ('restaurant 1', 'restaurant in hotel');
INSERT INTO `location` (l_title, l_info) VALUES ('restaurant 2', 'restaurant outside');
INSERT INTO `location` (l_title, l_info) VALUES ('laundry', 'laundry');
INSERT INTO `location` (l_title) VALUES ('room 200');

INSERT INTO `task` (user_id_assignee, user_id_delegator, t_message, t_status, t_frequency, updated) VALUES (1, 2, 'clean rooms', @OPENED, 'DAILY', CURRENT_TIMESTAMP);
INSERT INTO `task` (user_id_assignee, user_id_delegator, t_message, t_status, t_frequency, updated) VALUES (2, 2, 'call taxi', 'IN_PROGRESS', 'WEEKLY', CURRENT_TIMESTAMP);
INSERT INTO `task` (user_id_assignee, user_id_delegator, t_message, t_status, t_frequency, updated) VALUES (3, 3, 'look in the window', @CLOSED, 'MONTHLY', CURRENT_TIMESTAMP);

INSERT INTO `task_location` (t_id, location_id) VALUES (1,2);
INSERT INTO `task_location` (t_id, location_id) VALUES (2,1);

INSERT INTO `task_comment` (t_id, user_id, c_message, c_date) VALUES (1, 2, 'first comment of task_comment', CURRENT_TIMESTAMP);
INSERT INTO `task_comment` (t_id, user_id, c_message, c_date) VALUES (2, 1, 'second comment of task_comment', CURRENT_TIMESTAMP);

INSERT INTO `consumer` (c_name, c_description) VALUES ('rich people', 'too rich people');
INSERT INTO `consumer` (c_name) VALUES ('football team');
INSERT INTO `consumer` (c_name) VALUES ('hotel clients');

INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 1');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 2');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 3');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 4');
INSERT INTO `mealtime_category` (m_title) VALUES ('mealtime 5');

INSERT INTO `food_supply` (m_id, user_id, c_id, location_id, f_amount, f_date) VALUES (1, 1, 1, 1, 10, CURRENT_TIMESTAMP);
INSERT INTO `food_supply` (m_id, user_id, c_id, location_id, f_amount, f_date) VALUES (2, 2, 2, 2, 20, CURRENT_TIMESTAMP);
INSERT INTO `food_supply` (m_id, user_id, c_id, location_id, f_amount, f_date) VALUES (3, 3, 3, 3, 30, CURRENT_TIMESTAMP);

INSERT INTO `vacancy` (user_id, position_id, v_salary, v_status, v_info, p_publication) VALUES (1, 1, 10000, @CLOSED, 'need worker 1', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (user_id, position_id, v_salary, v_status, v_info, p_publication) VALUES (1, 2, 20000, @OPENED, 'need worker 2', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (user_id, position_id, v_salary, v_status, v_info, p_publication) VALUES (2, 3, 30000, @OPENED, 'need worker 3', CURRENT_TIMESTAMP );
INSERT INTO `vacancy` (user_id, position_id, v_salary, v_status, v_info, p_publication) VALUES (3, 3, 40000, @OPENED, 'need worker 4', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (user_id, position_id, v_salary, v_status, v_info, p_publication) VALUES (1, 2, 500000, @CLOSED, 'need worker 5', CURRENT_TIMESTAMP);

INSERT INTO `vacancy_comment` (user_id, v_id, c_message, c_date) VALUES (1, 1, 'comment 1: we dont need him', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (user_id, v_id, c_message, c_date) VALUES (1, 1, 'comment 2: we need him but maybe later', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (user_id, v_id, c_message, c_date) VALUES (2, 1, 'comment 3: we dont need him', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (user_id, v_id, c_message, c_date) VALUES (2, 2, 'comment 4: we need him', CURRENT_TIMESTAMP);
INSERT INTO `vacancy_comment` (user_id, v_id, c_message, c_date) VALUES (1, 1, 'comment 5: we need this vacancy', CURRENT_TIMESTAMP);

INSERT INTO `bed_linen_type` (b_title) VALUES ('pillow');
INSERT INTO `bed_linen_type` (b_title) VALUES ('veil');
INSERT INTO `bed_linen_type` (b_title) VALUES ('pillowcase');
INSERT INTO `bed_linen_type` (b_title) VALUES ('blanket');
INSERT INTO `bed_linen_type` (b_title) VALUES ('stretch');

INSERT INTO `bed_linen_stats` (user_id, b_id, b_amount, c_date) VALUES (1, 1, 10, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (user_id, b_id, b_amount, c_date) VALUES (1, 2, 100, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (user_id, b_id, b_amount, c_date) VALUES (1, 3, 20, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (user_id, b_id, b_amount, c_date) VALUES (1, 4, 50, CURRENT_TIMESTAMP);
INSERT INTO `bed_linen_stats` (user_id, b_id, b_amount, c_date) VALUES (1, 5, 40, CURRENT_TIMESTAMP);

INSERT INTO `wash_period` (w_period) VALUES ('day');
INSERT INTO `wash_period` (w_period) VALUES ('night');

INSERT INTO `cleaning_material` (m_title) VALUES ('powder');
INSERT INTO `cleaning_material` (m_title) VALUES ('soap');

INSERT INTO `wash_stats` (user_id, w_p_id, c_id, w_weight, date) VALUES (1, 1, 1, 10, CURRENT_TIMESTAMP);
INSERT INTO `wash_stats` (user_id, w_p_id, c_id, w_weight, date) VALUES (1, 2, 2, 50, CURRENT_TIMESTAMP);
INSERT INTO `wash_stats` (user_id, w_p_id, c_id, w_weight, date) VALUES (1, 1, 3, 200, CURRENT_TIMESTAMP);

INSERT INTO `wash_stats_materials` (w_s_id, m_id, m_amount) VALUES (1, 1, 10);
INSERT INTO `wash_stats_materials` (w_s_id, m_id, m_amount) VALUES (1, 2, 20);
INSERT INTO `wash_stats_materials` (w_s_id, m_id, m_amount) VALUES (1, 1, 30);

INSERT INTO `dish_type` (d_title) VALUES ('dish');
INSERT INTO `dish_type` (d_title) VALUES ('spoon');
INSERT INTO `dish_type` (d_title) VALUES ('fork');

INSERT INTO `dish_balance` (dish_id, location_id, user_id, dish_amount, date) VALUES (1, 1, 1, 50, CURRENT_TIMESTAMP);
INSERT INTO `dish_balance` (dish_id, location_id, user_id, dish_amount, date) VALUES (2, 2, 2, 100, CURRENT_TIMESTAMP);
INSERT INTO `dish_balance` (dish_id, location_id, user_id, dish_amount, date) VALUES (3, 3, 3, 500, CURRENT_TIMESTAMP);

INSERT INTO `dish_accounting` (dish_id, location_id, user_id, d_delta, date) VALUES (1, 1, 1, 5, CURRENT_TIMESTAMP);
INSERT INTO `dish_accounting` (dish_id, location_id, user_id, d_delta, date) VALUES (2, 2, 2, 2, CURRENT_TIMESTAMP);
INSERT INTO `dish_accounting` (dish_id, location_id, user_id, d_delta, date) VALUES (3, 3, 3, 3, CURRENT_TIMESTAMP);

INSERT INTO `dish_comment` (user_id, dish_id, c_message, c_date) VALUES (1, 1, 'broke dishes', CURRENT_TIMESTAMP);
INSERT INTO `dish_comment` (user_id, dish_id, c_message, c_date) VALUES (2, 2, 'broke spoons', CURRENT_TIMESTAMP);
INSERT INTO `dish_comment` (user_id, dish_id, c_message, c_date) VALUES (3, 3, 'broke forks', CURRENT_TIMESTAMP);

INSERT INTO `work_shift` (position_id, start, end, date) VALUES (1, '00:00:00', '18:00:00', CURRENT_TIMESTAMP);
