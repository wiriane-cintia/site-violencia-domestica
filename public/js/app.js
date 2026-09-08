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
    const limpar = document.getElementById('limpar-busca');

    if (alternar) alternar.hidden = false;

    // Em tela estreita a instrucao completa nao cabe dentro do campo, entao
    // usamos a versao curta. A completa continua no rotulo, para leitor de tela.
    const textoLongo = campo.getAttribute('placeholder');
    const textoCurto = campo.getAttribute('data-placeholder-curto') || textoLongo;

    // Mede o proprio campo em vez da tela: se a frase inteira nao couber ali
    // dentro, usa a versao curta, para nunca aparecer cortada.
    function ajustarPlaceholder() {
      var cabe = campo.clientWidth >= 540;
      campo.setAttribute('placeholder', cabe ? textoLongo : textoCurto);
    }

    ajustarPlaceholder();
    window.addEventListener('resize', ajustarPlaceholder);

    // Ao clicar no campo, a instrucao some e o cursor fica sozinho na
    // esquerda, pronto para digitar. Se sair sem escrever nada, ela volta.
    campo.addEventListener('focus', function () {
      campo.setAttribute('placeholder', '');
    });

    campo.addEventListener('blur', function () {
      if (campo.value === '') ajustarPlaceholder();
    });

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
        // Troca so o texto: mexer no botao inteiro apagaria o icone da seta.
        const textoBotao = alternar.querySelector('.busca-bairro__alternar-texto');
        if (textoBotao) {
          // Os dois rotulos vem do bairros.json, pelos data-atributos do proprio
          // elemento: trocar a palavra nao exige mexer no JavaScript.
          textoBotao.textContent = listaAberta
            ? (textoBotao.getAttribute('data-rotulo-aberto') || 'Fechar lista')
            : (textoBotao.getAttribute('data-rotulo-fechado') || 'Listar bairros');
        }
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

      // O X so aparece quando ha o que limpar.
      if (limpar) limpar.hidden = campo.value === '';

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

    // Estado inicial: lista escondida, botão de listar os bairros disponível.
    filtrar();

    // Fecha a busca inteira: apaga o que foi digitado, esconde a lista e a
    // resposta, e devolve o cursor ao campo para quem quiser buscar de novo.
    function limparBusca() {
      campo.value = '';
      listaAberta = false;
      filtrar();
      campo.focus();
    }

    if (limpar) {
      limpar.addEventListener('click', limparBusca);
    }

    // Esc dentro do campo tambem limpa — menos no site que tem saida rapida,
    // onde o Esc pertence a ela e nao pode ser desviado para outra coisa.
    if (!document.getElementById('saida-rapida')) {
      campo.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && campo.value !== '') {
          evento.preventDefault();
          limparBusca();
        }
      });
    }

    lista.addEventListener('click', function (evento) {
      const botao = evento.target.closest('.busca-bairro__botao');
      if (!botao) return;
      mostrarResultado(botao.parentElement);
    });
  }


  // ---------- Bairro dentro do guia de orientacao ----------
  // Pedido do Conselho Tutelar: na opcao "uma crianca esta em perigo agora",
  // a pessoa escolhe o bairro e recebe direto o plantao do conselho que atende
  // ali, sem ter que fechar o painel e ir procurar na busca da home.
  var campoBairroGuia = document.getElementById('orientacao-bairro');
  var saidaBairroGuia = document.getElementById('orientacao-bairro-saida');

  if (campoBairroGuia && saidaBairroGuia) {
    var PLANTOES = {"conselho_1": {"nome": "I Conselho Tutelar", "plantao": "(88) 98224-6158", "link": "5588982246158"}, "conselho_2": {"nome": "II Conselho Tutelar", "plantao": "(88) 98224-4970", "link": "5588982244970"}};

    campoBairroGuia.addEventListener('change', function () {
      var chave = campoBairroGuia.value;
      var nome = campoBairroGuia.options[campoBairroGuia.selectedIndex].text;

      if (!campoBairroGuia.selectedIndex) {
        saidaBairroGuia.hidden = true;
        saidaBairroGuia.textContent = '';
        return;
      }

      saidaBairroGuia.textContent = '';

      if (chave && PLANTOES[chave]) {
        var c = PLANTOES[chave];
        var texto = document.createElement('strong');
        texto.textContent = nome + ' é atendido pelo ' + c.nome + '.';
        var link = document.createElement('a');
        link.className = 'orientacao__bairro-link';
        link.href = 'https://wa.me/' + c.link + '?text=Ol%C3%A1%2C%20preciso%20de%20ajuda';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Falar agora com o plantão — ' + c.plantao;
        saidaBairroGuia.appendChild(texto);
        saidaBairroGuia.appendChild(link);
      } else {
        var aviso = document.createElement('strong');
        aviso.textContent = 'Esse bairro ainda não está dividido entre os dois conselhos.';
        var explica = document.createElement('span');
        explica.textContent = 'Ligue para qualquer um dos dois plantões acima: os dois atendem.';
        saidaBairroGuia.appendChild(aviso);
        saidaBairroGuia.appendChild(explica);
      }

      saidaBairroGuia.hidden = false;
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

  // ---------- Altura da faixa de prototipo ----------
  // A faixa e fixa no topo. O quanto o conteudo precisa descer depende da
  // altura real dela, que muda quando o texto quebra em duas linhas no celular.
  var faixaPrototipo = document.querySelector('.faixa-prototipo');

  if (faixaPrototipo) {
    var medirFaixa = function () {
      var altura = Math.ceil(faixaPrototipo.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--altura-prototipo', altura + 'px');
    };

    medirFaixa();
    window.addEventListener('resize', medirFaixa);
    // A fonte do Google chega depois da primeira pintura e pode mudar a quebra
    // de linha; remedimos quando ela terminar de carregar.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(medirFaixa);
    }
  }

  // ---------- Cabecalho que encolhe ao rolar ----------
  var cabecalho = document.querySelector('.cabecalho');

  if (cabecalho) {
    var ultimoEstado = false;

    function ajustarCabecalho() {
      var compacto = window.scrollY > 40;
      if (compacto !== ultimoEstado) {
        cabecalho.classList.toggle('cabecalho--compacto', compacto);
        ultimoEstado = compacto;
      }
    }

    ajustarCabecalho();
    window.addEventListener('scroll', ajustarCabecalho, { passive: true });
  }

  // ---------- Blocos que aparecem conforme a pessoa rola ----------
  // A classe que esconde so e colocada aqui, pelo JavaScript. Se o JavaScript
  // nao rodar, nada fica escondido. E se o navegador nao tiver
  // IntersectionObserver, mostramos tudo de uma vez em vez de deixar sumido.
  var alvos = document.querySelectorAll(
    '.bloco-emergencia, .grade-atalhos, .secao, .aviso, .destaque, ' +
    '.rodape__coluna, .rodape__mapa, .busca-bairro'
  );

  if (alvos.length) {
    var i;

    if (!('IntersectionObserver' in window)) {
      for (i = 0; i < alvos.length; i++) {
        alvos[i].classList.add('revela', 'revela--visivel');
      }
    } else {
      for (i = 0; i < alvos.length; i++) {
        alvos[i].classList.add('revela');
      }

      var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add('revela--visivel');
          if (entrada.target.classList.contains('grade-atalhos')) {
            entrada.target.classList.add('grade-atalhos--visivel');
          }
          observador.unobserve(entrada.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

      for (i = 0; i < alvos.length; i++) {
        observador.observe(alvos[i]);
      }

      // Rede de seguranca: se por qualquer motivo o observador nao disparar,
      // depois de dois segundos tudo aparece assim mesmo.
      window.setTimeout(function () {
        for (var j = 0; j < alvos.length; j++) {
          alvos[j].classList.add('revela--visivel');
          if (alvos[j].classList.contains('grade-atalhos')) {
            alvos[j].classList.add('grade-atalhos--visivel');
          }
        }
      }, 2000);
    }
  }

  // ---------- VLibras ----------
  window.addEventListener('load', function () {
    if (window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
  });
})();