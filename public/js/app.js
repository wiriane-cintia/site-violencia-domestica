(function () {
  const botaoMenu = document.getElementById('botao-menu');
  const botaoFechar = document.getElementById('botao-fechar-menu');
  const nav = document.getElementById('menu-principal');
  const fundo = document.getElementById('fundo-menu');

  if (!botaoMenu || !nav || !fundo) return;

  function abrirMenu() {
    nav.classList.add('cabecalho__nav--aberto');
    fundo.classList.add('cabecalho__fundo--aberto');
    botaoMenu.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-aberto');
  }

  function fecharMenu() {
    nav.classList.remove('cabecalho__nav--aberto');
    fundo.classList.remove('cabecalho__fundo--aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-aberto');
  }

  botaoMenu.addEventListener('click', abrirMenu);
  botaoFechar.addEventListener('click', fecharMenu);
  fundo.addEventListener('click', fecharMenu);

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      fecharMenu();
    }
  });
})();