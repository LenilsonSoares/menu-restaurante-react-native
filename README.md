# Menu Restaurante (React Native / Expo)

Este repositório contém um app de cardápio com carrinho e checkout, criado em React Native (Expo), com navegação e estado global simples.

## Estrutura

- `app/` — projeto Expo com o código-fonte (pasta `src/`).
- `docs/` — documentação (arquitetura, requisitos).
- `arquivos do projeto/` — imagens/slides do professor.

## Rodando o projeto (Windows PowerShell)

Você pode rodar os comandos a partir da RAIZ do repositório (recomendado) ou entrando na pasta `app/`.

1. Instalar dependências (primeira vez):

```powershell
npm run install:app
```

1. Checar tipos (opcional):

```powershell
npm run tsc
```

1. Iniciar o Expo (Web):

```powershell
npm run web
```

1. Iniciar em dispositivo/emulador:

```powershell
npm start
```

No terminal do Expo, escolha `a` (Android) ou `i` (iOS, se estiver em macOS) para rodar no emulador/dispositivo.

## Principais decisões

- Expo + React Navigation (stack) para navegação.
- Context API para estado do carrinho (simples e didático).
- Dados mock em `src/data`.
- Componentização: `DishCard`, `CategoryList`, `QuantityStepper`, `CartBadge`, `Button`, `Price`.

## Próximos passos

- Ajustar UI/tema.
- Opcional: persistir carrinho com AsyncStorage.
- Adicionar testes básicos (se requerido).
