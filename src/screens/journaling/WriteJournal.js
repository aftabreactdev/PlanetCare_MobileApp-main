import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

const moods = [
  { id: 1, label: "Unhappy", emoji: "☹️" },
  { id: 2, label: "Sad", emoji: "😔" },
  { id: 3, label: "Meh", emoji: "😐" },
  { id: 4, label: "Alright", emoji: "🙂" },
  { id: 5, label: "Happy", emoji: "😀" },
];

const tagsList = [
  "Gratitude",
  "Goals",
  "Stress Relief",
  "Relationships",
  "Self-Care",
  "Reflection",
  "Health",
  "Work",
  "Motivation",
  "Mindfulness",
];

const WriteJournalScreen = ({ navigation, route }) => {
  const editingData = route?.params?.journalData;

  const [selectedMood, setSelectedMood] = useState(editingData?.mood || "Happy");
  const [selectedTags, setSelectedTags] = useState(editingData?.tags || []);
  const [date, setDate] = useState(editingData?.date || "August 25, 2025");

  const [intention, setIntention] = useState(editingData?.intention || "");
  const [affirmation, setAffirmation] = useState(editingData?.affirmation || "");
  const [focusMind, setFocusMind] = useState(editingData?.focusMind || "");
  const [gratefulFor, setGratefulFor] = useState(editingData?.gratefulFor || "");
  const [greatToday, setGreatToday] = useState(editingData?.greatToday || "");

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = async () => {
    const journalEntry = {
      date,
      mood: selectedMood,
      tags: selectedTags,
      intention,
      affirmation,
      focusMind,
      gratefulFor,
      greatToday,
    };

    try {
      await AsyncStorage.setItem("journal_entry", JSON.stringify(journalEntry));
      navigation.navigate("ViewJournal", { journalData: journalEntry });
    } catch (error) {
      console.log("Error saving journal:", error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
              <Ionicons name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>New Journal Entry</Text>

            <View style={styles.rightSpace} />
          </View>

          {/* Date */}
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={22} color="#000" />
            <Text style={styles.dateText}>{date}</Text>
          </View>

          {/* Mood */}
          <View style={styles.moodRow}>
            {moods.map((item) => {
              const isSelected = selectedMood === item.label;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.moodItem}
                  onPress={() => setSelectedMood(item.label)}
                >
                  <View style={[styles.emojiCircle, isSelected && styles.activeMoodCircle]}>
                    <Text style={styles.emoji}>{item.emoji}</Text>
                  </View>
                  <Text style={[styles.moodLabel, isSelected && styles.activeMoodLabel]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Text Areas */}
          <JournalInput
            title="Today’s Intention"
            value={intention}
            onChangeText={setIntention}
          />

          <JournalInput
            title="Affirmation of the Day:"
            value={affirmation}
            onChangeText={setAffirmation}
          />

          <JournalInput
            title="I am choosing to focus my mind on:"
            value={focusMind}
            onChangeText={setFocusMind}
          />

          <JournalInput
            title="I am grateful for"
            value={gratefulFor}
            onChangeText={setGratefulFor}
          />

          <JournalInput
            title="How will I make today great?"
            value={greatToday}
            onChangeText={setGreatToday}
          />

          {/* Tags */}
          <View style={styles.tagsWrapper}>
            {tagsList.map((tag, index) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.tag, isSelected && styles.selectedTag]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Background circles */}
        <View style={styles.bigCircle} />
        <View style={styles.smallCircle} />
        <View style={styles.lightBubble} />
      </View>
    </SafeAreaView>
  );
};

const JournalInput = ({ title, value, onChangeText }) => {
  return (
    <View style={styles.inputCard}>
      <Text style={styles.inputTitle}>{title}</Text>
      <View style={styles.line} />
      <TextInput
        style={styles.textArea}
        placeholder="Write here..."
        placeholderTextColor="#d9e2ea"
        multiline
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default WriteJournalScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  container: {
    flex: 1,
    backgroundColor: "#a9d4f5",
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  iconBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
  },
  rightSpace: {
    width: 28,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dateText: {
    fontSize: 17,
    color: "#111",
    marginLeft: 8,
    fontWeight: "500",
  },
  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
    flexWrap: "wrap",
  },
  moodItem: {
    alignItems: "center",
    width: "19%",
  },
  emojiCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  activeMoodCircle: {
    backgroundColor: "#f7cf4a",
    transform: [{ scale: 1.08 }],
  },
  emoji: {
    fontSize: 22,
  },
  moodLabel: {
    fontSize: 13,
    color: "#5f6970",
    textAlign: "center",
  },
  activeMoodLabel: {
    color: "#111",
    fontWeight: "700",
  },
  inputCard: {
    backgroundColor: "rgba(30, 55, 80, 0.62)",
    borderRadius: 22,
    marginBottom: 16,
    overflow: "hidden",
  },
  inputTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  line: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.45)",
  },
  textArea: {
    minHeight: 84,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    fontSize: 15,
    color: "#fff",
  },
  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    marginBottom: 28,
  },
  tag: {
    borderWidth: 1.4,
    borderColor: "#253648",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  selectedTag: {
    backgroundColor: "#0e2d68",
    borderColor: "#0e2d68",
  },
  tagText: {
    color: "#1f2a36",
    fontSize: 14,
    fontWeight: "500",
  },
  selectedTagText: {
    color: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 34,
  },
  cancelBtn: {
    width: "42%",
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#0b1118",
    backgroundColor: "#138fe4",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  saveBtn: {
    width: "42%",
    height: 56,
    borderRadius: 14,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  bigCircle: {
    position: "absolute",
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: "rgba(255,255,255,0.22)",
    bottom: 40,
    left: -40,
  },
  smallCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(255,255,255,0.14)",
    bottom: 40,
    right: -20,
  },
  lightBubble: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.16)",
    top: 330,
    right: 80,
  },
});