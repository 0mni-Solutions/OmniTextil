/* SCRIPT DE TODAS AS PÁGINAS */

/* TEMAS */
var themeNow = "";
img_theme.src = "assets/imgs/header-footer/sun_on.png";
theme_change();
function theme_change() {
  if (themeNow == "") {
    themeNow = "dark";
    link_theme.href = "css/theme_dark.css";
    img_theme.src = "assets/imgs/header-footer/sun_on.png";
  } else if (themeNow == "dark") {
    themeNow = "light";
    link_theme.href = "css/theme_light.css";
    img_theme.src = "assets/imgs/header-footer/sun_off.png";
  } else {
    themeNow = "dark";
    link_theme.href = "css/theme_dark.css";
    img_theme.src = "assets/imgs/header-footer/sun_on.png";
  }
}

/* SIMULADOR */
function simular() {
  var qntTecido = Number(input_qntTecido.value);
  var valorTecido = Number(input_valorTecido.value);
  var tecidoDescartado = Number(input_tecidoDescartado.value);

  card_simulador.style.display = "flex";

  if (
    qntTecido == null ||
    valorTecido == null ||
    tecidoDescartado == null ||
    qntTecido == 0 ||
    valorTecido == 0 ||
    tecidoDescartado == 0
  ) {
    div_resultado.innerHTML = `Nenhum dos campos na calculadora podem ser vazios`;
  } else {
    lucroTotal = qntTecido * valorTecido;
    percaLucro = tecidoDescartado * valorTecido;
    porcentagem = (percaLucro * 100) / lucroTotal;
    lucroAtual = lucroTotal - percaLucro;

    div_resultado.innerHTML = `Seu lucro atual sem o nosso serviço é de 
        <strong>${lucroAtual.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}.</strong>
        <br>
        <br>
        Seu lucro total com nosso produto seria de 
        ${lucroTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}, 
        que equivale a ${porcentagem.toFixed(0)}%
        a mais no seu lucro atual, simbolizando um aumento de 
        <strong>${percaLucro.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}.</strong>`;
  }
}

/*------------------------------------------------------------------------------------------------------*/

/* LOGIN */

/*------------------------------------------------------------------------------------------------------*/

/* UNIDADES */
var unidade = 0;

function carregar_dashboard() {
  unidade = Number(select_unidades.value);

  if (unidade > 0) {
    alert("Carregando Dashboard");
  } else {
    alert("Escolha uma Unidade");
  }
}

/*------------------------------------------------------------------------------------------------------*/
