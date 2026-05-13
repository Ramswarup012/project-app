import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const CONTESTS = {
  ongoing: [
    {
      id: '1',
      title: 'LONE WOLF 🔥 SKILL/SKIN ON😎',
      gameId: '#112545',
      time: '12/05/2026 at 05:20 PM',
      prizePool: 40,
      perKill: 0,
      entryFee: 25,
      type: 'Solo',
      entriesPerPlayer: 25,
      map: 'Bermuda',
      spots: { left: 0, total: 2 },
      image: 'https://staticg.sportskeeda.com/editor/2022/04/46189-16505245613120-1920.jpg',
      status: 'Joining Full',
      statusColor: '#4A90E2',
    },
  ],
  upcoming: [
    {
      id: '2',
      title: 'LONE WOLF 🔥 SKILL/SKIN ON😎',
      gameId: '#112870',
      time: '12/05/2026 at 05:40 PM',
      prizePool: 40,
      perKill: 0,
      entryFee: 25,
      type: 'Solo',
      entriesPerPlayer: 25,
      map: 'Bermuda',
      spots: { left: 0, total: 2 },
      image: 'https://staticg.sportskeeda.com/editor/2022/04/46189-16505245613120-1920.jpg',
      status: 'Joining Full',
      statusColor: '#4A90E2',
    },
  ],
  resulted: [
    {
      id: '3',
      title: 'LONE WOLF 🔥 SKILL/SKIN ON😎',
      gameId: '#112871',
      time: '12/05/2026 at 04:40 PM',
      prizePool: 55,
      perKill: 0,
      entryFee: 35,
      type: 'Solo',
      entriesPerPlayer: 35,
      map: 'Bermuda',
      image: 'https://staticg.sportskeeda.com/editor/2022/04/46189-16505245613120-1920.jpg',
      status: 'View Details',
      statusColor: '#4A90E2',
    },
  ],
};

const LoneWolfScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('ongoing');

  const getContests = () => {
    return CONTESTS[activeTab as keyof typeof CONTESTS] || [];
  };

  const renderContestCard = (contest: any) => (
    <View key={contest.id} style={styles.contestCard}>
      {/* Contest Image */}
      <Image source={{ uri: contest.image }} style={styles.contestImage} />

      {/* Contest Info */}
      <View style={styles.contestInfo}>
        <Text style={styles.contestTitle}>{contest.title}</Text>
        <Text style={styles.gameId}>{contest.gameId}</Text>
        <Text style={styles.time}>{contest.time}</Text>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>PRIZE POOL</Text>
            <View style={styles.statValue}>
              <Text style={styles.coinIcon}>💰</Text>
              <Text style={styles.statNumber}>{contest.prizePool}</Text>
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>PER KILL</Text>
            <View style={styles.statValue}>
              <Text style={styles.coinIcon}>💰</Text>
              <Text style={styles.statNumber}>{contest.perKill}</Text>
            </View>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ENTRY FEE</Text>
            <View style={styles.statValue}>
              <Text style={styles.coinIcon}>💰</Text>
              <Text style={styles.statNumber}>{contest.entryFee}</Text>
            </View>
          </View>
        </View>

        {/* Details Row */}
        <View style={styles.detailsRow}>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>TYPE</Text>
            <Text style={styles.detailValue}>{contest.type}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>ENTRY PER PLAYER</Text>
            <Text style={styles.detailValue}>{contest.entriesPerPlayer}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>MAP</Text>
            <Text style={styles.detailValue}>{contest.map}</Text>
          </View>
        </View>

        {/* Spots / Status */}
        {contest.spots ? (
          <View style={styles.spotsContainer}>
            <View style={styles.spotsBar}>
              <View style={styles.spotsBarFill} />
            </View>
            <Text style={styles.spotsText}>
              Only {contest.spots.left} Spot Left {contest.spots.left}/{contest.spots.total}
            </Text>
          </View>
        ) : null}

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: contest.statusColor }]}
        >
          <Text style={styles.actionButtonText}>{contest.status}</Text>
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>LONE WOLF Contests</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ongoing' && styles.tabActive]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'ongoing' && styles.tabTextActive,
            ]}
          >
            Ongoing
          </Text>
          {activeTab === 'ongoing' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.tabTextActive,
            ]}
          >
            Upcoming
          </Text>
          {activeTab === 'upcoming' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'resulted' && styles.tabActive]}
          onPress={() => setActiveTab('resulted')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'resulted' && styles.tabTextActive,
            ]}
          >
            Resulted
          </Text>
          {activeTab === 'resulted' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {/* Contests List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {getContests().map((contest) => renderContestCard(contest))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoneWolfScreen;

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
    flex: 1,
    textAlign: 'center',
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
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabActive: {},
  tabText: {
    color: '#7fa8c1',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '800',
  },
  tabUnderline: {
    height: 2,
    backgroundColor: '#fff',
    marginTop: 6,
    borderRadius: 1,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  // Contest Card
  contestCard: {
    backgroundColor: '#073146',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(79, 39, 131, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  contestImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  contestInfo: {
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  contestTitle: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  gameId: {
    color: '#404040',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  time: {
    color: '#666',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 12,
  },

  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
    gap: 8,
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    color: '#808080',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  statValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  coinIcon: {
    fontSize: 16,
  },
  statNumber: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: '800',
  },

  // Details Row
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  detailBox: {
    flex: 1,
  },
  detailLabel: {
    color: '#808080',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailValue: {
    color: '#1a1a1a',
    fontSize: 14,
    fontWeight: '800',
  },

  // Spots
  spotsContainer: {
    marginBottom: 12,
  },
  spotsBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  spotsBarFill: {
    height: '100%',
    backgroundColor: '#FF4444',
    width: '100%',
  },
  spotsText: {
    color: '#FF4444',
    fontSize: 12,
    fontWeight: '700',
  },

  // Action Button
  actionButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
});
