const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://vlibras.gov.br", "https://cdn.jsdelivr.net", "data:"],
      scriptSrc: ["'self'", "https://vlibras.gov.br", "https://cdn.jsdelivr.net"],
      frameSrc: ["'self'", "https://vlibras.gov.br"],
      imgSrc: ["'self'", "data:", "https://vlibras.gov.br", "https://cdn.jsdelivr.net"],
      connectSrc: ["'self'", "https://vlibras.gov.br"],
    },
  },
}));

const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições vindas desse endereço. Tente novamente em alguns minutos.',
});

app.use(limitador);

// Enquanto for prototipo, pede a todos os buscadores que nao indexem nada.
// O robots.txt nao serve aqui: ele impede o robo de LER a pagina e, por isso,
// de enxergar o proprio pedido de nao indexar.
app.use((req, res, next) => {
  if (dados('site.json').prototipo) {
    res.set('X-Robots-Tag', 'noindex, nofollow');
  }
  next();
});

const DEV = process.env.NODE_ENV !== 'production';

function lerJSON(nomeArquivo) {
  const caminho = path.join(__dirname, 'data', nomeArquivo);
  const conteudo = fs.readFileSync(caminho, 'utf-8');
  return JSON.parse(conteudo);
}

let cache = {};
function dados(nomeArquivo) {
  if (DEV || !cache[nomeArquivo]) {
    cache[nomeArquivo] = lerJSON(nomeArquivo);
  }
  return cache[nomeArquivo];
}

// Arquivos que existem em um site e nao no outro (ex.: bairros.json, so no CT).
function dadosOpcionais(nomeArquivo) {
  const caminho = path.join(__dirname, 'data', nomeArquivo);
  if (!fs.existsSync(caminho)) return null;
  return dados(nomeArquivo);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'paginas'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'base'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const paginas = dados('paginas.json');
  const site = dados('site.json');
  const conselhos = dados('conselhos.json');
  const atalhos = dados('atalhos.json');
  const emergencia = dados('emergencia.json');
  const bairros = dadosOpcionais('bairros.json');
  const duvidas = dadosOpcionais('duvidas.json');
  const rede = dadosOpcionais('rede.json');
  const rodape = dados('rodape.json');
  const entrada = paginas.navegacao.find(p => p.rota === req.path);
  if (!entrada) return next();
  const pagina = paginas.conteudo[entrada.chave];
  res.render(entrada.view, {
    // O titulo da aba pode ser diferente do titulo na tela: no site VD ele e
    // neutro, para nao denunciar o assunto no historico do navegador.
    titulo: (pagina.titulo_aba || pagina.titulo) + (site.sufixo_aba ? ' — ' + site.sufixo_aba : ''),
    pagina,
    site,
    navegacao: paginas.navegacao,
    conteudo: paginas.conteudo,
    rotaAtual: req.path,
    conselhos,
    atalhos,
    emergencia,
    bairros,
    duvidas,
    rede,
    rodape,
  });
});

app.use((req, res) => {
  const paginas = dados('paginas.json');
  const site = dados('site.json');
  const conselhos = dados('conselhos.json');
  const atalhos = dados('atalhos.json');
  const emergencia = dados('emergencia.json');
  const bairros = dadosOpcionais('bairros.json');
  const duvidas = dadosOpcionais('duvidas.json');
  const rede = dadosOpcionais('rede.json');
  const rodape = dados('rodape.json');
  res.status(404).render('erro-404', {
    titulo: 'Página não encontrada' + (site.sufixo_aba ? ' — ' + site.sufixo_aba : ''),
    site,
    navegacao: paginas.navegacao,
    conteudo: paginas.conteudo,
    rotaAtual: null,
    conselhos,
    atalhos,
    emergencia,
    bairros,
    duvidas,
    rede,
    rodape,
  });
});

// Na Vercel o site roda como funcao: nao existe porta para escutar, o app e
// chamado a cada requisicao. Localmente, continua subindo o servidor normal.
if (process.env.VERCEL) {
  module.exports = app;
} else {
  const PORTA = process.env.PORT || 3000;
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
  module.exports = app;
}