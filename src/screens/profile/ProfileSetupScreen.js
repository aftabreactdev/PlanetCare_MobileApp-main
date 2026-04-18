import React, { useMemo, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";

const COLORS = {
  screen: "#F6F6F6",
  white: "#FFFFFF",
  text: "#0F0F0F",
  subText: "#5A5A5A",
  placeholder: "#A0A0A0",
  border: "#D7D7D7",
  soft: "#EFEFEF",
  dropdownBg: "#F8F8F8",
  yellowOuter: "#FFF5B8",
  yellowInner: "#F6D400",
  shadow: "#000000",
};

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
  "Other",
];

const LabelRow = ({ icon, title, optional = false }) => {
  return (
    <View style={styles.labelRow}>
      <FontAwesome name={icon} size={14} color={COLORS.text} />
      <Text style={styles.labelText}>
        {title}
        {optional ? <Text style={styles.optionalText}> (Optional)</Text> : null}
      </Text>
    </View>
  );
};

const Profilesetup = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [showGender, setShowGender] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formattedDate = useMemo(() => {
    return selectedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  const onChangeDate = (event, date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSelectGender = (value) => {
    setGender(value);
    setShowGender(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Profile Setup</Text>
        <Text style={styles.subtitle}>Set up your profile</Text>

        <View style={styles.content}>
          {/* Full Name */}
          <LabelRow icon="user" title="Full Name" />
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Daniel Park"
            placeholderTextColor={COLORS.placeholder}
            style={styles.input}
          />

          {/* Email */}
          <LabelRow icon="envelope" title="Email" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="example@gmail.com"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          {/* Age */}
          <LabelRow icon="calendar" title="Age" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDatePicker(true)}
            style={styles.selectField}
          >
            <Text style={styles.selectValue}>{formattedDate}</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.text} />
          </TouchableOpacity>

          {/* iOS Modal Picker */}
          {Platform.OS === "ios" ? (
            <Modal
              visible={showDatePicker}
              transparent
              animationType="slide"
              onRequestClose={() => setShowDatePicker(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalSheet}>
                  <View style={styles.modalHeader}>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.modalAction}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setShowDatePicker(false)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.modalAction}>Done</Text>
                    </TouchableOpacity>
                  </View>

                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="spinner"
                    maximumDate={new Date()}
                    onChange={onChangeDate}
                    style={styles.iosPicker}
                  />
                </View>
              </View>
            </Modal>
          ) : null}

          {/* Android Picker */}
          {showDatePicker && Platform.OS === "android" ? (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={onChangeDate}
            />
          ) : null}

          {/* Gender */}
          <LabelRow icon="venus-mars" title="Gender" optional />

          <View style={styles.dropdownWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowGender((prev) => !prev)}
              style={[
                styles.selectField,
                showGender ? styles.selectFieldOpen : null,
              ]}
            >
              <Text style={styles.selectValue}>{gender}</Text>
              <Ionicons
                name={showGender ? "chevron-up" : "chevron-down"}
                size={20}
                color={COLORS.text}
              />
            </TouchableOpacity>

            {showGender ? (
              <View style={styles.dropdownMenu}>
                {GENDER_OPTIONS.map((item, index) => (
                  <TouchableOpacity
                    key={item}
                    activeOpacity={0.8}
                    onPress={() => handleSelectGender(item)}
                    style={[
                      styles.dropdownItem,
                      index !== GENDER_OPTIONS.length - 1
                        ? styles.dropdownItemBorder
                        : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        item === gender ? styles.dropdownItemTextSelected : null,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>

          {/* Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate("ProfileSetup2")}
            style={styles.fabOuter}
          >
            <View style={styles.fabInner}>
              <Ionicons name="chevron-down" size={24} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profilesetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screen,
  },
  scrollContent: {
    paddingTop: H("5%"),
    paddingBottom: H("6%"),
  },
  backButton: {
    alignSelf: "flex-start",
    marginLeft: W("6%"),
    marginBottom: H("3%"),
  },
  title: {
    textAlign: "center",
    fontSize: W("9.5%"),
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: H("1.2%"),
  },
  subtitle: {
    textAlign: "center",
    fontSize: W("4.8%"),
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: H("4%"),
  },
  content: {
    marginHorizontal: W("6%"),
    paddingHorizontal: W("3%"),
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: H("0.8%"),
    marginTop: H("1.8%"),
  },
  labelText: {
    marginLeft: W("2%"),
    fontSize: W("4.7%"),
    fontWeight: "700",
    color: COLORS.text,
  },
  optionalText: {
    fontWeight: "400",
    color: COLORS.subText,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: H("1%"),
    marginBottom: H("2.2%"),
    color: COLORS.text,
    fontSize: W("4.4%"),
    backgroundColor: "transparent",
  },
  selectField: {
    minHeight: H("6%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: H("1%"),
    marginBottom: H("2.2%"),
    backgroundColor: "transparent",
  },
  selectFieldOpen: {
    marginBottom: 0,
  },
  selectValue: {
    fontSize: W("4.4%"),
    color: COLORS.text,
    fontWeight: "500",
  },
  dropdownWrapper: {
    marginTop: H("0.2%"),
  },
  dropdownMenu: {
    backgroundColor: "#ECECEC",
    borderRadius: 18,
    overflow: "hidden",
    marginTop: H("0.8%"),
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: H("1.7%"),
    paddingHorizontal: W("4%"),
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownItemText: {
    fontSize: W("4.3%"),
    color: COLORS.text,
  },
  dropdownItemTextSelected: {
    fontWeight: "700",
  },
  fabOuter: {
    alignSelf: "center",
    marginTop: H("5%"),
    width: W("18%"),
    height: W("18%"),
    borderRadius: W("9%"),
    backgroundColor: COLORS.yellowOuter,
    justifyContent: "center",
    alignItems: "center",
  },
  fabInner: {
    width: W("14%"),
    height: W("14%"),
    borderRadius: W("7%"),
    backgroundColor: COLORS.yellowInner,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  modalSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingBottom: H("2%"),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: W("5%"),
    paddingVertical: H("1.8%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.soft,
  },
  modalAction: {
    fontSize: W("4.2%"),
    fontWeight: "600",
    color: COLORS.text,
  },
  iosPicker: {
    backgroundColor: COLORS.white,
    height: 220,
  },
});