-- CREATE
CREATE DATABASE game_of_selects;
USE game_of_selects;
-- drop database game_of_selects;

CREATE TABLE Lugares (
idLugar INT PRIMARY KEY AUTO_INCREMENT,
planeta VARCHAR(20),
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
nome VARCHAR (30)
);

CREATE TABLE Armas (
idWeapon INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20),
tipo VARCHAR(15), check (tipo in ("espada", "escudo", "arma de fogo", "martelo")),
valor DECIMAL (10,2)
);

CREATE TABLE Artefatos (
idArtefact INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(25),
descricao VARCHAR(50),
valor DECIMAL (10,2)
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
nome VARCHAR(30),
nivel INT,
fkPessoa INT, FOREIGN KEY (fkPessoa) REFERENCES Persona (idPersonas)
);

CREATE TABLE Joias (
idJoia INT,
nome VARCHAR(30),
fkMoment INT, FOREIGN KEY (fkMoment) REFERENCES Momento(idMomentos),
FkPersonagem INT, FOREIGN KEY (fkPersonagem) REFERENCES Persona(idPersonas),
PRIMARY KEY (idJoia, fkMoment)
);


-- INSERTS
-- Armas
-- sem FK
INSERT INTO Armas VALUES (
        null, 'MySqlnir', 'martelo', 10000.99
    ), (
        null, 'Honjo Masamune', 'espada', 400040.99
    ), (
        null, 'Porte do Homi', 'arma de fogo', 410666.99
    ), (
        null, 'Espada da Levitação', 'espada', 300666.99
    ), (
        null, 'Égide', 'escudo', 304466.99
    );

INSERT INTO Artefatos VALUES (
        null, 'Anel de Gyges', 'Pertencido ao rei Giges, concede a invisibilidade', 3044.99
    ), (
        null, 'Livro de Thoth', 'Escritos por Tote. Ele concede magia aos usuários', 6006.99
    ), (
        null, 'Telescópio de Galileu', 'Prévia do futuro', 1.99
    ), (
        null, 'Book of Life','Tem o poder de voltar no tempo', 45358.99
    ),(
        null, 'Luva de Pedreiro','Comportam as joias', 4531.99
    );

INSERT INTO Lugares VALUES (
        null,'Consolatveria',
        '-23.55803278435977, -46.66162472962092'
    ), (
        null,'Terceiro WakAndar',
        '-23.55803278435977, -46.66152472962092'
    ), (
        null, 'Planeta 11Handar',
        '-23.55893278435977, -46.66162472962092'
    ), (
        null, 'Consolatveria',
        '-23.55803278435977, -46.66152472962092'
    ), (
        null, 'Terceiro WakAndar',
        '-23.557755582828936, -46.66060596381608'
    ), (
        null, 'Planeta 11Handar',
        '23.55803278435977, -46.66162472962092'
    );

INSERT into Grupos VALUES(
        null, 'SPtechers'
    ),(
        null, 'Diretoria do infinito'
    );

-- com FK
INSERT INTO Inventario VALUES
(null,'1','1'),
(null,'2','2'),
(null,'3','3'),
(null,'4','4'),
(null,'5','5');

INSERT into Persona VALUES (
    null,'DANtor Estranho', 'hero', 1, 4, null
),(
    null,'Paulo', 'hero', 1, 1, null 
), (
    null, 'Vi Vian Doom', 'villain', 2, 3, null
), (
    null, 'CaiUltron', 'villain', 2, 2, null
), (
    null, 'BRANDHANOS', 'villain', 2, 5, null
);

update Persona set fkChefe = 2 where idPersonas = 1;
update Persona set fkChefe = 5 where idPersonas in (3, 4);


INSERT Poderes VALUES (
        null, 'HTML5', 1, 2
    ), (
        null, 'CSS5', 2, 2
    ), (
        null,'Vetor Colossal', 3, 4 
    ), (
        null, 'Javascriptadotrs', 1, 4
    ), (
        null, 'Olho do Console', 2, 2
    ), (
        null, 'Inner Join', 3, 3
    ), (
        null, 'Magia Proibida dos Dados', 1, 3
    );

INSERT INTO Momento VALUES
(null, "2022/03/14 13:32:32", 1),
(null, "2022/03/14 15:15:11", 2),
(null, "2022/03/14 14:30:00", 3),

(null, "2022/04/25 14:13:20", 4),
(null, "2022/04/25 13:30:00", 5),
(null, "2022/04/25 15:45:02", 6),
(null, "2022/04/25 13:45:50", 1),

(null, "2022/05/30 11:00:00", 2),
(null, "2022/05/30 11:15:00", 3),
(null, "2022/05/30 11:30:00", 4),
(null, "2022/05/30 11:45:00", 5),
(null, "2022/05/30 12:00:00", 6),
(null, "2022/05/30 12:15:00", 1);


INSERT INTO Joias VALUES (
        1, 'Ouro Branco da Realidade', 1, 5
    ), (
        2, 'Ouro Branco da Mente', 2, 5
    ), (
        3, 'Ouro Branco da Alma', 3, 5
    ), (
        4, 'Ouro Branco do Poder', 4, 5
    ), (
        5, 'Ouro Branco do Espaço ', 5, 5
    ), (
        6, 'Ouro Branco do Tempo', 6, 5
    ), (
        1, 'Ouro Branco da Realidade', 7, 2
    ), (
        2, 'Ouro Branco da Mente', 8, 2
    ), (
        3, 'Ouro Branco da Alma', 9, 2
    ), (
        4, 'Ouro Branco do Poder', 10, 2
    ), (
        5, 'Ouro Branco do Espaço', 11, 2
    ), (
        6, 'Ouro Branco do Tempo', 12, 2
    );

-- SELECTS
-- 1
SELECT planeta FROM Lugares 
	WHERE coordenadas = "-23.55803278435977, -46.66162472962092";
-- 2
SELECT coordenadas FROM Lugares 
	WHERE coordenadas LIKE "%66152%";
-- 3
SELECT nome FROM Armas
	WHERE valor > 400000
		ORDER BY valor ASC;
-- 4
SELECT descricao FROM Artefatos
	WHERE valor >= 4531.99 AND valor <= 6006.99
		ORDER BY idArtefact DESC;
-- 5
SELECT nome FROM Armas
	WHERE valor < 304466.99 
		ORDER BY idWeapon DESC;
-- 6 
SELECT * FROM Poderes
	WHERE nome LIKE "%o__"
		ORDER BY nivel ASC;

-- 7
SELECT * FROM Poderes
	WHERE nome LIKE "___o%"
		AND nivel < 3;
        
-- 8 
SELECT * FROM Poderes 
	WHERE nivel > 1 
		ORDER BY nivel desc;
        
-- 9
SELECT nome FROM Persona 
	WHERE nome like "%o_" 
		AND indole = "villain" 
			ORDER BY idPersonas ASC;
            
-- 10
SELECT * FROM Momento 
	WHERE idMomentos >= 4 
		AND idMomentos <=8 
			ORDER BY momento;
		
-- 11 
SELECT * FROM Joias
	WHERE nome LIKE "%I%" 
		AND nome LIKE "%R%";
        
-- 12
SELECT nome FROM Persona
	WHERE nome LIKE "%an%" AND indole = "villain"
		ORDER BY idPersonas DESC;

-- 13
SELECT * FROM ARMAS;
SELECT nome FROM Armas WHERE tipo = "espada"
	AND nome LIKE "%a%" AND nome LIKE "%m%" AND  valor < 404466.99 
		ORDER BY valor DESC;
