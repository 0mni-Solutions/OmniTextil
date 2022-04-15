-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
-- criação do banco de dados e das tabelas
CREATE DATABASE Omni_Textil;
USE Omni_Textil;

CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(45),
responsavel VARCHAR(70),
dtCadastro DATE
);

CREATE TABLE Tecido (
idTecido INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(15),
temperatura_max INT,
temperatura_min INT,
umidade_max INT,
umidade_min INT,
qntTecido INT
);

CREATE TABLE Unidade (
idUnidade INT PRIMARY  KEY AUTO_INCREMENT,
nomeUnidade VARCHAR(15),
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
fkTecido INT,
FOREIGN KEY (fkTecido) REFERENCES Tecido(idTecido)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
temperatura INT,
umidade INT,
data_hora DATETIME,
fkUnidade INT,
FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade)
);

CREATE TABLE Dados (
idDados INT PRIMARY KEY AUTO_INCREMENT,
temperatura INT,
umidade INT,
data_hora DATETIME,
fkUnidade INT,
fkSensor INT,
FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor)
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(80),
email VARCHAR(60),
senha VARCHAR(40),
cargo CHAR(5) constraint chkCargo check (cargo = 'ADMIN' or cargo = 'COMUM'),
dtCadastro DATE,
fkEmpresa INT,
FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa),
fkAdmin INT,
FOREIGN KEY (fkAdmin) REFERENCES Usuario(idUsuario)
);


INSERT INTO Empresa VALUES (null, 'Valtex', 'Fernando Folster', '2022-03-15');
INSERT INTO Usuario VALUES (null, 'admin_valtex', 'valtexsbc@uol.com.br', 'valtex159753', 'ADMIN', '2022-03-15', 1, null);



/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


