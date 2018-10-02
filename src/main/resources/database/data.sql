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

INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Менеджер', true );
INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Администратор', true );
INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Управляющий', true);
INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Шеф-Повар', false);
INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Старшая горничная', false);
INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Старший бармен', false);
INSERT INTO `position` (p_title, pinned_to_comment) VALUES ('Завхоз', false);

INSERT INTO `user` (u_login, u_password, position_id) VALUES ('login1','1', 1);
INSERT INTO `user` (u_login, u_password, position_id) VALUES ('login2','1', 2);
INSERT INTO `user` (u_login, u_password, position_id) VALUES ('login 3','1', 3);
INSERT INTO `user` (u_login, u_password, position_id) VALUES ('login 4','1', 1);
INSERT INTO `user` (u_login, u_password, position_id) VALUES ('Artem','pwd', 2);

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

INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (1,1,'Vasyl', 'Vasyliv', 'Vasylovich', '4509654345', 'Работает в дневные смены.');
INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (2,2,'Petro', 'Petriv',  'Petrovych',  '090586403', 'Работает в ресторане для ФК Динамо.');
INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (3,3,'Maxim', 'Maximov',  'Petrovych',  '092586403', 'Работает в дневные смены.');
INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (5,3,'Artem', 'Tymchuk',  'Dmytrovich',  '094586403', 'Работает в ресторане для ФК Динамо.');
INSERT INTO `employee`(u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info) VALUES (4,3,'Rostyslav', 'Barmakov',  'Dmytrovich',  '094586003', 'Работает в дневные смены.');

INSERT INTO `schedule` (p_id, start, end, created_at) VALUES (2,  '10:00:00', '21:00:00', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP) );
INSERT INTO `schedule` (p_id, start, end, created_at) VALUES (2,  '21:00:00', '10:00:00', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP) );
INSERT INTO `schedule` (p_id, start, end, created_at) VALUES (1,  '08:00:00', '20:00:00', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP) );

INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (5, 'Привет, я передал смену. Сегодня все было хорошо. Я доволен. Правое крыло спокойно, левое немного бушевало. В целом рябята были довольны.', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (5, 'Ребята, много работы. Этот сентябрь начался на ура! Заселили сегодня целых две команды, кто будет смотреть со мной в пятницу футбол Польша - Италия? Жду!!!',TIMESTAMPADD(HOUR, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (5, 'Сегодня немного бушевали. Мне было сложно, разламали табуретки, пришлось просить завхоза поченить. Поченил. Молодец. Если бы не завхоз пришлось бы тратиться на новые…',TIMESTAMPADD(HOUR, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (2, 'Привет, я передал смену. Сегодня все было хорошо. Я доволен.', TIMESTAMPADD(HOUR, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Сегодня немного бушевали.', TIMESTAMPADD(HOUR, -9, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (1, 'Заселили сегодня целых две команды,',TIMESTAMPADD(HOUR, -11, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (1, 'Прибрати в кімнаті номер 23', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (2, 'Викликати таксі на 7:00', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Команда Шахтар виїжджає 20 січня', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Передзвонити клієнту о 19 годині', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (4, 'В кімнаті 31 зламалася дверна ручка – викликати майстра на ранок', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (4, 'Попередження про відключення світла з 20 по 23 години', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (4, 'Партія продуктів затримається на 3 години', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Морозилка перестала працювати', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Перевірити кімнату номер 44 після генерального прибирання', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Кімната 121 поламка крану', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Кімната 22 погано прибрана кімната', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'На барі біля рецепції закінчилася горілка «Фінляндія»', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Закінчується пральний порошок', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Залишилося 2 вільні номери протягом 3 днів', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Закінчилися лампочки', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Сім’я з 18  кімнати просить переселити в інший номер де тихіший.', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Кімната 48 просять обігрівач', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Розбита попільничка в номері 40', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Закінчився туалетний папір в кімнатах 25, 16, 33', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'В кімнаті 47 зламали міні-бар', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Мешканці 23 кімнати зловживають оковитою та стають буйними', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Кімната 55 замовила сніданок на 6:00', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Кімната 35 просили не турбувати 3 дні', TIMESTAMPADD(DAY, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Зламалися вимикачі на складі', TIMESTAMPADD(DAY, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Завтра приїде пожежна перевірка', TIMESTAMPADD(DAY, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'На ресепшені закінчуються канцтовари ', TIMESTAMPADD(DAY, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Потрібно оновити розмітку на автостоянці.', TIMESTAMPADD(DAY, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (3, 'Пропав wi-fi на третьому поверсі', TIMESTAMPADD(DAY, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (2, 'Завтра приїдуть англомовні клієнти', TIMESTAMPADD(DAY, -6, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (u_id, c_message, c_date) VALUES (1, 'Закінчуються цукерки на ресепшині', TIMESTAMPADD(DAY, -6, CURRENT_TIMESTAMP));


INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (1, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (1, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (2, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (2, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (3, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (3, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (4, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (4, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (4, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (5, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (5, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (6, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (7, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (7, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (7, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (8, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (8, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (9, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (9, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (10, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (10, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (11, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (11, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (12, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (12, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (12, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (13, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (14, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (14, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (15, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (16, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (16, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (17, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (18, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (19, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (20, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (21, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (22, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (22, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (23, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (25, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (25, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (26, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (26, 3);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (27, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (28, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (28, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (29, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (29, 2);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (30, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (31, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (32, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (33, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (34, 1);
INSERT INTO `shift_comment_position` (comment_id, position_id) VALUES (35, 1);

INSERT INTO `location` (l_title) VALUES ('Мальвы');
INSERT INTO `location` (l_title) VALUES ('ANISE');
INSERT INTO `location` (l_title) VALUES ('Отель');
INSERT INTO `location` (l_title) VALUES ('Кухня');
INSERT INTO `location` (l_title) VALUES ('1 этаж');
INSERT INTO `location` (l_title) VALUES ('2 этаж');
INSERT INTO `location` (l_title) VALUES ('3 этаж');
INSERT INTO `location` (l_title) VALUES ('4 этаж');
INSERT INTO `location` (l_title) VALUES ('5 этаж');

INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 1', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 2', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 3', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 4', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 5', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 6', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 7', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 8', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 9', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 10', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 11', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 12', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 13', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 14', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 15', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('Номер 16', 5);

INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (1, 2, 'clean rooms', @OPENED, 2, 'DAILY', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 1, CURRENT_TIMESTAMP));
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (5, 2, 'call taxi', @OPENED, 3, 'WEEKLY', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 2, CURRENT_TIMESTAMP));
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (3, 3, 'look in the window', @CLOSED, 1, 'MONTHLY', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 1, CURRENT_TIMESTAMP));
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (2, 1, 'clean some room', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 4, CURRENT_TIMESTAMP));
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (5, 1, 'close all windows', @OPENED, 3, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 2, CURRENT_TIMESTAMP));
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 4, 'close all cats', @OPENED, 2, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 1, CURRENT_TIMESTAMP));
INSERT INTO `task` (u_id_assignee, u_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (5, 3, 'close all doors', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));

INSERT INTO `task_location` (t_id, l_id) VALUES (1,2);
INSERT INTO `task_location` (t_id, l_id) VALUES (2,1);
INSERT INTO `task_location` (t_id, l_id) VALUES (2,4);
INSERT INTO `task_location` (t_id, l_id) VALUES (4,6);
INSERT INTO `task_location` (t_id, l_id) VALUES (5,7);
INSERT INTO `task_location` (t_id, l_id) VALUES (3,4);
INSERT INTO `task_location` (t_id, l_id) VALUES (6,5);
INSERT INTO `task_location` (t_id, l_id) VALUES (7,3);

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
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (5, 2, 20000, @OPENED, 'need worker 2', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (2, 3, 30000, @OPENED, 'need worker 3', CURRENT_TIMESTAMP );
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (3, 3, 40000, @OPENED, 'need worker 4', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (u_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (5, 2, 500000, @CLOSED, 'need worker 5', CURRENT_TIMESTAMP);

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
