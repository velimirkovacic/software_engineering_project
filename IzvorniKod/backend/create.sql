
create sequence hibernate_sequence start 1 increment 1;

    create table korisnik (
       id int8 not null,
        email varchar(255),
        nickname varchar(255),
        role int8,
        suspended boolean not null,
        username varchar(255),
        primary key (id)
    );

    alter table korisnik 
       add constraint UK_87tbhltaua2a6k6jrdfl1kqap unique (email);

    alter table korisnik 
       add constraint UK_d7tnrllt9olfunnurk0gb24k9 unique (username);
