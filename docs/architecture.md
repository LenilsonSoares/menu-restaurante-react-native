# Arquitetura proposta

Este documento descreve a arquitetura sugerida para o app de menu de restaurante em React Native, alinhada a requisitos comuns em trabalhos acadêmicos (sem backend obrigatório, dados mock, foco em navegação, estado e UI).

## Stack

- React Native (via Expo, recomendado para agilidade e testes)
- React Navigation v6 (Stack + Tabs ou apenas Stack)
- Estado global: Context API (mínimo) ou Zustand (opcional e simples)
- Persistência opcional: AsyncStorage (para manter carrinho entre sessões)
- TypeScript (opcional, se permitido pelo professor)
- ESLint/Prettier (opcional)

Observação: se o professor restringir bibliotecas, podemos ficar no mínimo necessário (React Navigation + Context).

## Estrutura de pastas sugerida

```text
src/
  navigation/
    RootNavigator.tsx
    types.ts
  screens/
    HomeScreen.tsx            # categorias + destaques
    CategoryScreen.tsx        # lista de pratos por categoria
    ProductDetailScreen.tsx   # detalhes do prato
    CartScreen.tsx            # carrinho
    CheckoutScreen.tsx        # dados cliente, entrega, pagamento
    OrderConfirmationScreen.tsx
  components/
    DishCard.tsx
    CategoryList.tsx
    QuantityStepper.tsx
    CartBadge.tsx
    Button.tsx
    Price.tsx
  state/
    cart.context.tsx          # Context API para carrinho (ou store Zustand)
  data/
    categories.ts
    products.ts
  theme/
    colors.ts
    spacing.ts
    typography.ts
  utils/
    formatCurrency.ts
  assets/ (imagens se necessário)
```

## Fluxo de navegação (exemplo)

- HomeScreen → CategoryScreen → ProductDetailScreen → CartScreen → CheckoutScreen → OrderConfirmationScreen
- CartBadge visível no header mostrando quantidade de itens

## Modelos de dados (mock)

- Categoria: { id: string; nome: string; icon?: string }
- Prato: { id: string; nome: string; descricao: string; preco: number; imagem?: string; categoriaId: string; tags?: string[] }
- CarrinhoItem: { pratoId: string; quantidade: number; observacoes?: string }
- Pedido: { id: string; itens: CarrinhoItem[]; subtotal: number; taxa?: number; total: number; cliente: Cliente; entrega: Entrega; pagamento: Pagamento; status: 'pendente'|'confirmado' }
- Cliente: { nome: string; mesa?: string; telefone?: string; endereco?: string }
- Entrega: { tipo: 'local'|'retirada'|'delivery' }
- Pagamento: { metodo: 'dinheiro'|'cartao'|'pix' }

## Componentes principais

- DishCard: card de prato (imagem, nome, preço, botão de adicionar)
- CategoryList: rolagem horizontal de categorias
- QuantityStepper: +/− para quantidades
- CartBadge: badge no header/tab com total de itens
- Price: formatação de moeda
- Button: botão padrão do app

## Estado do carrinho (regras)

- Adicionar item (se já existe, incrementa quantidade)
- Remover item (decrementa; se 0, retira do carrinho)
- Total = soma(preço × qtd) + taxa (se houver)
- Limpar carrinho após confirmação de pedido
- Persistir no AsyncStorage (opcional)

## Critérios de aceite (MVP)

- Usuário consegue ver categorias e pratos
- Consegue adicionar/remover e alterar quantidades no carrinho
- Total/subtotal corretos
- Checkout valida campos obrigatórios
- Confirmação de pedido exibe resumo

## Acessibilidade e UX

- Toque-alvo mínimo 44×44
- Contraste adequado de cores
- Suporte para textos maiores (Dynamic Type)
- Feedback visual em botões e estados de carregamento

## Próximos passos

1) Confirmar com os slides o que é obrigatório vs. opcional (ex.: entrega, pagamento, histórico).  
2) Inicializar o projeto (Expo) e configurar navegação/estado.  
3) Implementar telas e componentes conforme estrutura acima.  
4) Ajustar tema/cores/tipografia conforme o layout do professor.
