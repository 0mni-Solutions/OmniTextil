var paginacao = {};
var tempo = {};
function obterDados(grafico, endpoint) {
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:3000/sensores/' + endpoint, false);
    http.send(null);
    var valores = JSON.parse(http.responseText);
    if (paginacao[endpoint] == null) {
        paginacao[endpoint] = 0;
    }
    if (tempo[endpoint] == null) {
        tempo[endpoint] = 0;
    }
    // Exibir à partir do último elemento exibido anteriormente
    var ultimaPaginacao = paginacao[endpoint];
    paginacao[endpoint] = valores.length;
    var valores = valores.slice(ultimaPaginacao);
    valores.forEach((valor) => {
        //Máximo de 60 itens exibidos no gráfico
        if (grafico.data.labels.length == 10 && grafico.data.datasets[0].data.length == 10) {
            grafico.data.labels.shift();
            grafico.data.datasets[0].data.shift();
        }

        grafico.data.labels.push(tempo[endpoint]++);
        grafico.data.datasets[0].data.push(parseFloat(valor));
        grafico.update();
    })
}

setInterval(() => {
    obterDados(dht11Umidade, 'dht11/umidade');
    obterDados(dht11Temperatura, 'dht11/temperatura');
    // obterDados(luminosidade, 'luminosidade');
    // obterDados(lm35Temperatura, 'lm35/temperatura');
    // obterDados(chave, 'chave');
}, 1000);