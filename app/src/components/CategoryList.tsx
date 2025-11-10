/**
 * Lista horizontal de categorias (versão aprimorada).
 * - Espaçamento consistente e padding nas bordas.
 * - Acessibilidade (role, state, label) e área de toque maior (hitSlop).
 * - Props opcionais de seleção sem quebrar compatibilidade.
 * - Memoização de renderItem para melhor performance.
 */
import React, { useCallback, useEffect, useMemo, useRef } from 'react'; // React e hooks para memoização/efeitos/ref
import { View, Text, Pressable, FlatList, type FlatList as RNFlatList, type ListRenderItem } from 'react-native'; // Componentes e tipos RN
import { useNavigation } from '@react-navigation/native'; // Hook de navegação
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Tipagem do stack navigator
import type { RootStackParamList } from '../navigation/RootNavigator'; // Tipos das rotas do app
import { Category } from '../data/categories'; // Tipo e dados de categorias
import { colors, spacing, typography, radius } from '../theme'; // Tokens de design

type Nav = NativeStackNavigationProp<RootStackParamList>; // Alias para tipar o useNavigation

type Props = {
  categories: Category[]; // Lista de categorias a exibir
  /** id selecionado (opcional). Apenas estiliza e auto-scroll se informado */
  selectedId?: string; // Id atualmente selecionado (se houver)
  /** callback ao tocar (opcional). Se ausente, navega para a tela da categoria */
  onSelect?: (category: Category) => void; // Callback externo ao selecionar
  /** id de testes (opcional) */
  testID?: string; // Test identifier
};

export const CategoryList = React.memo(function CategoryList({ categories, selectedId, onSelect, testID }: Props) { // Memo para evitar re-renderizações desnecessárias
  const navigation = useNavigation<Nav>(); // Objeto de navegação
  const listRef = useRef<RNFlatList<Category>>(null); // Referência à FlatList para scroll programático

  const keyExtractor = useCallback((item: Category) => item.id, []); // Extrai chave estável pelo id

  const handlePress = useCallback( // Ação ao tocar no chip
    (item: Category) => {
      if (onSelect) return onSelect(item); // Delega se callback externo foi fornecido
      navigation.navigate('Category', { categoryId: item.id, title: item.name }); // Caso contrário, navega para a tela de categoria
    },
    [navigation, onSelect]
  );

  const renderItem: ListRenderItem<Category> = useCallback( // Render de cada chip de categoria
    ({ item }) => {
      const isSelected = selectedId === item.id; // Selecionado?
      return (
        <Pressable
          accessibilityRole="button" // Acessibilidade como botão
          accessibilityLabel={`Categoria ${item.name}`} // Leitura de tela amigável
          accessibilityState={{ selected: !!isSelected }} // Indica estado selecionado
          hitSlop={8} // Área de toque aumentada
          onPress={() => handlePress(item)} // Ação ao tocar
          android_ripple={{ color: '#00000010', borderless: false }} // Efeito ripple no Android
          style={({ pressed }) => ([
            {
              paddingVertical: spacing.sm, // Altura do chip
              paddingHorizontal: spacing.lg, // Largura do chip
              backgroundColor: isSelected ? colors.surface : colors.surfaceMuted, // Fundo varia com seleção
              borderRadius: radius.pill, // Formato pílula
              borderWidth: isSelected ? 1 : 0, // Borda apenas quando selecionado
              borderColor: isSelected ? colors.primary : 'transparent', // Cor da borda
              opacity: pressed ? 0.9 : 1, // Feedback visual
            },
          ])}
        >
          <Text
            style={[
              typography.body, // Base tipográfica
              { fontWeight: '600', color: isSelected ? colors.primaryDark : colors.text }, // Destaque quando selecionado
            ]}
          >
            {item.name}
          </Text>
        </Pressable>
      );
    },
    [handlePress, selectedId]
  );

  // Auto-scroll para o item selecionado (quando existir)
  useEffect(() => { // Desloca a lista para manter o item selecionado visível
    if (!selectedId) return; // Sem seleção: nada a fazer
    const index = categories.findIndex((c) => c.id === selectedId); // Busca índice
    if (index < 0) return; // Não encontrado
    const ref = listRef.current as any; // Acessa instância da FlatList
    ref?.scrollToIndex?.({ index, animated: true, viewPosition: 0.5 }); // Centraliza aproximadamente
  }, [selectedId, categories]);

  const Separator = useMemo(() => () => <View style={{ width: spacing.sm }} />, []); // Separador horizontal entre chips

  return (
    <FlatList
      ref={listRef} // Ref para operações de scroll
      data={categories} // Fonte de dados
      keyExtractor={keyExtractor} // Gera chave por item
      horizontal // Lista horizontal
      showsHorizontalScrollIndicator={false} // Oculta barra de rolagem
      contentContainerStyle={{ paddingHorizontal: spacing.sm }} // Padding nas bordas
      ItemSeparatorComponent={Separator} // Espaço entre itens
      onScrollToIndexFailed={(info) => { // Fallback quando índice ainda não medido
        // Fallback simples quando o índice ainda não foi medido
        const approx = (info.averageItemLength || 100) * info.index; // Offset aproximado
        listRef.current?.scrollToOffset?.({ offset: approx, animated: true }); // Tenta rolar pelo offset
      }}
      renderItem={renderItem} // Render do item
      testID={testID} // Id de teste opcional
    />
  );
});
