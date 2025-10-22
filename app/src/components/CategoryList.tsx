/**
 * Lista horizontal de categorias (versão aprimorada).
 * - Espaçamento consistente e padding nas bordas.
 * - Acessibilidade (role, state, label) e área de toque maior (hitSlop).
 * - Props opcionais de seleção sem quebrar compatibilidade.
 * - Memoização de renderItem para melhor performance.
 */
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, Pressable, FlatList, type FlatList as RNFlatList, type ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { Category } from '../data/categories';
import { colors, spacing, typography, radius } from '../theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  categories: Category[];
  /** id selecionado (opcional). Apenas estiliza e auto-scroll se informado */
  selectedId?: string;
  /** callback ao tocar (opcional). Se ausente, navega para a tela da categoria */
  onSelect?: (category: Category) => void;
  /** id de testes (opcional) */
  testID?: string;
};

export const CategoryList = React.memo(function CategoryList({ categories, selectedId, onSelect, testID }: Props) {
  const navigation = useNavigation<Nav>();
  const listRef = useRef<RNFlatList<Category>>(null);

  const keyExtractor = useCallback((item: Category) => item.id, []);

  const handlePress = useCallback(
    (item: Category) => {
      if (onSelect) return onSelect(item);
      navigation.navigate('Category', { categoryId: item.id, title: item.name });
    },
    [navigation, onSelect]
  );

  const renderItem: ListRenderItem<Category> = useCallback(
    ({ item }) => {
      const isSelected = selectedId === item.id;
      return (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Categoria ${item.name}`}
          accessibilityState={{ selected: !!isSelected }}
          hitSlop={8}
          onPress={() => handlePress(item)}
          android_ripple={{ color: '#00000010', borderless: false }}
          style={({ pressed }) => ([
            {
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.lg,
              backgroundColor: isSelected ? colors.surface : colors.surfaceMuted,
              borderRadius: radius.pill,
              borderWidth: isSelected ? 1 : 0,
              borderColor: isSelected ? colors.primary : 'transparent',
              opacity: pressed ? 0.9 : 1,
            },
          ])}
        >
          <Text
            style={[
              typography.body,
              { fontWeight: '600', color: isSelected ? colors.primaryDark : colors.text },
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
  useEffect(() => {
    if (!selectedId) return;
    const index = categories.findIndex((c) => c.id === selectedId);
    if (index < 0) return;
    const ref = listRef.current as any;
    ref?.scrollToIndex?.({ index, animated: true, viewPosition: 0.5 });
  }, [selectedId, categories]);

  const Separator = useMemo(() => () => <View style={{ width: spacing.sm }} />, []);

  return (
    <FlatList
      ref={listRef}
      data={categories}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: spacing.sm }}
      ItemSeparatorComponent={Separator}
      onScrollToIndexFailed={(info) => {
        // Fallback simples quando o índice ainda não foi medido
        const approx = (info.averageItemLength || 100) * info.index;
        listRef.current?.scrollToOffset?.({ offset: approx, animated: true });
      }}
      renderItem={renderItem}
      testID={testID}
    />
  );
});
