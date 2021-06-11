/*
DROP DATABASE saipos;
CREATE DATABASE saipos;
USE saipos;

CREATE TABLE IF NOT EXISTS status (
  idStatus TINYINT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  PRIMARY KEY (idStatus))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS Tarefa (
  idTarefa INT NOT NULL AUTO_INCREMENT,
  idStatus TINYINT NOT NULL,
  descricao VARCHAR(240) NOT NULL,
  nomeResponsavel VARCHAR(60) NOT NULL,
  emailResponsavel VARCHAR(120) NOT NULL,
  dataCadastro DATE NOT NULL,
  horaCadastro TIME NOT NULL,
  dataUpdate DATE NULL DEFAULT NULL,
  horaUpdate TIME NULL DEFAULT NULL,
  PRIMARY KEY (idTarefa),
  INDEX fk_tarefa_status_idx (idStatus ASC) VISIBLE,
  CONSTRAINT fk_tarefa_status
    FOREIGN KEY (idStatus)
    REFERENCES status (idStatus))
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS TarefaHistorico (
  idTarefaHistorico INT NOT NULL AUTO_INCREMENT,
  idTarefa INT NOT NULL,
  idStatus TINYINT NOT NULL,
  descricao VARCHAR(240) NOT NULL,
  nomeResponsavel VARCHAR(60) NOT NULL,
  emailResponsavel VARCHAR(120) NOT NULL,
  dataCadastro DATE NOT NULL,
  horaCadastro TIME NOT NULL,
  dataUpdate DATE NULL DEFAULT NULL,
  horaUpdate TIME NULL DEFAULT NULL,
  PRIMARY KEY (idTarefaHistorico),
  INDEX fkTarefa_historico_idx (idTarefa ASC) VISIBLE,
  INDEX fkTarefaHistorico_status_idx (idStatus ASC) VISIBLE,
  INDEX idxDescricao (descricao ASC) INVISIBLE,
  INDEX idxEmailResponsavel (emailResponsavel ASC) INVISIBLE,
  INDEX idxDataCadastro (dataCadastro ASC) VISIBLE,
  CONSTRAINT fkTarefa_historico
    FOREIGN KEY (idTarefa)
    REFERENCES Tarefa (idTarefa),
  CONSTRAINT fkTarefaHistorico_status
    FOREIGN KEY (idStatus)
    REFERENCES status (idStatus))
ENGINE = InnoDB;


INSERT INTO status (nome) VALUES ('PENDENTE');
INSERT INTO status (nome) VALUES ('EXECUTANDO');
INSERT INTO status (nome) VALUES ('CONCLUIDO');

DELIMITER $$
DROP PROCEDURE IF EXISTS saipos.inserirTarefa $$
CREATE PROCEDURE saipos.inserirTarefa(IN _descricao VARCHAR(240), IN _nome VARCHAR(60), IN _email VARCHAR(120))
BEGIN
	INSERT INTO Tarefa 
    (idStatus, descricao, nomeResponsavel, emailResponsavel, dataCadastro, horaCadastro)
	VALUES
    (1, _descricao, _nome, _email, CURRENT_DATE(), CURRENT_TIME());
END $$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` TRIGGER `tarefa_AFTER_INSERT` AFTER INSERT ON `tarefa` FOR EACH ROW BEGIN
	INSERT INTO TarefaHistorico
		(idTarefa, idStatus, descricao, nomeResponsavel, emailResponsavel, dataCadastro, horaCadastro)
	VALUES
		(NEW.idTarefa, NEW.idStatus, NEW.descricao, NEW.nomeResponsavel, NEW.emailResponsavel, NEW.dataCadastro, NEW.horaCadastro);
END $$
DELIMITER ;

DELIMITER $$
CREATE DEFINER = CURRENT_USER TRIGGER `saipos`.`tarefa_AFTER_UPDATE` AFTER UPDATE ON `tarefa` FOR EACH ROW
BEGIN
	INSERT INTO TarefaHistorico
		(idTarefa, idStatus, descricao, nomeResponsavel, emailResponsavel, dataCadastro, horaCadastro)
	VALUES
		(NEW.idTarefa, NEW.idStatus, NEW.descricao, NEW.nomeResponsavel, NEW.emailResponsavel, NEW.dataCadastro, NEW.horaCadastro);
END $$
DELIMITER ;

DELIMITER $$

CREATE DEFINER=`root`@`localhost` TRIGGER `tarefa_BEFORE_UPDATE` BEFORE UPDATE ON `tarefa` FOR EACH ROW BEGIN
	SELECT 	count(idTarefa) as qtd
	INTO 	@qtdTarefa
    FROM 	TarefaHistorico
    WHERE 	idTarefa = NEW.idTarefa
    AND		idStatus = 3;
    IF(@qtdTarefa > 2 AND NEW.idStatus = 1) THEN
		SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Esta tarefa não pode voltar mais para PENDENTE', MYSQL_ERRNO = 45000;
	END IF;
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE saipos.listarTarefa()
BEGIN
	SELECT 	Status.nome as status, Tarefa.idTarefa, Tarefa.descricao, Tarefa.nomeResponsavel, Tarefa.emailResponsavel, 
			DATE_FORMAT(CONCAT(Tarefa.dataCadastro, ' ', Tarefa.horaCadastro), '%d/%m/%Y') as dataCadastro 
	FROM Tarefa
	JOIN Status ON Tarefa.idStatus = Status.idStatus;
END $$
DELIMITER ;


*/

CALL saipos.inserirTarefa('TESTE DE TAREFA', 'JEFFERSON MIRANDA', 'jeffersonmiranda0@gmail.com');
CALL saipos.inserirTarefa('TESTE DE TAREFA', 'JEFFERSON MIRANDA', 'jeffersonmiranda0@gmail.com');
CALL saipos.listarTarefa();


SELECT * FROM Tarefa;
UPDATE Tarefa SET idStatus = 2 WHERE idTarefa = 1;
selecT * From status;
SELECT * FROM TarefaHistorico;

/tarefas/atualizar