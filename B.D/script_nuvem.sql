CREATE TABLE Empresa (
idEmpresa INT PRIMARY KEY IDENTITY(1,1),
nomeEmpresa VARCHAR(45),
responsavel VARCHAR(70),
cadastroEmpresa DATE
);

CREATE TABLE Usuario (
idUsuario INT PRIMARY KEY IDENTITY(1,1),
fkEmpresa INT FOREIGN KEY REFERENCES Empresa(idEmpresa),
fkAdmin INT FOREIGN KEY REFERENCES Usuario(idUsuario),
nomeUsuario VARCHAR(80),
email VARCHAR(60),
senha VARCHAR(40),
cargo CHAR(5) CONSTRAINT chkCargo 
CHECK (cargo = 'ADMIN' or cargo = 'COMUM'),
cadastroUsuario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Endereco (
idEndereco INT PRIMARY KEY IDENTITY(1,1),
estado CHAR(2),
cidade VARCHAR(30),
bairro VARCHAR(25),
rua VARCHAR(45),
numero INT
);

CREATE TABLE Unidade (
idUnidade INT PRIMARY  KEY IDENTITY(1,1),
fkEmpresa INT FOREIGN KEY REFERENCES Empresa(idEmpresa),
fkEndereco INT FOREIGN KEY REFERENCES Endereco(idEndereco),
nomeUnidade VARCHAR(15),
fusoHorario CHAR(5) CONSTRAINT chkFuso 
CHECK (fusoHorario IN('GMT-2', 'GMT-3', 'GMT-4', 'GMT-5'))
);

CREATE TABLE Localidade (
idLocalidade INT PRIMARY KEY IDENTITY(1,1),
descricao VARCHAR(50)
);

CREATE TABLE Setor (
idSetor INT IDENTITY(1,1),
fkUnidade INT FOREIGN KEY REFERENCES Unidade(idUnidade),
fkLocalidade INT FOREIGN KEY REFERENCES Localidade(idLocalidade),
PRIMARY KEY (idSetor, fkUnidade, fkLocalidade),
nomeSetor CHAR(6)
);

CREATE TABLE Sensor (
idSensor INT PRIMARY KEY IDENTITY(1,1),
fkSetor INT FOREIGN KEY REFERENCES Setor(idSetor)
);

CREATE TABLE Dados (
idDados INT PRIMARY KEY IDENTITY(1,1),
fkSensor INT FOREIGN KEY REFERENCES Sensor(idSensor),
temperatura INT,
umidade INT,
data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Analytics (
idAnalytic INT PRIMARY KEY IDENTITY(1,1),
medida VARCHAR(12)
CONSTRAINT chkMedida CHECK (medida = 'umidade' or medida = 'temperatura'),
escala VARCHAR(10)
CONSTRAINT chkEscala CHECK (escala in ('MUITO ALTA', 'ALTA', 'IDEAL', 'BAIXA', 'MUITO BAIXA')),
data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);