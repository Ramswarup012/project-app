import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEADERBOARD_DATA = {
  fulltime: [
    { id: 1, name: 'emp_tufan', winnings: 115905 },
    { id: 2, name: 'vincenzo787', winnings: 56620 },
    { id: 3, name: 'ariyan_gamer', winnings: 54273 },
    { id: 4, name: 'ritiklive', winnings: 53113 },
    { id: 5, name: 'aawra', winnings: 50360 },
    { id: 6, name: 'angry', winnings: 46788 },
    { id: 7, name: 'speed_yt', winnings: 42247 },
    { id: 8, name: 'sins_ff_live', winnings: 40845 },
    { id: 9, name: 'heisenberg', winnings: 38869 },
    { id: 10, name: 'sahusuraj', winnings: 37084 },
  ],
  monthly: [
    { id: 1, name: 'emp_tufan', winnings: 25000 },
    { id: 2, name: 'vincenzo787', winnings: 18000 },
    { id: 3, name: 'ariyan_gamer', winnings: 15000 },
    { id: 4, name: 'ritiklive', winnings: 14000 },
    { id: 5, name: 'aawra', winnings: 12000 },
  ],
  weekly: [
    { id: 1, name: 'emp_tufan', winnings: 8000 },
    { id: 2, name: 'vincenzo787', winnings: 5500 },
    { id: 3, name: 'ariyan_gamer', winnings: 4800 },
    { id: 4, name: 'ritiklive', winnings: 4200 },
    { id: 5, name: 'aawra', winnings: 3800 },
  ],
};

const LeaderboardScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('fulltime');

  const getLeaderboard = () => {
    return LEADERBOARD_DATA[activeTab as keyof typeof LEADERBOARD_DATA] || [];
  };

  const renderRankItem = ({ item, index }: { item: any; index: number }) => (
    <View style={styles.rankRow}>
      <Text style={styles.position}>{index + 1}</Text>
      <Text style={styles.playerName}>{item.name}</Text>
      <View style={styles.winningsBadge}>
        <Text style={styles.coinIcon}>💰</Text>
        <Text style={styles.winnings}>{item.winnings}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'weekly' && styles.tabActive]}
          onPress={() => setActiveTab('weekly')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'weekly' && styles.tabTextActive,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'monthly' && styles.tabActive]}
          onPress={() => setActiveTab('monthly')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'monthly' && styles.tabTextActive,
            ]}
          >
            Monthly
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'fulltime' && styles.tabActive]}
          onPress={() => setActiveTab('fulltime')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'fulltime' && styles.tabTextActive,
            ]}
          >
            Fulltime
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard Header */}
      <View style={styles.leaderboardHeader}>
        <Text style={styles.headerCell}>Position</Text>
        <Text style={styles.headerCell}>Player Name</Text>
        <Text style={styles.headerCell}>Winning</Text>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={getLeaderboard()}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderRankItem}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1628',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 39, 131, 0.2)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
  },

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 39, 131, 0.15)',
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(79, 39, 131, 0.1)',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#4A90E2',
  },
  tabText: {
    color: '#7fa8c1',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '800',
  },

  // Leaderboard Header
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    marginHorizontal: 14,
    marginTop: 12,
  },
  headerCell: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },

  // List
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 30,
  },

  // Rank Row
  rankRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(79, 39, 131, 0.1)',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(79, 39, 131, 0.2)',
  },
  position: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    width: 40,
    textAlign: 'center',
  },
  playerName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  winningsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    gap: 6,
  },
  coinIcon: {
    fontSize: 14,
  },
  winnings: {
    color: '#ffc107',
    fontSize: 14,
    fontWeight: '800',
  },
});
