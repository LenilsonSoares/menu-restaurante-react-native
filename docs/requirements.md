# Requisitos do app "Menu Restaurante" (rascunho)

Este documento compila os requisitos com base em suposições comuns para apps de cardápio/carrinho em React Native. Use a coluna "Slide(s)" para vincular cada requisito aos slides do professor (veja `arquivos do projeto/slides-order.md` e `slides-preview.md`). Ajuste/edite à vontade; depois eu atualizo a implementação conforme as confirmações.

## Escopo e objetivos

- Mostrar cardápio com categorias e pratos
- Permitir adicionar/remover itens ao carrinho, controlar quantidades e ver subtotal/total
- Tela de detalhes do prato com foto, descrição, preço e variações/opcionais (se houver)
- Checkout: identificar cliente (nome/mesa/endereço), selecionar forma de entrega (local/retirada/delivery?) e pagamento
- Confirmar pedido e exibir status/resumo

Observações do professor: [preencher com base nos slides]  
Slide(s): [nºs]

## Personas (se aplicável)

- Cliente: navega no cardápio, monta carrinho, finaliza pedido
- Atendente/Garçom (opcional): registra pedido do cliente localmente
- Admin (opcional): gerencia itens, categorias, preços

Observações do professor: [preencher]  
Slide(s): [nºs]

## Navegação e telas

- [ ] Splash/Boas-vindas (opcional) — Slide(s): [nºs]
- [ ] Home / Categorias — Slide(s): [nºs]
- [ ] Lista de pratos (por categoria) — Slide(s): [nºs]
- [ ] Detalhe do prato — Slide(s): [nºs]
- [ ] Carrinho — Slide(s): [nºs]
- [ ] Checkout (dados, entrega/pagamento) — Slide(s): [nºs]
- [ ] Confirmação de pedido — Slide(s): [nºs]
- [ ] Pedidos (histórico/status) (opcional) — Slide(s): [nºs]
- [ ] Admin (CRUD) (opcional) — Slide(s): [nºs]

Notas de UI/UX (cores, tipografia, espaçamentos): [preencher]  
Componentes obrigatórios vistos nos slides: [preencher]

## Funcionalidades (checklist)

- [ ] Ver categorias e filtrar pratos por categoria — Slide(s): [nºs]
- [ ] Buscar prato por nome (opcional) — Slide(s): [nºs]
- [ ] Visualizar prato (foto, descrição, preço, tags) — Slide(s): [nºs]
- [ ] Adicionar ao carrinho (com quantidade) — Slide(s): [nºs]
- [ ] Remover do carrinho/alterar quantidade — Slide(s): [nºs]
- [ ] Calcular subtotal, taxas e total — Slide(s): [nºs]
- [ ] Checkout com dados do cliente — Slide(s): [nºs]
- [ ] Selecionar entrega (local/retirada/delivery?) — Slide(s): [nºs]
- [ ] Selecionar forma de pagamento (dinheiro/cartão/pix?) — Slide(s): [nºs]
- [ ] Confirmar pedido e exibir resumo — Slide(s): [nºs]
- [ ] Persistência simples do carrinho (opcional) — Slide(s): [nºs]
- [ ] Histórico/status do pedido (opcional) — Slide(s): [nºs]

Regras específicas do professor: [preencher]  
Ex.: obrigatoriedade de determinados campos, máscaras de input, validações, limites de quantidade, etc.

## Dados (modelo)

- Categoria: { id, nome, ícone (opcional) }
- Prato: { id, nome, descrição, preço, imagem, categoriaId, tags? }
- CarrinhoItem: { pratoId, qtd, observações? }
- Pedido: { id, itens, subtotal, taxa (opcional), total, cliente, entrega, pagamento, status }
- Cliente: { nome, mesa? telefone? endereço? }

Observações e campos exigidos pelo professor: [preencher]  
Slide(s): [nºs]

## Não funcionais

- RN/Expo, responsivo (Android/iOS), acessível (toques, tamanho de fonte)
- Estado global simples (Context/Zustand) e persistência básica (AsyncStorage) se pedida
- Navegação com React Navigation (stack + bottom tabs/opcional)
- Código em TypeScript (se permitido), ESLint/Prettier (opcional)

Restrições do professor (libs permitidas/vedadas): [preencher]  
Slide(s): [nºs]

## Critérios de aceite (exemplos)

- Usuário consegue adicionar itens ao carrinho, alterar quantidades e ver o total corretos
- Checkout bloqueia quando campos obrigatórios não estão preenchidos
- Ao confirmar, usuário visualiza um resumo do pedido e um ID/identificador

Critérios específicos do professor: [preencher]  
Slide(s): [nºs]

---

Próximos passos:

1) Preencher os campos "Slide(s)" e notas com base nos slides do professor.  
2) Me avisar o que é obrigatório e o que é opcional.  
3) Eu transformo este rascunho no backlog de tarefas e começo a implementar a arquitetura e as telas.
