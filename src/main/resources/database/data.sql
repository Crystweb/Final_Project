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

INSERT INTO `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info, e_mail) VALUES (1,1,'Vasyl', 'Vasyliv', 'Vasylovich', '4509654345', 'Чесність і шляхетність. (Айвенго попереджає про небезпеку Ісаака, з яким хотів розправитися храмовник, допомагає вийти із замку ', 'vasya@gmail.com');
INSERT INTO `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info, e_mail) VALUES (2,2,'Petro', 'Petriv',  'Petrovych',  '090586403', 'Походження героя. (Айвенго належав до шанованого старовинного роду саксів. Його батько — Седрік Сакс )', 'petya@gmail.com');
INSERT INTO `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info, e_mail) VALUES (3,3,'Maxim', 'Maximov',  'Petrovych',  '092586403', 'Вірність королю Річарду. (Повернувшись після хрестового походу, він вірно служить королю Річарду, ', 'maximka@gmail.com');
INSERT INTO `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info, e_mail) VALUES (5,3,'Artem', 'Tymchuk',  'Dmytrovich',  '094586403', 'Здатність на сильне кохання. (Айвенго усім серцем покохав вихованку Седріка — леді Ровену.', 'artyom@gmail.com');
INSERT INTO `employee` (u_id, p_id, e_forename, e_surname, e_patronymic, e_phone_number, e_info, e_mail) VALUES (4,3,'Rostyslav', 'Barmakov',  'Dmytrovich',  '094586003', 'Готовність допомогти людям у біді. (Ребекку, дочку Ісаака, несправедливо звинуватили в ча', 'warfawl@gmail.com');

INSERT INTO `schedule` (p_id, start, end, created_at) VALUES (2,  '10:00:00', '21:00:00', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP) );
INSERT INTO `schedule` (p_id, start, end, created_at) VALUES (2,  '21:00:00', '10:00:00', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP) );
INSERT INTO `schedule` (p_id, start, end, created_at) VALUES (1,  '08:00:00', '20:00:00', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP) );

INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (4, 'Привет, я передал смену. Сегодня все было хорошо. Я доволен. Правое крыло спокойно, левое немного бушевало. В целом рябята были довольны.', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (4, 'Ребята, много работы. Этот сентябрь начался на ура! Заселили сегодня целых две команды, кто будет смотреть со мной в пятницу футбол Польша - Италия? Жду!!!',TIMESTAMPADD(HOUR, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (4, 'Сегодня немного бушевали. Мне было сложно, разламали табуретки, пришлось просить завхоза поченить. Поченил. Молодец. Если бы не завхоз пришлось бы тратиться на новые…',TIMESTAMPADD(HOUR, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (2, 'Привет, я передал смену. Сегодня все было хорошо. Я доволен.', TIMESTAMPADD(HOUR, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Сегодня немного бушевали.', TIMESTAMPADD(HOUR, -9, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (1, 'Заселили сегодня целых две команды,',TIMESTAMPADD(HOUR, -11, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (1, 'Прибрати в кімнаті номер 23', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (2, 'Викликати таксі на 7:00', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Команда Шахтар виїжджає 20 січня', CURRENT_TIMESTAMP);
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Передзвонити клієнту о 19 годині', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (4, 'В кімнаті 31 зламалася дверна ручка – викликати майстра на ранок', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (4, 'Попередження про відключення світла з 20 по 23 години', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (4, 'Партія продуктів затримається на 3 години', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Морозилка перестала працювати', TIMESTAMPADD(DAY, -1, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Перевірити кімнату номер 44 після генерального прибирання', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Кімната 121 поламка крану', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Кімната 22 погано прибрана кімната', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'На барі біля рецепції закінчилася горілка «Фінляндія»', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Закінчується пральний порошок', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Залишилося 2 вільні номери протягом 3 днів', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Закінчилися лампочки', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Сім’я з 18  кімнати просить переселити в інший номер де тихіший.', TIMESTAMPADD(DAY, -2, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Кімната 48 просять обігрівач', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Розбита попільничка в номері 40', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Закінчився туалетний папір в кімнатах 25, 16, 33', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'В кімнаті 47 зламали міні-бар', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Мешканці 23 кімнати зловживають оковитою та стають буйними', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Кімната 55 замовила сніданок на 6:00', TIMESTAMPADD(DAY, -3, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Кімната 35 просили не турбувати 3 дні', TIMESTAMPADD(DAY, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Зламалися вимикачі на складі', TIMESTAMPADD(DAY, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Завтра приїде пожежна перевірка', TIMESTAMPADD(DAY, -4, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'На ресепшені закінчуються канцтовари ', TIMESTAMPADD(DAY, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Потрібно оновити розмітку на автостоянці.', TIMESTAMPADD(DAY, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (3, 'Пропав wi-fi на третьому поверсі', TIMESTAMPADD(DAY, -5, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (2, 'Завтра приїдуть англомовні клієнти', TIMESTAMPADD(DAY, -6, CURRENT_TIMESTAMP));
INSERT INTO `shift_comment` (employee_id, c_message, c_date) VALUES (1, 'Закінчуються цукерки на ресепшині', TIMESTAMPADD(DAY, -6, CURRENT_TIMESTAMP));


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
INSERT INTO `location` (l_title) VALUES ('2 этаж');
INSERT INTO `location` (l_title) VALUES ('3 этаж');
INSERT INTO `location` (l_title) VALUES ('4 этаж');
INSERT INTO `location` (l_title) VALUES ('5 этаж');
INSERT INTO `location` (l_title) VALUES ('6 этаж');

INSERT INTO `location` (l_title, parent_location) VALUES ('201', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('202', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('203', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('204', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('205', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('206', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('207', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('208', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('209', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('210', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('211', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('212', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('213', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('214', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('215', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('216', 5);
INSERT INTO `location` (l_title, parent_location) VALUES ('301', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('302', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('303', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('304', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('305', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('306', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('307', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('308', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('309', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('310', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('311', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('312', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('313', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('314', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('315', 6);
INSERT INTO `location` (l_title, parent_location) VALUES ('316', 6);

INSERT INTO `location` (l_title, parent_location) VALUES ('401', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('402', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('403', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('404', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('405', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('406', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('407', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('408', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('409', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('410', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('411', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('412', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('413', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('414', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('415', 7);
INSERT INTO `location` (l_title, parent_location) VALUES ('416', 7);

INSERT INTO `location` (l_title, parent_location) VALUES ('501', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('502', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('503', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('504', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('505', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('506', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('507', 8);
INSERT INTO `location` (l_title, parent_location) VALUES ('508', 8);

INSERT INTO `location` (l_title, parent_location) VALUES ('601', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('602', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('603', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('604', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('605', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('606', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('607', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('608', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('609', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('610', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('611', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('612', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('613', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('614', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('615', 9);
INSERT INTO `location` (l_title, parent_location) VALUES ('616', 9);

INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (1, 2, 'clean rooms', @OPENED, 2, 'DAILY', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 1, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 2, 'call taxi', @OPENED, 3, 'WEEKLY', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 2, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (3, 3, 'look in the window', @CLOSED, 1, 'MONTHLY', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 1, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (5, 1, 'clean some room', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 4, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 1, 'close all windows', @OPENED, 3, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 2, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 4, 'close all cats', @OPENED, 2, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 1, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (5, 3, 'close all doors', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (3, 3, 'вынести мусор', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 3, 'вставить стекло', @OPENED, 2, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 3, 'помыть унитаз', @OPENED, 3, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (2, 3, 'заменить душ', @OPENED, 2, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (1, 3, 'постелить ковер', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 3, 'заменить телевизор', @OPENED, 3, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (3, 3, 'наполнить мини бар', @OPENED, 2, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 3, 'починить замок', @OPENED, 1, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 3, 'покрасить дверь', @OPENED, 3, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));
INSERT INTO `task` (e_id_assignee, e_id_delegator, t_message, t_status, priority, t_frequency, updated, expired) VALUES (4, 3, 'поменять лампочку в светильнике', @OPENED, 2, 'ONCE', CURRENT_TIMESTAMP, TIMESTAMPADD(DAY, 3, CURRENT_TIMESTAMP));

INSERT INTO `task_img` (task_id, url) VALUES (2, 'https://images.unsplash.com/photo-1533467915241-eac02e856653?ixlib=rb-0.3.5&s=5a355bc035d9fd2297e68804e4fdb433&w=1000&q=80');
INSERT INTO `task_img` (task_id, url) VALUES (3, 'http://storage.agravery.com/uploads/files/flowers/ukraine/bouquet-3158350.jpg');
INSERT INTO `task_img` (task_id, url) VALUES (4, 'https://cdn6.sellbe.com/p66/s-66281/product/26/205816.jpg');
INSERT INTO `task_img` (task_id, url) VALUES (5, 'https://camellia.ua/upload/kamelia_flora/cat/82/1b/635x635/fc269977_56b4b3f1a7b06.jpg');
INSERT INTO `task_img` (task_id, url) VALUES (6, 'http://roza.if.ua/wp-content/uploads/2017/05/961.jpg');

INSERT INTO `task_location` (t_id, l_id) VALUES (1,2);
INSERT INTO `task_location` (t_id, l_id) VALUES (2,2);
INSERT INTO `task_location` (t_id, l_id) VALUES (4,4);
INSERT INTO `task_location` (t_id, l_id) VALUES (5,1);
INSERT INTO `task_location` (t_id, l_id) VALUES (3,21);
INSERT INTO `task_location` (t_id, l_id) VALUES (6,28);
INSERT INTO `task_location` (t_id, l_id) VALUES (7,3);
INSERT INTO `task_location` (t_id, l_id) VALUES (8,32);
INSERT INTO `task_location` (t_id, l_id) VALUES (9,30);
INSERT INTO `task_location` (t_id, l_id) VALUES (10,29);
INSERT INTO `task_location` (t_id, l_id) VALUES (11,28);
INSERT INTO `task_location` (t_id, l_id) VALUES (12,36);
INSERT INTO `task_location` (t_id, l_id) VALUES (13,21);
INSERT INTO `task_location` (t_id, l_id) VALUES (14,22);
INSERT INTO `task_location` (t_id, l_id) VALUES (15,25);
INSERT INTO `task_location` (t_id, l_id) VALUES (16,25);
INSERT INTO `task_location` (t_id, l_id) VALUES (17,1);

INSERT INTO `task_comment` (t_id, e_id, c_message, c_date) VALUES (1, 2, 'first comment of task_comment', CURRENT_TIMESTAMP);
INSERT INTO `task_comment` (t_id, e_id, c_message, c_date) VALUES (2, 1, 'second comment of task_comment', CURRENT_TIMESTAMP);

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

INSERT INTO `vacancy` (e_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (1, 1, 10000, @CLOSED, 'need worker 1', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (e_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (5, 2, 20000, @OPENED, 'need worker 2', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (e_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (2, 3, 30000, @OPENED, 'need worker 3', CURRENT_TIMESTAMP );
INSERT INTO `vacancy` (e_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (3, 3, 40000, @OPENED, 'need worker 4', CURRENT_TIMESTAMP);
INSERT INTO `vacancy` (e_id, p_id, v_salary, v_status, v_info, p_publication) VALUES (5, 2, 500000, @CLOSED, 'need worker 5', CURRENT_TIMESTAMP);

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

INSERT INTO `check_in` (employee_id, location_id, created_at) VALUES (1, 15, CURRENT_TIMESTAMP);
INSERT INTO `check_in` (employee_id, location_id, created_at) VALUES (2, 16, CURRENT_TIMESTAMP);
INSERT INTO `check_in` (employee_id, location_id, created_at) VALUES (3, 17, CURRENT_TIMESTAMP);
