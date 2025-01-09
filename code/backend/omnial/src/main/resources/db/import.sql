--create sequence room_seq;
--create sequence person_seq;
--create sequence reservation_seq;

-- Insert Person
-- id, email, firstname, grade, surname, person_uuid

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'s.stoeger@students.htl-leonding.ac.at', 'Sophie', '4AHITM', 'Stöger', '5c3c1ee8-c1a0-4b4d-9ac8-b14bed6ce6bc');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'s.binder@students.htl-leonding.ac.at', 'Sophie', '4AHITM', 'Binder', '');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'omnial@omnial.gmail.com', 'Omnial', 'test-User', 'Omnial', 'd8ac7ef3-319c-4741-a842-3bc352ff8895');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'m.slabschi@students.htl-leonding.ac.at', 'Maxi', '4AHITM', 'Slabschi', '340b3a31-95d1-4bfb-a570-6e9d3ae96a82');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'moritz.wagner06@gmx.at', 'Moritz', '4AHITM', 'Wagner', '92874a0d-a3d6-4729-aee7-2cf92a6162ca');

/*
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

 */

insert into Equipment(id, equipmentType, labelNumber, name, itemCount, available)
values (nextval('equipment_seq'), 'KAMERA', 'lala', 'Kamera', 2,2);

insert into Equipment(id, equipmentType, labelNumber, name, itemCount, available)
values (nextval('equipment_seq'), 'KAMERA', 'lrrrrrala', 'Kamera', 5,4);


--Insert Rooms
insert into Room (id, description, name)
values (nextval('room_seq'),'Das Fotostudio steht für Schüler der Medientechnik zur verfügung um an Foto- und Videoprojekten zu arbeiten','Fotostudio');

insert into Room (id, description, name)
values (nextval('room_seq'),'Wenn in der Schule ein Event stattfindet, das für die Schule oder sogar ausenstehende gestreamt werden soll, ' ||
'verwendet man das Equipment des Streamingraums.', 'Streamingraum');

insert into Room (id, description, name)
values (nextval('room_seq'),'Das Audiostudio steht hauptsächlich für Schüler der Medientechnik zur Verfügung aber auch für alle anderen, ' ||
'wenn sie eine Einführung in das Equipment und/oder Aufnahmeprogramm von Professor Baar bekommen hat.', 'Audiostudio');
insert into Room (id, description, name)
values (nextval('room_seq'),'Der Videoschnittraum steht meist Schüler der Medientechnik zur Verfügung damit sie ' ||
'diesen Nutzen können um Ihre Videoprojekte besser editieren können','Videoschnittraum');

insert into Room (id, description, name)
values (nextval('room_seq'),'Der Musikraum steht den Schülern der HTL Leonding zur Verfügung ' ||
'um Ihrer kreativität in Form von Musik freien lauf zu lassen','Musikraum');


insert into Rental(id, person_id, date, isReturned)
values(nextval('rental_seq'), 1, '2023-11-15T20:00:00',false);

insert into Rental(id, person_id, date, isReturned)
values(nextval('rental_seq'), 1, '2023-11-15T20:00:00',true);



-- No EDV rooms can be reserved (at least for now)
/*
insert into Room (id, description, name)
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

 */

-- Insert Reservation
insert into Reservation
values (nextval('reservation_seq'), 1, '2023-11-15',1,'2023-11-15T20:00:00','2023-11-15T10:55:00');