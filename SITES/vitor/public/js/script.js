/* SCRIPT DE TODAS AS PÁGINAS */

/* HABILITAR CADASTRO */
if (typeof li_cadastro != "undefined") {
  // verifica se o elemento existe (OBRIGATORIAMENTE USA 3 ===)
  var permissao = sessionStorage.CARGO_USUARIO;
  if (permissao == "ADMIN") {
    li_cadastro.style.display = "list-item";
    hr_cadastro.style.display = "block";
  } else {
    li_cadastro.style.display = "none";
    hr_cadastro.style.display = "none";
  }
}

/* TEMAS */
// lembrar de assegurar em 'funcoes.js' para realocar o tema para o sessionStorage;
// definir tema padrão às páginas
link_theme.href = "css/theme_dark.css";
img_theme.src = "assets/imgs/header-footer/sun.png";

// definir tema ao carregar a página
if (sessionStorage.THEME == "light") {
  link_theme.href = "css/theme_light.css";
  img_theme.src = "assets/imgs/header-footer/moon.png";
} else if (sessionStorage.THEME == "dark") {
  link_theme.href = "css/theme_dark.css";
  img_theme.src = "assets/imgs/header-footer/sun.png";
} else {
  sessionStorage.THEME = "dark";
}
// function para mudar tema ao clicar no Sol;
function theme_change() {
  if (sessionStorage.THEME == "dark") {
    link_theme.href = "css/theme_light.css";
    img_theme.src = "assets/imgs/header-footer/moon.png";
    sessionStorage.THEME = "light";
  } else {
    link_theme.href = "css/theme_dark.css";
    img_theme.src = "assets/imgs/header-footer/sun.png";
    sessionStorage.THEME = "dark";
  }
}

/*------------------------------------------------------------------------------------------------------*/
/* SIDE MENU */
side_menu.style.display = "none";
function mostrarMenu() {
  if (side_menu.style.display == "none") {
    side_menu.style.display = "flex";
  } else {
    side_menu.style.display = "none";
  }
}

function fecharForm() {
  side_menu.style.display = "none";
}

/*------------------------------------------------------------------------------------------------------*/
/* CONFIRMAR MENU */
if (typeof div_confirm != "undefined") {
  div_confirm.style.display = "none";
}
function confirmarAction(condicao, idUsuario) {
  div_confirm.style.display = "flex";
  if (condicao == "sair") {
    p_confirm.innerHTML = `Desconectar sua conta?`;
    button_sim.setAttribute(
      "onclick",
      `limparSessao()`
    );
  } else if (condicao == "excluir") {
    p_confirm.innerHTML = `Excluir o usuário?`;
    button_sim.setAttribute(
      "onclick",
      `removerMembro(${idUsuario})`
    );
  } else if (condicao == "editar") {
    p_confirm.innerHTML = `Editar o usuário?`;
    button_sim.setAttribute(
      "onclick",
      `editarUpdate(${idUsuario})`
    );
  }

}

function fecharConfirm() {
  div_confirm.style.display = "none";
}

/*------------------------------------------------------------------------------------------------------*/

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
function carregarUnidades() {
  //aguardar();
  fetch(`/avisos/listarUnidades/${sessionStorage.EMPRESA_USUARIO}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var select = document.getElementById("select_unidades");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "-";
          mensagem.value = "0";
          select.appendChild(mensagem);
          throw "Nenhuma unidade registrada";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var select = document.getElementById("select_unidades");
          select.innerHTML = "";
          for (let i = 0; i < resposta.length; i++) {
            var unidade = resposta[i];

            // FORMA SIMPLES
            select.innerHTML += `
            <option value="${unidade.idUnidade}">${unidade.nomeUnidade}</option>
            `;

            var fkUnidade = select.options[select.selectedIndex].value;
            sessionStorage.UNIDADE_USUARIO = fkUnidade;

            // FORMA COMPLEXA
            // // criando elementos do HTML via JavaScript
            // var optionUnidade = document.createElement("option");

            // // colocando valores do select no innerHTML
            // optionUnidade.innerHTML = unidade.nomeUnidade;
            // optionUnidade.value = unidade.idUnidade;

            // // adicionando todos à um elemento pai pré-existente
            // select.appendChild(optionUnidade);
          }
          
          finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      finalizarAguardar();
    }) ;
}

function updateValueSelect() {
  var select = document.getElementById('select_unidades');
  var fkUnidade = select.options[select.selectedIndex].value;

  sessionStorage.UNIDADE_USUARIO = fkUnidade;

} updateValueSelect();

/*------------------------------------------------------------------------------------------------------*/
/* SETORES */
function listarSetores() {
  //aguardar();
  fetch(`/avisos/listarSetores/${sessionStorage.UNIDADE_USUARIO}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var setorCard = document.getElementById("setor_card");
          var mensagem = document.createElement("mensagem_erro");
          mensagem.innerHTML = "-";
          mensagem.value = "0";
          setorCard.appendChild(mensagem);
          throw "Nenhum resultado encontrado!!";
        }
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var setorCard = document.getElementById("setor_card");
          setorCard.innerHTML = "";
          for (let i = 0; i < resposta.length; i++) {
            var usuario = resposta[i];

          // adicionando todos à um elemento pai pré-existente
          setorCard.innerHTML += `
          <div class="item_setor"> 
            <p class="titulo_setor">${usuario.nomeSetor}</p>
            <p class="texto_setor">${usuario.descricao}</p>
            <a href="dashboard.html" type="button" onclick="continuar()" class="botao_setor">Continuar</a>
            </div>
            `;
          }

          finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      finalizarAguardar();
    }) ;
}

function updateValueSelect() {
  var select = document.getElementById('select_unidades');
  var fkUnidade = select.options[select.selectedIndex].value;

  sessionStorage.UNIDADE_USUARIO = fkUnidade;



} updateValueSelect();

/*------------------------------------------------------------------------------------------------------*/
