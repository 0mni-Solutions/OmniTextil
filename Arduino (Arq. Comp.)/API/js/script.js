/* SCRIPT DE TODAS AS PÁGINAS */

/* TEMAS */
// lembrar de assegurar em 'funcoes.js' para realocar o tema para o sessionStorage;
// definir tema padrão às páginas
link_theme.href = "css/theme_dark.css";
img_theme.src = "assets/imgs/header-footer/sun_on.png";

// definir tema ao carregar a página
if (sessionStorage.theme == "light") {
  link_theme.href = "css/theme_light.css";
  img_theme.src = "assets/imgs/header-footer/sun_off.png";
  sessionStorage.theme == "light";
} else if (sessionStorage.theme == "dark") {
  link_theme.href = "css/theme_dark.css";
  img_theme.src = "assets/imgs/header-footer/sun_on.png";
  sessionStorage.theme == "dark";
} else {
  sessionStorage.theme = "dark";
}
// function para mudar tema ao clicar no Sol;
function theme_change() {
  if (sessionStorage.theme == "dark") {
    link_theme.href = "css/theme_light.css";
    img_theme.src = "assets/imgs/header-footer/sun_off.png";
    sessionStorage.theme = "light";
  } else {
    link_theme.href = "css/theme_dark.css";
    img_theme.src = "assets/imgs/header-footer/sun_on.png";

    sessionStorage.theme = "dark";
  }
}

/*------------------------------------------------------------------------------------------------------*/
