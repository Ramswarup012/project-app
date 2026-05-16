import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const MenuScreen = () => {
  const router = useRouter();
  const [notificationEnabled, setNotificationEnabled] = React.useState(true);

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: 'person', onPress: () => router.push('/profile') },
    { id: 'wallet', label: 'My Wallet', icon: 'wallet', onPress: () => router.push('/wallet') },
    { id: 'stats', label: 'My Statistics', icon: 'bar-chart', onPress: () => {} },
    { id: 'topplayers', label: 'Top Players', icon: 'trophy', onPress: () => router.push('/leaderboard') },
    { id: 'notifications', label: 'Notifications', icon: 'notifications', onPress: () => {} },
    { id: 'contact', label: 'Contact Us', icon: 'headset', onPress: () => {} },
    { id: 'faq', label: 'FAQ', icon: 'help-circle', onPress: () => {} },
    { id: 'about', label: 'About Us', icon: 'information-circle', onPress: () => {} },
    { id: 'privacy', label: 'Privacy Policy', icon: 'lock-closed', onPress: () => {} },
    { id: 'terms', label: 'Terms & Conditions', icon: 'shield-checkmark', onPress: () => {} },
    {
  id: 'logout',
  label: 'Logout',
  icon: 'log-out',
  onPress: async () => {

    await AsyncStorage.removeItem("usertoken");

    await AsyncStorage.removeItem("user");

    router.replace('/');

  }
},
  ];

  const renderMenuItem = (item: any) => {
    if (item.id === 'notifications') {
      return (
        <View key={item.id} style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <View style={styles.menuIcon}>
              <Ionicons name={item.icon as any} size={22} color="#0088cc" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
          </View>
          <Switch
            value={notificationEnabled}
            onValueChange={setNotificationEnabled}
            trackColor={{ false: '#767577', true: '#81c784' }}
            thumbColor={notificationEnabled ? '#4A90E2' : '#f4f3f4'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <View style={styles.menuIcon}>
            <Ionicons name={item.icon as any} size={22} color="#0088cc" />
          </View>
          <Text style={[styles.menuLabel, item.id === 'logout' && { color: '#ff6b6b' }]}>
            {item.label}
          </Text>
        </View>
        {item.id !== 'logout' && (
          <Ionicons name="chevron-forward" size={24} color="#7fa8c1" />
        )}
      </TouchableOpacity>
 
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <View style={{ width: 30 }} />
      </View>

      <TouchableOpacity

  style={styles.adminButton}

  onPress={() =>
    router.push(
      "/admin-login"
    )
  }

>

  <Text style={styles.adminText}>
    Admin Panel
  </Text>

</TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color="#fff" />
            </View>
          </View>

          {/* Username */}
          <Text style={styles.username}>ng_iconic</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Matches Played</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Total Kills</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <View style={styles.earningBadge}>
                <Text style={styles.earningIcon}>₹</Text>
              </View>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Total Earning</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => renderMenuItem(item))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuScreen;

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

  // Scroll Content
  scrollContent: {
    paddingBottom: 40,
  },

  // Profile Section
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 39, 131, 0.1)',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffc107',
  },
  username: {
    color: '#0088cc',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  adminButton: {
  backgroundColor: "#FFB800",
  padding: 18,
  borderRadius: 18,
  alignItems: "center",
  marginTop: 20,
},

adminText: {
  color: "#000000",
  fontWeight: "bold",
  fontSize: 18,
},
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  earningBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffc107',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  earningIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },

  // Menu Container
  menuContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // Menu Item
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 136, 204, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuLabel: {
    color: '#1a1a1a',
    fontSize: 15,
    fontWeight: '600',
  },
});
