import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import colors from '../../constants/colors';
import resources from '../../data/resourcesData';

const categories = ['All', 'Meditation', 'Sleep', 'Stress', 'Mindfulness'];



export default function ResourcesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredResources = resources.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Resources"
            subtitle="Explore wellness content and helpful daily tools."
          />

          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search resources"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {categories.map(item => {
              const isSelected = selectedCategory === item;

              return (
                <TouchableOpacity
                  key={item}
                  activeOpacity={0.85}
                  style={[
                    styles.categoryChip,
                    isSelected && styles.selectedCategoryChip,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && styles.selectedCategoryText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.listWrapper}>
            {filteredResources.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.resourceCard}
              >
                <View style={styles.resourceBadge}>
                  <Text style={styles.resourceBadgeText}>{item.category}</Text>
                </View>

                <Text style={styles.resourceTitle}>{item.title}</Text>
                <Text style={styles.resourceSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}

            {filteredResources.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No resources found</Text>
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#07132A',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  searchBox: {
    height: 54,
    borderRadius: 18,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  searchInput: {
    color: colors.white,
    fontSize: 15,
    padding: 0,
  },
  categoryRow: {
    paddingBottom: 8,
  },
  categoryChip: {
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 21,
    backgroundColor: '#1B2147',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  selectedCategoryChip: {
    backgroundColor: '#FFC83D',
    borderColor: '#FFC83D',
  },
  categoryText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: colors.black,
  },
  listWrapper: {
    marginTop: 18,
  },
  resourceCard: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 14,
  },
  resourceBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,200,61,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  resourceBadgeText: {
    color: '#FFC83D',
    fontSize: 12,
    fontWeight: '700',
  },
  resourceTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  resourceSubtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    lineHeight: 22,
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
  },
});