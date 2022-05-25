var database = require("../database/config");

function buscarUltimasMedidas(fkSensor, limite_linhas) {
  instrucaoSql = `select 
                        temperatura, 
                        umidade, 
                        data_hora,
                        DATE_FORMAT(data_hora,'%H:%i:%s') as momento_grafico
                    from Dados
                    where fkSensor = ${fkSensor}
                    order by idDados desc limit ${limite_linhas}`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkSensor) {
  instrucaoSql = `select 
                        temperatura, 
                        umidade, 
                        DATE_FORMAT(data_hora,'%H:%i:%s') as momento_grafico, 
                        fkSensor 
                        from Dados where fkSensor = ${fkSensor} 
                    order by idDados desc limit 1`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
};
