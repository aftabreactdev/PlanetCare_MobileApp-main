import React, { useState } from "react";
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
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

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

  const [selectedMood, setSelectedMood] = useState(
    editingData?.mood || "Happy"
  );
  const [selectedTags, setSelectedTags] = useState(editingData?.tags || []);
  const [date] = useState(editingData?.date || "August 25, 2025");

  const [intention, setIntention] = useState(editingData?.intention || "");
  const [affirmation, setAffirmation] = useState(
    editingData?.affirmation || ""
  );
  const [focusMind, setFocusMind] = useState(editingData?.focusMind || "");
  const [gratefulFor, setGratefulFor] = useState(
    editingData?.gratefulFor || ""
  );
  const [greatToday, setGreatToday] = useState(
    editingData?.greatToday || ""
  );

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
        {/* Background shapes */}
        <View style={styles.bigCircle} />
        <View style={styles.smallCircle} />
        <View style={styles.lightBubble} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconBtn}
            >
              <Ionicons name="arrow-back" size={W("6.5%")} color="#000" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>New Journal Entry</Text>

            <View style={styles.rightSpace} />
          </View>

          {/* Date */}
          <View style={styles.dateRow}>
            <Ionicons
              name="calendar-outline"
              size={W("5.5%")}
              color="#000"
            />
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
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.emojiCircle,
                      isSelected && styles.activeMoodCircle,
                    ]}
                  >
                    <Text style={styles.emoji}>{item.emoji}</Text>
                  </View>
                  <Text
                    style={[
                      styles.moodLabel,
                      isSelected && styles.activeMoodLabel,
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Inputs */}
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
                  activeOpacity={0.8}
                >
                  <Text
                    style={[styles.tagText, isSelected && styles.selectedTagText]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveBtnText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
        placeholderTextColor="#DCE6F0"
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
    backgroundColor: "#A9D4F5",
    position: "relative",
  },

  scrollContent: {
    paddingHorizontal: W("5%"),
    paddingTop: H("1.5%"),
    paddingBottom: H("14%"),
    zIndex: 2,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: H("2.5%"),
  },

  iconBtn: {
    width: W("9%"),
    height: W("9%"),
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: W("6%"),
    fontWeight: "700",
    color: "#111",
  },

  rightSpace: {
    width: W("9%"),
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: H("2.5%"),
  },

  dateText: {
    fontSize: W("4.2%"),
    color: "#111",
    marginLeft: W("2%"),
    fontWeight: "500",
  },

  moodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: H("2.5%"),
  },

  moodItem: {
    width: W("16%"),
    alignItems: "center",
  },

  emojiCircle: {
    width: W("11%"),
    height: W("11%"),
    borderRadius: W("5.5%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: H("0.8%"),
    backgroundColor: "rgba(255,255,255,0.25)",
  },

  activeMoodCircle: {
    backgroundColor: "#F7CF4A",
    transform: [{ scale: 1.06 }],
  },

  emoji: {
    fontSize: W("5.2%"),
  },

  moodLabel: {
    fontSize: W("2.9%"),
    color: "#5F6970",
    textAlign: "center",
  },

  activeMoodLabel: {
    color: "#111",
    fontWeight: "700",
  },

  inputCard: {
    backgroundColor: "rgba(59, 98, 134, 0.85)",
    borderRadius: W("6%"),
    marginBottom: H("1.8%"),
    overflow: "hidden",
  },

  inputTitle: {
    color: "#fff",
    fontSize: W("4.8%"),
    fontWeight: "700",
    paddingHorizontal: W("4%"),
    paddingTop: H("1.7%"),
    paddingBottom: H("1.2%"),
  },

  line: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  textArea: {
    minHeight: H("12%"),
    paddingHorizontal: W("4%"),
    paddingTop: H("1.6%"),
    paddingBottom: H("2%"),
    fontSize: W("4.4%"),
    color: "#fff",
  },

  tagsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: H("0.5%"),
    marginBottom: H("3%"),
  },

  tag: {
    borderWidth: 1.5,
    borderColor: "#4C5C6B",
    borderRadius: W("6%"),
    paddingHorizontal: W("4%"),
    paddingVertical: H("1.1%"),
    marginRight: W("2.5%"),
    marginBottom: H("1.4%"),
    backgroundColor: "transparent",
  },

  selectedTag: {
    backgroundColor: "#0E2D68",
    borderColor: "#0E2D68",
  },

  tagText: {
    color: "#37424C",
    fontSize: W("4%"),
    fontWeight: "500",
  },

  selectedTagText: {
    color: "#fff",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: H("1%"),
  },

  cancelBtn: {
    width: W("42%"),
    height: H("7%"),
    borderRadius: W("4%"),
    borderWidth: 2,
    borderColor: "#0B1118",
    backgroundColor: "#19A4E8",
    alignItems: "center",
    justifyContent: "center",
  },

  saveBtn: {
    width: W("42%"),
    height: H("7%"),
    borderRadius: W("4%"),
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelBtnText: {
    fontSize: W("4.5%"),
    fontWeight: "700",
    color: "#fff",
  },

  saveBtnText: {
    fontSize: W("4.5%"),
    fontWeight: "700",
    color: "#fff",
  },

  bigCircle: {
    position: "absolute",
    width: W("85%"),
    height: W("85%"),
    borderRadius: W("42.5%"),
    backgroundColor: "rgba(255,255,255,0.18)",
    bottom: H("8%"),
    left: -W("10%"),
    zIndex: 0,
  },

  smallCircle: {
    position: "absolute",
    width: W("38%"),
    height: W("38%"),
    borderRadius: W("19%"),
    backgroundColor: "rgba(255,255,255,0.12)",
    bottom: H("5%"),
    right: -W("8%"),
    zIndex: 0,
  },

  lightBubble: {
    position: "absolute",
    width: W("12%"),
    height: W("12%"),
    borderRadius: W("6%"),
    backgroundColor: "rgba(255,255,255,0.16)",
    top: H("34%"),
    right: W("14%"),
    zIndex: 0,
  },
});