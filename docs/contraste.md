# Verificação de contraste

Calculado pela fórmula oficial do WCAG (relative luminance). Mínimo exigido: 4.5:1.

| Par | Contraste | Resultado |
|---|---|---|
| Texto principal sobre fundo | 16.41:1 | Passa |
| Texto secundário sobre fundo | 7.39:1 | Passa |
| Texto principal sobre superfície | 14.68:1 | Passa |
| Texto secundário sobre superfície | 6.61:1 | Passa |
| Branco sobre identidade (azul-marinho) | 14.44:1 | Passa |
| Branco sobre alerta (terracota) | 5.44:1 | Passa |
| Texto principal sobre ação (dourado) | 7.43:1 | Passa |
| Branco sobre ação (dourado) | 2.21:1 | **Falha** |
| Identidade sobre fundo (links) | 14.44:1 | Passa |

## Regra derivada

Botões e blocos que usam `--cor-acao` (dourado) como fundo devem ter texto na
cor `--cor-texto` (escuro), nunca branco. É o único par que não passa no
mínimo de contraste.