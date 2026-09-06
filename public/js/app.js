(function () {
  // Marca que o JavaScript carregou. O CSS usa isso para so ativar recursos
  // que dependem dele (a gaveta do menu, o filtro da busca).
  document.documentElement.classList.add('com-js');

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


  // ---------- Saida rapida (site VD) ----------
  // Precedencia sobre qualquer outro elemento: e mecanismo de seguranca.
  const saida = document.getElementById('saida-rapida');

  if (saida) {
    const destino = saida.getAttribute('href');

    function sairDoSite() {
      // replace nao deixa esta pagina no historico do navegador.
      window.location.replace(destino);
    }

    saida.addEventListener('click', function (evento) {
      evento.preventDefault();
      sairDoSite();
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') {
        sairDoSite();
      }
    });

    // Onde existe saida rapida, a navegacao interna tambem usa replace: assim
    // nenhuma pagina deste site fica na pilha do botao voltar do navegador.
    document.addEventListener('click', function (evento) {
      if (evento.defaultPrevented) return;
      if (evento.button !== 0 || evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const link = evento.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;

      const destino = new URL(link.href, window.location.href);
      if (destino.origin !== window.location.origin) return;

      evento.preventDefault();
      window.location.replace(destino.href);
    });
  }

  // ---------- Orientacao guiada ----------
  const abrirOrientacao = document.getElementById('abrir-orientacao');
  const painel = document.getElementById('painel-orientacao');

  if (abrirOrientacao && painel) {
    const fecharOrientacao = document.getElementById('fechar-orientacao');
    const tituloPainel = document.getElementById('orientacao-titulo');
    const botaoVoltar = document.getElementById('voltar-orientacao');
    const botaoRecomecar = document.getElementById('recomecar-orientacao');

    const passos = {};
    Array.prototype.forEach.call(painel.querySelectorAll('.orientacao__passo'), function (elemento) {
      passos[elemento.getAttribute('data-passo')] = elemento;
    });

    const blocosPerguntas = painel.querySelectorAll('.orientacao__perguntas');
    const blocosResposta = painel.querySelectorAll('.orientacao__resposta');

    let passoAtual = 1;
    let voltarPara = 1;

    function esconderTodos(colecao) {
      Array.prototype.forEach.call(colecao, function (elemento) {
        elemento.hidden = true;
      });
    }

    function mostrarPasso(numero) {
      passoAtual = numero;
      Object.keys(passos).forEach(function (chave) {
        passos[chave].hidden = String(numero) !== chave;
      });
      botaoVoltar.hidden = numero === 1;
      botaoRecomecar.hidden = numero === 1;
      tituloPainel.focus();
    }

    function abrirPainel() {
      painel.hidden = false;
      abrirOrientacao.setAttribute('aria-expanded', 'true');
      mostrarPasso(1);
    }

    function fecharPainel() {
      painel.hidden = true;
      abrirOrientacao.setAttribute('aria-expanded', 'false');
      abrirOrientacao.focus();
    }

    function escolherSituacao(id, risco) {
      esconderTodos(blocosPerguntas);
      esconderTodos(blocosResposta);

      if (risco === 'sim') {
        // Risco imediato nao abre resposta informativa: vai direto ao canal humano.
        voltarPara = 1;
        const resposta = painel.querySelector('.orientacao__resposta[data-resposta="' + id + '"]');
        if (resposta) resposta.hidden = false;
        mostrarPasso(3);
        return;
      }

      const perguntas = painel.querySelector('.orientacao__perguntas[data-situacao="' + id + '"]');
      if (perguntas) perguntas.hidden = false;
      mostrarPasso(2);
    }

    function escolherPergunta(chave, origem) {
      voltarPara = origem;
      esconderTodos(blocosResposta);
      const resposta = painel.querySelector('.orientacao__resposta[data-resposta="' + chave + '"]');
      if (resposta) resposta.hidden = false;
      mostrarPasso(3);
    }

    abrirOrientacao.addEventListener('click', function () {
      if (painel.hidden) {
        abrirPainel();
      } else {
        fecharPainel();
      }
    });

    fecharOrientacao.addEventListener('click', fecharPainel);

    painel.addEventListener('click', function (evento) {
      const opcao = evento.target.closest('.orientacao__opcao');
      if (!opcao) return;

      if (opcao.hasAttribute('data-situacao')) {
        escolherSituacao(opcao.getAttribute('data-situacao'), opcao.getAttribute('data-risco'));
      } else if (opcao.hasAttribute('data-resposta')) {
        // A saida "nenhuma dessas" existe no passo 1 e no passo 2: volta para onde estava.
        escolherPergunta(opcao.getAttribute('data-resposta'), passoAtual);
      }
    });

    botaoVoltar.addEventListener('click', function () {
      if (passoAtual === 3 && voltarPara === 2) {
        mostrarPasso(2);
      } else {
        mostrarPasso(1);
      }
    });

    botaoRecomecar.addEventListener('click', function () {
      esconderTodos(blocosPerguntas);
      esconderTodos(blocosResposta);
      voltarPara = 1;
      mostrarPasso(1);
    });

    // Onde existe saida rapida, a tecla Esc pertence a ela: o painel nao a intercepta.
    if (!saida) {
      document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && !painel.hidden) {
          fecharPainel();
        }
      });
    }
  }

  // ---------- VLibras ----------
  window.addEventListener('load', function () {
    if (window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
  });
})();