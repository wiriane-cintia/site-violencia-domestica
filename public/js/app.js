(function () {
  // ---------- Menu do celular ----------
  const botaoMenu = document.getElementById('botao-menu');
  const botaoFechar = document.getElementById('botao-fechar-menu');
  const nav = document.getElementById('menu-principal');
  const fundo = document.getElementById('fundo-menu');

  if (botaoMenu && nav && fundo) {
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
  }

  // ---------- Busca por bairro ----------
  const campo = document.getElementById('campo-bairro');
  const lista = document.getElementById('lista-bairros');

  if (campo && lista) {
    const itens = Array.prototype.slice.call(lista.querySelectorAll('.busca-bairro__item'));
    const contador = document.getElementById('contador-bairros');
    const semResultado = document.getElementById('sem-resultado');
    const resultado = document.getElementById('resultado-bairro');
    const resultadoTitulo = document.getElementById('resultado-titulo');
    const fichas = {
      conselho_1: document.getElementById('ficha-conselho_1'),
      conselho_2: document.getElementById('ficha-conselho_2'),
      indefinido: document.getElementById('ficha-indefinido')
    };

    const alternar = document.getElementById('alternar-lista');

    // A lista só é escondida quando o JavaScript carrega: sem ele, tudo fica visível.
    document.body.classList.add('com-js');
    if (alternar) alternar.hidden = false;

    // Verdadeiro quando a pessoa pediu para ver a lista inteira pelo botão.
    let listaAberta = false;

    function normalizar(texto) {
      return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim();
    }

    function esconderResultado() {
      resultado.hidden = true;
      Object.keys(fichas).forEach(function (chave) {
        if (fichas[chave]) fichas[chave].hidden = true;
      });
    }

    function atualizarVisibilidadeDaLista(termo) {
      const mostrar = termo !== '' || listaAberta;
      lista.hidden = !mostrar;
      if (alternar) {
        alternar.setAttribute('aria-expanded', listaAberta ? 'true' : 'false');
        alternar.textContent = listaAberta ? 'Esconder a lista de bairros' : 'Ver todos os bairros';
        alternar.hidden = termo !== '';
      }
    }

    function filtrar() {
      const termo = normalizar(campo.value);
      let visiveis = 0;

      itens.forEach(function (item) {
        const nome = normalizar(item.getAttribute('data-nome'));
        const combina = termo === '' || nome.indexOf(termo) !== -1;
        item.hidden = !combina;
        if (combina) visiveis++;
      });

      semResultado.hidden = visiveis !== 0;
      atualizarVisibilidadeDaLista(termo);

      if (termo === '') {
        contador.textContent = '';
      } else if (visiveis === 0) {
        contador.textContent = 'Nenhum bairro encontrado.';
      } else if (visiveis === 1) {
        contador.textContent = '1 bairro encontrado.';
      } else {
        contador.textContent = visiveis + ' bairros encontrados.';
      }

      esconderResultado();
    }

    function mostrarResultado(item) {
      const nome = item.getAttribute('data-nome');
      const conselho = item.getAttribute('data-conselho');

      esconderResultado();

      if (conselho && fichas[conselho]) {
        resultadoTitulo.textContent = nome + ' é atendido pelo ' + (conselho === 'conselho_1' ? 'I' : 'II') + ' Conselho Tutelar.';
        fichas[conselho].hidden = false;
      } else {
        resultadoTitulo.textContent = nome + ':';
        fichas.indefinido.hidden = false;
      }

      resultado.hidden = false;
      resultado.focus();
    }

    campo.addEventListener('input', filtrar);

    if (alternar) {
      alternar.addEventListener('click', function () {
        listaAberta = !listaAberta;
        atualizarVisibilidadeDaLista(normalizar(campo.value));
        if (listaAberta) {
          const primeiro = lista.querySelector('.busca-bairro__botao');
          if (primeiro) primeiro.focus();
        }
      });
    }

    // Estado inicial: lista escondida, botão "Ver todos os bairros" disponível.
    filtrar();

    lista.addEventListener('click', function (evento) {
      const botao = evento.target.closest('.busca-bairro__botao');
      if (!botao) return;
      mostrarResultado(botao.parentElement);
    });
  }

  // ---------- VLibras ----------
  window.addEventListener('load', function () {
    if (window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
  });
})();