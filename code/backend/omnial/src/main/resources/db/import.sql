insert into Room
values (nextval('room_seq'),'Das Fotostudio steht für Schüler der Medientechnik zur verfügung um an Foto- und Videoprojekten zu arbeiten','Fotostudio');

insert into Person
values (nextval('person_seq'),'admin', 'admin');

insert into reservation
values (nextval('reservation_seq'), 1, '2023-11-15',1,'2023-11-15T20:00:00','2023-11-15T10:55:00');
