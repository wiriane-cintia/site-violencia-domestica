# Segurança

O que foi feito, por que, e — igualmente importante — o que **não** está
protegido. Proteção mal compreendida é pior do que proteção ausente, porque gera
confiança indevida.

---

## O ponto de partida: a superfície de ataque é pequena por construção

Antes de listar proteção, vale entender o que **não existe** nestes sites:

- não há login, nem sessão, nem senha
- não há banco de dados
- não há formulário nem campo que envie dado ao servidor
- não há upload de arquivo
- não há dado de visitante armazenado em lugar nenhum

Isso não é sorte: é consequência das decisões 0003, 0007, 0008 e 0009. E elimina
de saída a maior parte dos ataques clássicos a aplicação web — injeção em banco,
roubo de sessão, escalada de privilégio, vazamento de base. **Não há o que
injetar, não há sessão para roubar e não há dado para vazar.**

O que sobra é o que está tratado abaixo.

---

## O risco mais provável não é técnico

O jeito realista de estes sites serem comprometidos não é falha no servidor. É
**alguém entrar na conta** do repositório ou da hospedagem e trocar o conteúdo.
Site de Conselho Tutelar desfigurado é dano público imediato.

A defesa disso não é código:

- verificação em duas etapas ativa nas contas do repositório e da hospedagem
- códigos de recuperação guardados fora do computador
- branch principal protegida contra escrita direta
- nenhuma chave, token ou credencial versionada, inclusive no histórico

Estas medidas têm a mesma prioridade das de código, e por isso entraram no quadro
de trabalho com prioridade máxima.

---

## Cabeçalhos de segurança

Aplicados a todas as respostas pelo servidor:

| Proteção | Contra o quê |
|---|---|
| Política de conteúdo | carregamento de recurso de origem não prevista e injeção de conteúdo |
| Bloqueio de detecção de tipo | navegador interpretar arquivo como algo que ele não é |
| Bloqueio de enquadramento | a página ser embutida em site de terceiro para enganar visitante |
| Política de referência | vazar o endereço da página visitada ao navegar para fora |
| Política de permissões | acesso a câmera, microfone e localização, que o site não usa |
| Transporte seguro | acesso por conexão não cifrada |

### Política de conteúdo

O site só precisa de três origens: ele mesmo, o serviço de fontes tipográficas e
o tradutor de Libras. **Todo o resto é bloqueado.**

Manter a política restritiva exigiu não usar script embutido solto na página.
Quando uma origem legítima nova for necessária, ela precisa ser declarada
explicitamente — e o motivo, registrado.

O tradutor de Libras é script de terceiro e foi uma exceção consciente: ele
atende um requisito de acessibilidade que nenhuma alternativa local cumpre.

---

## Limite de requisições — e sua limitação

**O que foi feito:** limite por origem configurado no servidor, complementado
pela proteção de tráfego da própria hospedagem, que age antes de a requisição
chegar à aplicação.

**A limitação, escrita com todas as letras:** a hospedagem não mantém servidor
fixo. Cada requisição pode ser atendida por uma instância diferente, criada e
descartada. Um contador guardado na memória de uma instância **não é
compartilhado** com as outras. Na prática, o limite efetivo é maior do que o
configurado.

**Por que foi mantido assim:** resolver de fato exigiria um serviço externo de
contagem compartilhada — mais um serviço para manter e pagar, desproporcional
para um site sem operação sensível e sem dado a proteger. A proteção da
plataforma cobre o caso que importa, que é abuso de volume.

**O que isso significa na prática:** o limite barra abuso trivial. Não trate como
proteção exata. Quem for manter o site precisa saber disso — é o motivo deste
parágrafo existir.

---

## Escape de template

É a única porta de injeção que resta num site sem formulário, e é fácil de abrir
sem perceber.

O motor de template tem duas formas de saída: uma que escapa o conteúdo e outra
que não escapa. **A que não escapa só pode ser usada para conteúdo escrito por
nós**, nunca para algo que venha de fora ou de entrada do usuário.

Ela é usada, de propósito, nos textos de conteúdo que contêm marcação — e esses
textos vêm de arquivos versionados, revisados e sob controle. Qualquer uso novo
precisa passar por essa mesma verificação.

---

## Dependências

- apenas as dependências necessárias, cada uma com motivo registrado
- versões travadas no arquivo de bloqueio, versionado
- auditoria de vulnerabilidades rodada antes de cada publicação
- resultado da auditoria guardado como evidência

Menos dependência é menos superfície e menos trabalho de atualização. Este
projeto tem três.

---

## Privacidade

Tratada como requisito de segurança, não de conformidade — especialmente no site
de violência doméstica, onde **um rastro no aparelho pode expor fisicamente a
pessoa**.

- nenhum dado de visitante coletado, registrado ou armazenado
- nenhuma ferramenta de análise de audiência
- nenhum cookie de rastreamento
- nada gravado no armazenamento local do navegador
- busca por bairro e orientação guiada executam no navegador, sem enviar nada
- redes sociais são linkadas, nunca incorporadas — o recurso de incorporação
  carrega script que rastreia o visitante

Verificado por inspeção de requisições de rede e de armazenamento, com evidência
guardada.

---

## O que este projeto **não** protege

Dito explicitamente, para ninguém supor proteção inexistente:

- **Não há proteção contra ataque de negação de serviço em larga escala** além do
  que a hospedagem oferece.
- **O limite de requisições não é exato**, pelo motivo descrito acima.
- **Não há monitoramento nem alerta.** Se o site sair do ar, ninguém é avisado
  automaticamente.
- **Não há registro de acesso para auditoria** — consequência direta e desejada
  da decisão de não coletar dado.
- **Não há cópia de segurança de conteúdo além do próprio repositório** — que,
  por sinal, é uma cópia versionada e distribuída, e para este projeto basta.

---

## O risco que causa mais dano

Nenhum dos itens acima.

**É telefone de plantão errado.** Informação desatualizada num site de Conselho
Tutelar ou de violência doméstica faz mais estrago do que qualquer invasão: a
pessoa liga na emergência e não é atendida.

Por isso a conferência de conteúdo com a instituição tem, no quadro de trabalho,
a mesma prioridade das tarefas de segurança — e por isso a faixa de protótipo e o
bloqueio de indexação só saem depois dela.
