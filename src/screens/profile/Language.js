import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const SettingsScreen = () => {
  const navigation = useNavigation(); //  FIX HERE

  const [largerTextSize, setLargerTextSize] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [screenReaderSupport, setScreenReaderSupport] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const languages = [
    { id: '1', name: 'English' },
    { id: '2', name: 'Spanish' },
    { id: '3', name: 'French' },
    { id: '4', name: 'German' },
    { id: '5', name: 'Chinese' },
    { id: '6', name: 'Japanese' },
    { id: '7', name: 'Korean' },
    { id: '8', name: 'Arabic' },
  ];

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setDropdownVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 15,
          gap: 40
        }}>
          
          <TouchableOpacity
            onPress={() => navigation.goBack()}   // ✅ FIXED
            style={styles.backBtn}
          >
            <Icon name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Language</Text>

          <View style={styles.iconBox} />
        </View>

        {/* LANGUAGE */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedLanguage}
            </Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* ACCESSIBILITY */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Accessibility</Text>

          <View style={styles.settingItem}>
            <Text>Larger Text Size</Text>
            <Switch value={largerTextSize} onValueChange={setLargerTextSize} />
          </View>

          <View style={styles.settingItem}>
            <Text>High Contrast Mode</Text>
            <Switch value={highContrastMode} onValueChange={setHighContrastMode} />
          </View>

          <View style={styles.settingItem}>
            <Text>Screen Reader Support</Text>
            <Switch value={screenReaderSupport} onValueChange={setScreenReaderSupport} />
          </View>
        </View>

        {/* SAVE */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => console.log('Saved')}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* MODAL */}
      <Modal visible={dropdownVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelectLanguage(item.name)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  section: {
    marginBottom: 32,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  backBtn: {
    padding: 8,
  },

  iconBox: {
    width: 24,
  },

  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    padding: 14,
    borderRadius: 10,
  },

  dropdownButtonText: {
    fontSize: 16,
    color: '#000',
  },

  dropdownIcon: {
    fontSize: 14,
    color: '#888',
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },

  saveButton: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownModal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '60%',
    padding: 10,
  },

  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});