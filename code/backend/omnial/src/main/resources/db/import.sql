-- Insert Person
-- id, email, firstname, grade, surname, person_uuid
insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'teacher.teacher@gmail.com', 'Teacher', 'admin', 'Teacher');

insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'admin.admin@gmail.com', 'Admin', 'admin', 'Admin');

insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'max.mustermann@gmail.com', 'Max', '1AHITM', 'Mustermann');

insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'mia.muster@gmail.com', 'Mia', '5BHITM', 'Muster');

insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'theo.temp@gmail.com', 'Theo', '2CHITM', 'Temp');

insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'sarah.super@gmail.com', 'Sarah', '3BHITM', 'Super');

insert into Person (id, email, firstname, grade, surname)
values (nextval('person_seq'),'fabian.film@gmail.com', 'Fabian', '4AHITM', 'Film');

--Insert Rooms
insert into Room
values (nextval('room_seq'),'Das Fotostudio steht für Schüler der Medientechnik zur verfügung um an Foto- und Videoprojekten zu arbeiten','Fotostudio');

insert into Room
values (nextval('room_seq'),'Sehr cool','Streamingraum');

insert into Room
values (nextval('room_seq'),'Sehr cool','Audiostudio');

insert into Room
values (nextval('room_seq'),'Sehr cool','Videoschnittraum');

insert into Room
values (nextval('room_seq'),'Sehr cool','Musikraum');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-1');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-2');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-3');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-4');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-5');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-6');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-7');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-8');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-9');

insert into Room
values (nextval('room_seq'),'Sehr cool','EDV-10');

-- Insert Reservation
insert into reservation
values (nextval('reservation_seq'), 1, '2023-11-15',1,'2023-11-15T20:00:00','2023-11-15T10:55:00');