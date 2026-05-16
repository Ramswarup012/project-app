import React, {
  useState,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import API from '../services/api';

const { width } = Dimensions.get('window');

// const GAMES = [
//   { id: '1', title: 'BR SURVIVAL', players: 33, image: 'https://i.ytimg.com/vi/R77w-xcaxdI/maxresdefault.jpg' },
//   { id: '2', title: 'CLASH SQUAD HEADSHOT', players: 32, image: 'https://i.ytimg.com/vi/rk6WkDwquWE/maxresdefault.jpg' },
//   { id: '3', title: 'CLASH SQUAD', players: 30, image: 'https://i.ytimg.com/vi/8p3LlKKh9UI/maxresdefault.jpg' },
//   { id: '4', title: 'LONE WOLF', players: 66, image: 'https://staticg.sportskeeda.com/editor/2022/04/46189-16505245613120-1920.jpg' },
//   { id: '5', title: 'LONE WOLF HEADSHOT', players: 12, image: 'https://i.ytimg.com/vi/PwYZ0mo3UAM/maxresdefault.jpg' },
//   { id: '6', title: 'BATTLE ROYALE', players: 20, image: 'https://i.ytimg.com/vi/NmO0JsyCYSU/maxresdefault.jpg' },
//   { id: '7', title: 'CHALLENGE', players: 45, image: 'https://tse4.mm.bing.net/th/id/OIP.1aQTOPi74KEXY04ita6QsQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
//   { id: '8', title: 'FREE MATCHES', players: 128, image: 'https://i.ytimg.com/vi/4YC_-wBlJaM/maxresdefault.jpg' },
// ];

const GAME_CATEGORIES = [

  {
    id: "1",

    title: "Clash Squad",

    image:
      "https://wallpaperaccess.com/full/4893732.jpg",
  },

  {
    id: "2",

    title: "Battle Royale",

    image:
      "https://wallpaperaccess.com/full/1628377.jpg",
  },

  {
    id: "3",

    title: "Lone Wolf",

    image:
      "https://wallpaperaccess.com/full/4893841.jpg",
  },

  {
    id: "4",

    title: "Free Matches",

    image:
      "https://wallpaperaccess.com/full/3059057.jpg",
  },

];



export default function HomeScreen() {
  const router = useRouter();
  const [tournaments, setTournaments] =
  useState([]);

const fetchTournaments =
  async () => {

    try {

      const response =
        await API.get(
          "/tournaments/all"
        );

      setTournaments(
        response.data.tournaments
      );

    } catch (error) {

      console.log(error);

    }

  };

useEffect(() => {

  fetchTournaments();

}, []);

 



const renderGame = ({
  item,
}: {
  item: any
}) => (

  <TouchableOpacity

    style={styles.gameCard}

    onPress={() =>

      router.push({

        pathname:
          "/category-tournaments",

        params: {
          category:
            item.title,
        },

      })

    }

  >

    <Image
      source={{
        uri: item.image,
      }}
      style={styles.gameImage}
    />

    <LinearGradient

      colors={[
        "transparent",
        "rgba(0,0,0,0.9)",
      ]}

      style={styles.overlay}

    >

      <Text style={styles.gameTitle}>
        {item.title}
      </Text>

      <Text style={styles.viewText}>
        View Tournaments
      </Text>

    </LinearGradient>

  </TouchableOpacity>

);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=200&h=200&fit=crop' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>Probattle</Text>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity onPress={() => router.push('/wallet')} style={styles.coinsContainer}>
            <Text style={styles.coins}>₹0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/notification')}>
            <Text style={styles.bell}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.deviceBar}>
          <Text style={styles.deviceText}>1 device</Text>
        </View>

        <View style={styles.noticeBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={styles.noticeText}>NOTICE FOR LONEWOLF/CS PLAYERS - Not registering with multiple names while...</Text>
          </ScrollView>
        </View>

        <View style={styles.promoCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=400&fit=crop' }}
            style={styles.promoImage} 
          />
          <View style={styles.promoOverlay}>
            <Text style={styles.promoTitle}>GET ₹300 FOR</Text>
            <Text style={styles.promoSub}>6K VIEWS ON YT VIDEO OR SHORTS</Text>
            <TouchableOpacity style={styles.moreBtn}><Text style={styles.moreBtnText}>More details</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>My Matches</Text>
        <View style={styles.matchesRow}>
          <TouchableOpacity style={[styles.matchBox, { borderColor: 'rgba(108,63,231,0.5)', borderWidth: 1.5 }]}>
            <Text style={styles.matchIcon}>🔁</Text>
            <Text style={styles.matchText}>Ongoing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.matchBox}>
            <Text style={styles.matchIcon}>📅</Text>
            <Text style={styles.matchText}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.matchBox}>
            <Text style={styles.matchIcon}>✅</Text>
            <Text style={styles.matchText}>Completed</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>Esports Games</Text>

        <FlatList
          data={GAME_CATEGORIES}
          keyExtractor={(i) => i.id}
          renderItem={renderGame}
          numColumns={2}
          columnWrapperStyle={styles.column}
          scrollEnabled={false}
        />

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => router.push('/earn')} style={styles.tabItem}>
          <Text style={{ fontSize: 24 }}>🎁</Text>
          <Text style={styles.tabText}>Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/leaderboard')} style={styles.tabItem}>
          <Text style={{ fontSize: 24 }}>🏆</Text>
          <Text style={styles.tabText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/home')} style={[styles.tabItem, { backgroundColor: 'rgba(108,63,231,0.15)', borderRadius: 12, paddingVertical: 6, marginVertical: -6, paddingHorizontal: 16 }]}>
          <Text style={{ fontSize: 24 }}>🏠</Text>
          <Text style={styles.tabTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/menu')} style={styles.tabItem}>
          <Text style={{ fontSize: 24 }}>☰</Text>
          <Text style={styles.tabText}>Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a1628' },
  scroll: { paddingBottom: 90 },
  
  // Header Styles
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 8,
  },
  leftHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#6c3fe7',
  },
  username: { color: '#fff', fontSize: 20, fontWeight: '800' },
  rightHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  coins: { 
    color: '#ffd34d', 
    fontWeight: '800', 
    fontSize: 16,
    backgroundColor: 'rgba(255,211,77,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  coinsContainer: {
    borderRadius: 16,
  },
  bell: { color: '#fff', fontSize: 22 },
  
  // Device Bar
  deviceBar: { 
    alignSelf: 'center', 
    backgroundColor: 'rgba(108,63,231,0.15)', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(108,63,231,0.3)',
  },
  deviceText: { color: '#b3d9ff', fontSize: 13, fontWeight: '600' },
  
  // Notice Bar
  noticeBar: { 
    backgroundColor: 'rgba(79, 39, 131, 0.2)', 
    marginHorizontal: 16, 
    marginTop: 16,
    borderRadius: 12, 
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6c3fe7',
  },
  noticeText: { color: '#cfe7ff', fontSize: 12, fontWeight: '500' },
  
  // Promo Card
  promoCard: { 
    height: 180, 
    marginHorizontal: 16, 
    marginTop: 20,
    borderRadius: 16, 
    overflow: 'hidden',
    backgroundColor: '#073146',
    shadowColor: '#6c3fe7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  promoImage: { position: 'absolute', width: '100%', height: '100%', opacity: 0.5 },
  promoOverlay: { flex: 1, padding: 16, justifyContent: 'flex-end', backgroundColor: 'rgba(10,22,40,0.3)' },
  promoTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  promoSub: { color: '#b3d9ff', fontSize: 13, marginTop: 6, fontWeight: '500' },
  moreBtn: { 
    marginTop: 12, 
    backgroundColor: '#6c3fe7', 
    alignSelf: 'flex-start', 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 24,
    shadowColor: '#6c3fe7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  moreBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  
  // Section Title
  sectionTitle: { 
    color: '#fff', 
    fontSize: 22, 
    fontWeight: '800', 
    marginLeft: 16, 
    marginTop: 28,
    letterSpacing: 0.5,
  },
  
  // Match Boxes
  matchesRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginHorizontal: 16, 
    marginTop: 16,
    gap: 10,
  },
  matchBox: { 
    flex: 1, 
    backgroundColor: 'rgba(205, 203, 208, 0.88)', 
    marginHorizontal: 4, 
    paddingVertical: 16,
    borderRadius: 14, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(79, 39, 131, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  matchIcon: { fontSize: 28, marginBottom: 8 },
  matchText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  
  // Game Cards
  column: { 
    justifyContent: 'space-between', 
    paddingHorizontal: 12, 
    marginTop: 14,
    gap: 12,
  },
  overlay: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 14,
},

viewText: {
  color: "#FFB800",
  fontWeight: "bold",
  marginTop: 6,
  fontSize: 13,
},
  gameCard: { 
    width: (width - 48) / 2, 
    backgroundColor: 'rgba(9, 42, 54, 0.9)', 
    borderRadius: 14, 
    overflow: 'hidden', 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(79, 39, 131, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  gameImage: { width: '100%', height: 120, resizeMode: 'cover', opacity: 0.85 },
  gameFooter: { 
    padding: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: 'rgba(7, 40, 52, 0.6)',
  },
  gameTitle: { color: '#fff', fontWeight: '700', fontSize: 12, flex: 1 },
  playerCount: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#12b34a' },
  playerText: { color: '#7fe3a7', fontWeight: '700', fontSize: 12 },
  
  // Tab Bar
  tabBar: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: 70, 
    backgroundColor: 'rgba(7, 49, 70, 0.98)',
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(79, 39, 131, 0.3)',
  },
  tabItem: { alignItems: 'center', flex: 1 },
  tabText: { color: '#7fa8c1', fontSize: 11, marginTop: 4, fontWeight: '600' },
  tabActive: { backgroundColor: 'transparent' },
  tabTextActive: { color: '#fff', fontSize: 11, fontWeight: '800', marginTop: 4 },
});