# Desenvolvimento de uma Interface de Menu de Restaurante com React Native

[NOME DA INSTITUIÇÃO DE ENSINO]

[NOME DO CURSO]

Autores: Lenilson Soares; João Henrique; Paulo Henrique; Kayky Rebeiro; Douglas

Projeto apresentado à disciplina de [Nome da Disciplina], como requisito parcial para avaliação.

Professor: Fagner Rocha

Vitória da Conquista - BA

2025

---

## Sumário

- Resumo ............................................................................................................ p. 2
- 1. Introdução .................................................................................................. p. 3
  - 1.1. Contextualização ................................................................................. p. 3
  - 1.2. Justificativa ........................................................................................ p. 3
  - 1.3. Objetivos ............................................................................................ p. 4
- 2. Metodologia e Desenvolvimento ............................................................. p. 5
  - 2.1. Ferramentas e Tecnologias ............................................................. p. 5
  - 2.2. Arquitetura do Projeto ..................................................................... p. 6
  - 2.3. Desenvolvimento dos Componentes ................................................ p. 7
  - 2.4. Implementação das Telas e Navegação ........................................ p. 8
- 3. Resultados ................................................................................................ p. 9
  - 3.1. Tela de Listagem de Itens ................................................................ p. 9
  - 3.2. Tela de Detalhes do Item ................................................................. p. 10
- 4. Conclusão .................................................................................................... p. 11
  - 4.1. Desafios Enfrentados ....................................................................... p. 11
  - 4.2. Aprendizados Adquiridos .................................................................. p. 11
  - 4.3. Trabalhos Futuros e Melhorias ....................................................... p. 12
- 5. Referências ................................................................................................ p. 13

> Observação: após finalizar o texto, atualize a paginação automaticamente no editor escolhido (Word/Google Docs). Para Markdown, as páginas são referenciais.

---

## Resumo

Este relatório descreve o desenvolvimento de uma interface de menu de restaurante utilizando React Native e Expo. O objetivo foi reproduzir, com alta fidelidade, uma tela de listagem de itens e uma tela de detalhes baseada em uma imagem de referência, focando em componentização, boas práticas de estilização e renderização eficiente de listas. A metodologia envolveu: (i) análise do layout de referência; (ii) definição dos componentes (Card de produto, Botão primário, Badge de carrinho, Lista de Categorias); (iii) estruturação de navegação com React Navigation; (iv) implementação visual com um tema consistente; e (v) persistência simples do carrinho. Como resultado, o aplicativo apresenta uma tela inicial com banner, categorias e seção de destaques, uma tela de categoria listando produtos e tela de detalhes com seleção de quantidade e adição ao carrinho. O trabalho reforçou conhecimentos de UI/UX em mobile, organização de projeto e uso do ecossistema Expo.

Palavras‑chave: React Native; Expo; UI/UX; Componentização; Desenvolvimento Mobile.

---

## 1. Introdução

Interfaces bem projetadas são determinantes na experiência do usuário, especialmente em aplicativos do setor alimentício, onde a apresentação visual influencia a decisão de compra. Este projeto propõe a construção de uma interface funcional de menu de restaurante, com base em uma referência visual, consolidando práticas de análise de layout e componentização no contexto mobile.

### 1.1. Contextualização

Com o crescimento do delivery e dos pedidos por aplicativos, restaurantes dependem de interfaces claras e atraentes. Replicar interfaces existentes é uma estratégia comum no ensino de front‑end, pois permite focar em hierarquia visual, tipografia, espaçamento e interações.

### 1.2. Justificativa

A reprodução de UIs reais dá ao estudante contato com problemas práticos: consistência de design, responsividade, performance de listas e manutenção de estado. React Native, aliado ao Expo, oferece produtividade e suporte multiplataforma, sendo uma escolha alinhada ao mercado.

### 1.3. Objetivos

Objetivo geral: desenvolver uma aplicação mobile em React Native que replique a UI de um menu de restaurante a partir de um design de referência.

Objetivos específicos:

- Configurar um ambiente de desenvolvimento com Expo.
- Analisar a interface e decompô‑la em componentes reutilizáveis.
- Construir a tela de listagem usando dados estáticos.
- Implementar a tela de detalhes do item com seleção de quantidade.
- Estabelecer navegação entre telas.
- Aplicar estilização para alta fidelidade visual.
- Documentar o processo em formato de relatório.

---

## 2. Metodologia e Desenvolvimento

A execução foi dividida nas etapas: análise do mock, definição de componentes, construção de tema, implementação das telas e integração do estado do carrinho com persistência.

### 2.1. Ferramentas e Tecnologias

- React Native 0.81.4 — framework mobile principal.
- Expo 54 — ferramenta para empacotamento/execução e APIs nativas.
- React Navigation 6 — navegação stack.
- TypeScript 5.9 — tipagem estática.
- AsyncStorage — persistência simples do carrinho.
- VS Code — IDE e depuração.

### 2.2. Arquitetura do Projeto

Estrutura modular sob `app/src`:

- `components/` — Button, DishCard, CategoryList, CartBadge, etc.
- `screens/` — Home, Category, ProductDetail, Cart, Checkout, Confirmation.
- `data/` — dados estáticos (produtos e categorias).
- `state/` — contexto do carrinho, totais e persistência.
- `theme/` — paleta de cores, tipografia, espaçamentos e tokens.

```markdown
# Desenvolvimento de uma Interface de Menu de Restaurante com React Native

UNEX – Centro Universitário de Excelência
Curso de Sistemas de Informação


Desenvolvimento de uma Interface de Menu de Restaurante com React Native


Autores: Lenilson Soares; João Henrique; Paulo Henrique; Kayky Rebeiro; Douglas
Projeto apresentado à disciplina de Desenvolvimento Mobile Híbrido, como requisito parcial para avaliação.
Professor: Fagner Rocha


Vitória da Conquista - BA
2025

Sumário
Resumo .......................................................................................... 2
1. Introdução .................................................................................. 3
  1.1. Contextualização ................................................................. 3
  1.2. Justificativa ........................................................................ 3
  1.3. Objetivos .......................................................................... 4
2. Metodologia e Desenvolvimento ............................................. 5
  2.1. Ferramentas e Tecnologias ............................................... 5
  2.2. Arquitetura do Projeto ...................................................... 6
  2.3. Desenvolvimento dos Componentes ................................. 7
  2.4. Implementação das Telas e Navegação ......................... 8
3. Resultados .................................................................................. 9
  3.1. Tela de Listagem de Itens ................................................ 9
  3.2. Tela de Detalhes do Item ................................................ 10
4. Conclusão .................................................................................. 11
  4.1. Desafios Enfrentados ..................................................... 11
  4.2. Aprendizados Adquiridos ................................................ 11
  4.3. Trabalhos Futuros e Melhorias ...................................... 12
5. Referências ................................................................................ 13
 

‘Resumo
Este relatório descreve o desenvolvimento de uma interface de menu de restaurante utilizando React Native e Expo. O objetivo foi reproduzir, com alta fidelidade, uma tela de listagem de itens e uma tela de detalhes baseada em uma imagem de referência, focando em componentização, boas práticas de estilização e renderização eficiente de listas. A metodologia envolveu: (i) análise do layout de referência; (ii) definição dos componentes; (iii) estruturação de navegação; (iv) implementação visual; e (v) persistência simples do carrinho. Como resultado, o aplicativo apresenta uma tela inicial com banner, categorias e seção de destaques, uma tela de categoria listando produtos e tela de detalhes com seleção de quantidade e adição ao carrinho. O trabalho reforçou conhecimentos de UI/UX em mobile, organização de projeto e uso do ecossistema Expo.

Palavras‑chave: React Native; Expo; UI/UX; Componentização; Desenvolvimento Mobile.
1. Introdução
Interfaces bem projetadas são determinantes na experiência do usuário, especialmente em aplicativos do setor alimentício, onde a apresentação visual influencia a decisão de compra. Este projeto propõe a construção de uma interface funcional de menu de restaurante, com base em uma referência visual, consolidando práticas de análise de layout e componentização no contexto mobile.
1.1. Contextualização
Com o crescimento do delivery e dos pedidos por aplicativos, restaurantes dependem de interfaces claras e atraentes. Replicar interfaces existentes é uma estratégia comum no ensino de front‑end, pois permite focar em hierarquia visual, tipografia, espaçamento e interações.
1.2. Justificativa
A reprodução de UIs reais dá ao estudante contato com problemas práticos: consistência de design, responsividade, performance de listas e manutenção de estado. React Native, aliado ao Expo, oferece produtividade e suporte multiplataforma, sendo uma escolha alinhada ao mercado.


1.3. Objetivos
Objetivo geral: desenvolver uma aplicação mobile em React Native que replique a UI de um menu de restaurante a partir de um design de referência.

Objetivos específicos:
- Configurar ambiente Expo.
- Analisar interface e decompô‑la em componentes reutilizáveis.
- Construir tela de listagem.
- Implementar tela de detalhes.
- Estabelecer navegação.
- Aplicar estilização fiel.
- Documentar o processo.
2. Metodologia e Desenvolvimento
A execução foi dividida em: análise do mock, definição de componentes, construção de tema, implementação das telas e integração do estado do carrinho.
2.1. Ferramentas e Tecnologias
- React Native 0.81.4
- Expo 54
- React Navigation 6
- TypeScript 5.9
- AsyncStorage
- VS Code
2.2. Arquitetura do Projeto
Estrutura modular sob `app/src`:
- components/
- screens/
- data/
- state/
- theme/
- navigation/
2.3. Desenvolvimento dos Componentes
- DishCard: imagem, título, preço e botão “+”.
- Button: primário com cor do tema.
- CategoryList: chips horizontais.
- CartBadge: ícone com contagem.
2.4. Implementação das Telas e Navegação
- Home: banner e destaques.
- Category: lista filtrada por categoria.
- ProductDetail: imagem, descrição e botão adicionar.
- Navegação: stack com header e badge.
3. Resultados
O aplicativo reproduz fielmente o layout proposto, com desempenho fluido e componentes reutilizáveis.
3.1. Tela de Listagem de Itens
Apresenta lista performática com interação para detalhes ou adição ao carrinho.
3.2. Tela de Detalhes do Item
Mostra imagem, preço e seletor de quantidade com feedback ao adicionar ao carrinho.
4. Conclusão
O projeto consolidou conhecimentos sobre UI/UX, componentização e integração de navegação no ecossistema React Native.
4.1. Desafios Enfrentados
- Ajuste fino do layout e sombras.
- Tratamento de imagens locais e placeholders.
4.2. Aprendizados Adquiridos
- Componentização e tema consistente.
- Uso de contexto e navegação.
- Otimização de listas.
4.3. Trabalhos Futuros e Melhorias
- Substituir banner por logotipo.
- Implementar busca e filtros.
- Melhorar estados de carregamento.
- Integrar backend.
5. Referências
REACT NATIVE. Documentação oficial. Disponível em: https://reactnative.dev. Acesso em: 18 out. 2025.
EXPO. Documentação oficial. Disponível em: https://docs.expo.dev. Acesso em: 18 out. 2025.
REACT NAVIGATION. Documentação oficial. Disponível em: https://reactnavigation.org. Acesso em: 18 out. 2025.
GOOGLE; APPLE. Diretrizes de Design. Disponível em: https://material.io/design e https://developer.apple.com/design. Acesso em: 18 out. 2025.

```
