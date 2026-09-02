const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fs = require('fs');

const app = express();
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