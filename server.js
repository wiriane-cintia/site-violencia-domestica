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
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://vlibras.gov.br"],
      frameSrc: ["'self'", "https://vlibras.gov.br"],
      imgSrc: ["'self'", "data:", "https://vlibras.gov.br"],
      connectSrc: ["'self'", "https://vlibras.gov.br"],
    },
  },
}));

const limitador = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // no máximo 100 requisições por IP nesse período
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições vindas desse endereço. Tente novamente em alguns minutos.',
});

app.use(limitador);

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'paginas'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'base'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const paginas = dados('paginas.json');
  const entrada = paginas.navegacao.find(p => p.rota === req.path);
  if (!entrada) return next();
  const pagina = paginas.conteudo[entrada.chave];
  res.render(entrada.view, { titulo: pagina.titulo, pagina });
});

app.use((req, res) => {
  res.status(404).send('Página não encontrada');
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});