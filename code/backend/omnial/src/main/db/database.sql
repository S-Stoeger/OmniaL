--drop sequence roomID_seq;
--drop sequence personID_seq;
--drop sequence reservationID_seq;
--drop table reservations;
--drop table rooms;
--drop table persons;


CREATE TABLE rooms (
                       id number primary key,
                       name varchar(255),
                       description varchar(255)
);

CREATE TABLE persons (
                         id number primary key,
                         surname varchar(255),
                         firstname varchar(255)
);

CREATE TABLE reservations (
                              id number primary key,
                              roomId number,
                              personId number,
                              reservationDate date,
                              startTime date,
                              endTime date,
                              foreign key (roomId) references rooms(id),
                              foreign key (personId) references persons(id)
);

CREATE SEQUENCE roomID_seq;
CREATE SEQUENCE personID_seq;
CREATE SEQUENCE reservationID_seq;

insert into rooms
values (roomID_seq.nextval,'Fotostudio', 'Das Fotostudio steht für Schüler der Medientechnik zur verfügung um an Foto- und Videoprojekten zu arbeiten');

insert into persons
values (personID_seq.nextval,'Mustermann', 'Max');


insert into reservations
values(reservationID_seq.nextval,1, 1,TO_DATE('25.10.2023 ', 'DD.MM.YYYY'), TO_DATE('25.10.2023 10:00', 'DD.MM.YYYY hh24:mi'), TO_DATE('25.10.2023 10:50', 'DD.MM.YYYY hh24:mi'));

select * from persons;
select * from rooms;
select * from reservations;