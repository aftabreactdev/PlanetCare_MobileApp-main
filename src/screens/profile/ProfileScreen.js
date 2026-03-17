import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import colors from '../../constants/colors';

const menuItems = [
  { id: 1, title: 'Edit Profile', subtitle: 'Update your personal information' },
  { id: 2, title: 'Notifications', subtitle: 'Manage reminders and alerts' },
  { id: 3, title: 'Privacy & Security', subtitle: 'Control your account settings' },
  { id: 4, title: 'Help & Support', subtitle: 'Get assistance and contact support' },
];

export default function ProfileScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Profile"
            subtitle="Manage your account and preferences."
          />

          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>PC</Text>
            </View>

            <Text style={styles.name}>Planet Care User</Text>
            <Text style={styles.email}>user@planetcare.com</Text>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.editButton}
              onPress={() => navigation.navigate('ProfileSetup')}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuList}>
            {menuItems.map(item => (
              <TouchableOpacity key={item.id} activeOpacity={0.85} style={styles.menuCard}>
                <View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>

                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity activeOpacity={0.85} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
  profileCard: {
    backgroundColor: '#1B2147',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 22,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#179CFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  avatarText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  email: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 14,
    marginBottom: 18,
  },
  editButton: {
    backgroundColor: '#FFC83D',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
  menuList: {
    marginBottom: 18,
  },
  menuCard: {
    backgroundColor: '#1B2147',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  menuSubtitle: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 250,
  },
  arrow: {
    color: '#FFC83D',
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
  },
  logoutButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2A1530',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FF7B7B',
    fontSize: 16,
    fontWeight: '700',
  },
});