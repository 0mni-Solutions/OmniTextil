var avisoModel = require("../models/avisoModel");

function testar(req, res) {
  console.log("ENTRAMOS NO avisoController");
  res.send("ENTRAMOS NO AVISO CONTROLLER");
}

function listar(req, res) {
  var fkEmpresa = req.params.fkEmpresa;
  avisoModel
    .listar(fkEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarUnidades(req, res) {
  var fkEmpresa = req.params.fkEmpresa;
  avisoModel
    .listarUnidades(fkEmpresa)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  avisoModel
    .listarPorUsuario(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function pesquisarDescricao(req, res) {
  var descricao = req.params.descricao;

  avisoModel
    .pesquisarDescricao(descricao)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  var idUsuario = req.params.idUsuario;

  if (titulo == undefined) {
    res.status(400).send("O título está indefinido!");
  } else if (descricao == undefined) {
    res.status(400).send("A descrição está indefinido!");
  } else if (idUsuario == undefined) {
    res.status(403).send("O id do usuário está indefinido!");
  } else {
    avisoModel
      .publicar(titulo, descricao, idUsuario)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function editarList(req, res) {
  var idUsuario = req.params.idUsuario;
  avisoModel.editarList(idUsuario)
    .then(function (resultado) {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum dado encontrado!");
      }
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar o usuário: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function editarUpdate(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cargo = req.body.cargoServer;
    var fkEmpresa = req.body.empresaServer;
    var fkAdmin = req.body.adminServer;

    if (idUsuario == undefined) {
        res.status(400).send("ID do usuário está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Seu cargo está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else if (fkAdmin == undefined) {
        res.status(400).send("Seu admin está undefined!");
    } else {
        
        avisoModel.editarUpdate(idUsuario, nome, email, senha, cargo, fkEmpresa, fkAdmin)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o update! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function deletar(req, res) {
  var idUsuario = req.params.idUsuario;

  avisoModel
    .deletar(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  testar,
  listar,
  listarUnidades,
  listarPorUsuario,
  pesquisarDescricao,
  publicar,
  editarList,
  editarUpdate,
  deletar
};
