import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppHeader from '../../components/AppHeader';
import CustomButton from '../../components/CustomButton';
import colors from '../../constants/colors';

import { createJournalEntry } from '../../services/journalService';
import { isEmpty } from '../../utils/validators';
import { showMessage } from '../../utils/showMessage';

export default function AddJournalScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [entry, setEntry] = useState('');

  const handleSaveJournal = async () => {
  if (isEmpty(title)) {
    showMessage('Validation Error', 'Title is required');
    return;
  }

  if (isEmpty(entry)) {
    showMessage('Validation Error', 'Journal entry is required');
    return;
  }

  const payload = {
    title,
    entry,
    created_at: new Date().toISOString(),
  };

  const response = await createJournalEntry(payload);

  if (response?.success) {
    showMessage('Success', 'Journal saved successfully');
    navigation.goBack();
  }
};

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <AppHeader
            title="Add Journal"
            subtitle="Write down your thoughts, reflections, and feelings."
          />

          <Text style={styles.label}>Title</Text>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="Enter journal title"
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <Text style={styles.label}>Your Entry</Text>
          <View style={styles.textAreaBox}>
            <TextInput
              style={styles.textArea}
              placeholder="Write your journal entry here..."
              placeholderTextColor="rgba(255,255,255,0.45)"
              value={entry}
              onChangeText={setEntry}
              multiline
              textAlignVertical="top"
            />
          </View>

          <CustomButton
            title="Save Journal"
            onPress={handleSaveJournal}
            style={styles.button}
          />
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
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  inputBox: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  input: {
    color: colors.white,
    fontSize: 15,
    padding: 0,
  },
  textAreaBox: {
    minHeight: 220,
    borderRadius: 20,
    backgroundColor: '#1B2147',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    marginBottom: 24,
  },
  textArea: {
    minHeight: 180,
    color: colors.white,
    fontSize: 15,
  },
  button: {
    marginTop: 'auto',
  },
});