DROP TABLE IF EXISTS Korisnik CASCADE;
DROP TABLE IF EXISTS Uloga CASCADE;
DROP TABLE IF EXISTS imaUlogu;
DROP TABLE IF EXISTS jeBlokiranOd;
DROP TABLE IF EXISTS jePrijatelj;
DROP TABLE IF EXISTS Dogadjaj CASCADE;;
DROP TABLE IF EXISTS pohadja;
DROP TABLE IF EXISTS imaOznaku;
DROP TABLE IF EXISTS Oznaka;
DROP TABLE IF EXISTS Vrsta;



CREATE TABLE Korisnik
(
  id_korisnik BIGINT NOT NULL,
  nadimak VARCHAR(255) NOT NULL,
  korisnicko_ime VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  lozinka VARCHAR(255) NOT NULL,
  suspendiran BOOLEAN NOT NULL,
  PRIMARY KEY (id_korisnik),
  UNIQUE (korisnicko_ime),
  UNIQUE (email),
  CHECK (email like '%_@__%.__%')
);

CREATE TABLE Uloga
(
  id_uloga BIGINT NOT NULL,
  naziv_uloga VARCHAR(255) NOT NULL,
  opis_uloga VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_uloga)
);

CREATE TABLE Vrsta
(
  id_vrsta INT NOT NULL,
  naziv_vrsta VARCHAR(255) NOT NULL,
  opis_vrsta VARCHAR(255) NOT NULL,
  PRIMARY KEY (id_vrsta)
);

CREATE TABLE Oznaka
(
  id_oznaka INT NOT NULL,
  naziv_oznaka VARCHAR(255) NOT NULL,
  boja_hex CHAR(7) NOT NULL,
  PRIMARY KEY (id_oznaka),
  CHECK (boja_hex IS NULL OR boja_hex ~* '^#[a-f0-9]{6}$')
);

CREATE TABLE imaUlogu
(
  id_korisnik BIGINT NOT NULL,
  id_uloga BIGINT NOT NULL,
  PRIMARY KEY (id_korisnik, id_uloga),
  FOREIGN KEY (id_korisnik) REFERENCES Korisnik(id_korisnik),
  FOREIGN KEY (id_uloga) REFERENCES Uloga(id_uloga)
);

CREATE TABLE jePrijatelj
(
  id_korisnik BIGINT NOT NULL,
  id_prijatelj BIGINT NOT NULL,
  PRIMARY KEY (id_korisnik, id_prijatelj),
  FOREIGN KEY (id_korisnik) REFERENCES Korisnik(id_korisnik),
  FOREIGN KEY (id_prijatelj) REFERENCES Korisnik(id_korisnik)
);

CREATE TABLE jeBlokiranOd
(
  id_blokiran BIGINT NOT NULL,
  id_blokiran_od BIGINT NOT NULL,
  PRIMARY KEY (id_blokiran, id_blokiran_od),
  FOREIGN KEY (id_blokiran) REFERENCES Korisnik(id_korisnik),
  FOREIGN KEY (id_blokiran_od) REFERENCES Korisnik(id_korisnik)
);

CREATE TABLE Dogadjaj
(
  id_dogadjaj BIGINT NOT NULL,
  naziv VARCHAR(255) NOT NULL,
  mjesto VARCHAR(255) NOT NULL,
  vrijeme TIMESTAMP NOT NULL,
  opis VARCHAR(255) NOT NULL,
  promoviran BOOLEAN NOT NULL,
  koordinate VARCHAR(255) NOT NULL, --smisliti kako će se pohranjivati koordinate
  id_organizator BIGINT NOT NULL,
  id_vrsta INT NOT NULL,
  PRIMARY KEY (id_dogadjaj),
  FOREIGN KEY (id_organizator) REFERENCES Korisnik(id_korisnik),
  FOREIGN KEY (id_vrsta) REFERENCES Vrsta(id_vrsta)
);

CREATE TABLE pohadja
(
  recenzija SMALLINT NOT NULL,
  id_pohadjatelj BIGINT NOT NULL,
  id_dogadjaj BIGINT NOT NULL,
  PRIMARY KEY (id_pohadjatelj, id_dogadjaj),
  FOREIGN KEY (id_pohadjatelj) REFERENCES Korisnik(id_korisnik),
  FOREIGN KEY (id_dogadjaj) REFERENCES Dogadjaj(id_dogadjaj)
);

CREATE TABLE imaOznaku
(
  id_dogadjaj BIGINT NOT NULL,
  id_oznaka INT NOT NULL,
  PRIMARY KEY (id_dogadjaj, id_oznaka),
  FOREIGN KEY (id_dogadjaj) REFERENCES Dogadjaj(id_dogadjaj),
  FOREIGN KEY (id_oznaka) REFERENCES Oznaka(id_oznaka)
);


INSERT INTO vrsta VALUES (1, 'Obveza', 'Događaj koji se odnosi samo na korisnika koji ga je stvorio');
INSERT INTO vrsta VALUES (2, 'Privatni događaj', 'Događaj koji se odnosi na korisnika koji ga je stvorio i ljude koje je pozvao');
INSERT INTO vrsta VALUES (3, 'Javni događaj', 'Događaj na koji se mogu prijaviti svi korisnici platforme, osim onih koje je korisnik, koji je događaj stvorio, blokirao');

INSERT INTO uloga VALUES (1, 'Korisnik', 'Običan korisnik platforme');
INSERT INTO uloga VALUES (2, 'Premium korisnik', 'Korisnik koji ima mogućnost promocije svojih javnih događaja');
INSERT INTO uloga VALUES (3, 'Moderator', 'Korisnik koji ima mogućnost suspendiranja ostalih korisnika, brisanja javnih događaja i uređivanja oznaka na javnim događajima');
INSERT INTO uloga VALUES (4, 'Administrator', 'Korisnik koji ima mogućnost promocije korisnika na moderatore i brisanja korisničkih računa');

INSERT INTO oznaka VALUES (1, 'Kava', '#6f4e37');
INSERT INTO oznaka VALUES (2, 'Piva', '#f28e1c');
--Treba dodat još oznaka...