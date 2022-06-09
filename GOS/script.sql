CREATE DATABASE game_of_selects;
USE game_of_selects;

CREATE TABLE Lugares (
idLugar INT PRIMARY KEY AUTO_INCREMENT,
planeta VARCHAR(15),
coordenadas VARCHAR(40)
);
 
CREATE TABLE Momento (
idMomentos INT PRIMARY KEY AUTO_INCREMENT,
momento DATETIME,
fkPlace INT,
FOREIGN KEY (fkPlace) REFERENCES Lugares(idLugar)
);

CREATE TABLE Grupos (
idGrupo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (20)
);

CREATE TABLE Armas (
idWeapon INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20),
tipo VARCHAR(15), check (tipo in ("espada", "escudo", "arma de fogo", "martelo")),
valor DECIMAL (10,3)
);

CREATE TABLE Artefatos (
idArtefact INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(25),
descricao VARCHAR(50),
valor DECIMAL (10,3)
);

CREATE TABLE Inventario (
idInvent INT PRIMARY KEY AUTO_INCREMENT,
fkArma INT, FOREIGN KEY (fkArma) REFERENCES Armas(idWeapon),
fkArtefato INT, FOREIGN KEY (fkArtefato) REFERENCES Artefatos(idArtefact)
);

CREATE TABLE Persona (
idPersonas INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20),
indole CHAR(7), check (indole in("hero", "villain")),
fkGroup INT, FOREIGN KEY (fkGroup) REFERENCES Grupos (idGrupo),
fkInventory INT, FOREIGN KEY (fkInventory) REFERENCES Inventario(idInvent),
fkChefe INT, FOREIGN KEY (fkChefe) REFERENCES Persona (idPersonas)
);

CREATE TABLE Poderes (
idPower INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20),
nivel INT,
fkPessoa INT, FOREIGN KEY (fkPessoa) REFERENCES Persona (idPersonas)
);

CREATE TABLE Joias (
idJoia INT AUTO_INCREMENT,
nome VARCHAR(15),
fkMoment INT, FOREIGN KEY (fkMoment) REFERENCES Momento(idMomentos),
FkPersonagem INT, FOREIGN KEY (fkPersonagem) REFERENCES Persona(idPersonas),
PRIMARY KEY (idJoia, fkMoment)
);

-- drop database game_of_selects;

