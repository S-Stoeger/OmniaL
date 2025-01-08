drop table reservtion;
drop table person;
drop table room;

create room(
       id number primary key,
       description varchar(),
       name varchar()
)

create sequence room_seq;
create sequence person_seq;
create sequence reservation_seq;

-- Insert Person
-- id, email, firstname, grade, surname, person_uuid

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'s.stoeger@students.htl-leonding.ac.at', 'Sophie', '4AHITM', 'Stöger', '');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'s.binder@students.htl-leonding.ac.at', 'Sophie', '4AHITM', 'Binder', '');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'omnial@omnial.gmail.com', 'Omnial', 'test-User', 'Omnial', '');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'m.slabschi@students.htl-leonding.ac.at', 'Maxi', '4AHITM', 'Slabschi', '');

insert into Person (id, email, firstname, grade, surname, person_uuid)
values (nextval('person_seq'),'moritz.wagner06@gmx.at', 'Moritz', '4AHITM', 'Wagner', '');


--Insert Rooms
insert into Room (id, description, name)
values (nextval('room_seq'),'Das Fotostudio steht für Schüler der Medientechnik zur verfügung um an Foto- und Videoprojekten zu arbeiten','Fotostudio');


-- Insert Reservation
insert into reservation
values (nextval('reservation_seq'), 1, '2024-11-15',1,'2024-11-15T20:00:00','2024-11-15T10:55:00');