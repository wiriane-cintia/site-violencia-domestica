// Este arquivo existe por um motivo so, e ele e pequeno de proposito.
//
// O menu vira gaveta lateral apenas quando a classe "com-js" esta no <html>.
// Se essa classe so aparecesse junto com o app.js, que carrega com "defer" (ou
// seja, depois que a pagina inteira foi lida), o navegador desenharia o menu
// como lista comum por uma fracao de segundo e so entao o esconderia. E o
// piscar que se via a cada troca de pagina.
//
// Por isso ele e carregado no <head>, sem "defer": roda antes de qualquer
// coisa aparecer na tela. Quem nao tem JavaScript nunca recebe a classe, e o
// menu continua sendo uma lista normal, acessivel.
document.documentElement.classList.add('com-js');

// As duas classes abaixo sao escritas no <html> pelo proprio HTML da pagina
// (atributo data-prototipo e data-saida-rapida no <html>), lidas aqui antes da
// primeira pintura para que a faixa de prototipo e a saida rapida ja nascam no
// lugar certo, sem salto.
var raiz = document.documentElement;
if (raiz.getAttribute('data-prototipo') === 'sim') raiz.classList.add('com-prototipo');
if (raiz.getAttribute('data-saida-rapida') === 'sim') raiz.classList.add('com-saida-rapida');