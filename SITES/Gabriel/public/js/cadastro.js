  function cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = input_nome.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var confirmacaoSenhaVar = input_confirmar_senha.value;
    var cargoVar = select_cargo.value;

    if (
      nomeVar == "" ||
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" ||
      cargoVar == ""
    ) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "Preencha todos os campos para prosseguir!";

      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "Ops, e-mail inválido! Verifique e tente novamente.";
      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    if (senhaVar != confirmacaoSenhaVar) {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML =
        "As senhas inseridas devem ser iguais para prosseguir!";
      finalizarAguardar();
      return false;
    } else {
      setInterval(sumirMensagem, 5000);
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        cargoServer: cargoVar,
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            //   window.location = "login.html";
          cardErro.style.display = "block";
          mensagem_erro.innerHTML = "Cadastro realizado com sucesso!";
          limparFormulario();
          finalizarAguardar();
        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
      });

    return false;
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }
