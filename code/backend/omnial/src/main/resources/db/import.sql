insert into Room
values (nextval('room_seq'),'Das Fotostudio steht für Schüler der Medientechnik zur verfügung um an Foto- und Videoprojekten zu arbeiten','Fotostudio');

insert into Person
values (nextval('person_seq'),'teacher', 'teacher', 'teacher', 'teacher.teacher@gmail.com');

insert into reservation
values (nextval('reservation_seq'), 1, '2023-11-15',1,'2023-11-15T20:00:00','2023-11-15T10:55:00');


insert into Room
values (nextval('room_seq'),'Sehr cool','Streamingraum');
