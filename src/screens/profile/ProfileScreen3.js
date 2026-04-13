import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Icons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as W,
  heightPercentageToDP as H,
} from "react-native-responsive-screen";
import { DatePicker } from "react-native-wheel-pick";

const Profilesetup3 = (props) => {
  const [fullName, setFullName] = useState("Daniel Park");
  const [email, setEmail] = useState("example@gmail.com");
  const [gender, setGender] = useState("Male");
  const [showGender, setShowGender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date("2018-06-27"));
  
  // Error states
  const [errors, setErrors] = useState({});
  
  // Interest states
  const [selectedInterests, setSelectedInterests] = useState({
    relationships: false,
    friends: true,
    travel: true,
    selfCare: false,
    calm: true,
    money: false,
    food: false,
    health: false,
    family: true,
  });

  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to say",
    "Other",
  ];

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Validate Full Name
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
      isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const toggleInterest = (category) => {
    setSelectedInterests(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSave = () => {
    if (validateForm()) {
      // Check if at least one interest is selected
      const hasInterest = Object.values(selectedInterests).some(value => value === true);
      
      if (!hasInterest) {
        Alert.alert("Validation Error", "Please select at least one interest");
        return;
      }
      
      // Save successful
      Alert.alert(
        "Success",
        "Profile updated successfully!",
        [
          {
            text: "OK",
            onPress: () => props.navigation.replace("MainTabs")
          }
        ]
      );
    } else {
      Alert.alert("Validation Error", "Please fix the errors before saving");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: H("5%") }}
      >
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{ marginTop: H("3%"), marginLeft: W("4%") }}
        >
          <Icons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>

        {/* Header */}
        <Text
          style={{
            fontSize: W("5%"),
            textAlign: "center",
            marginTop: H("1%"),
            color: "#000",
            fontWeight: "bold",
          }}
        >
          Profile Setup
        </Text>

        {/* Profile Image */}
        <View style={{ alignItems: "center", marginTop: H("4%") }}>
          <View
            style={{
              height: W("30%"),
              width: W("30%"),
              borderRadius: W("15%"),
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icons name="person" size={W("12%")} color="#000" />
          </View>

          <TouchableOpacity>
            <Text style={{ marginTop: H("1%"), color: "#000", fontSize: W("3.2%") }}>
              Change photo
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: W("4%"), marginTop: H("5%"), color: "#000", marginLeft: W("5%"), fontWeight: "600" }}>
          Personal Info
        </Text>

        {/* FORM CARD */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: H("0%"),
            paddingHorizontal: W("6%"),
            paddingVertical: H("3%"),
          }}
        >
          {/* Full Name */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="person-outline" size={16} color="#000" />
            <Text style={{ marginLeft: 8, fontWeight: "600", color: "#000" }}>
              Full Name
            </Text>
          </View>

          <TextInput
            placeholder="Daniel Park"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors({ ...errors, fullName: null });
            }}
            style={{
              borderBottomWidth: 1,
              borderColor: errors.fullName ? "#FF3B30" : "#D9D9D9",
              marginBottom: errors.fullName ? H("0.5%") : H("3%"),
              paddingVertical: H("1%"),
              color: "#000",
            }}
          />
          {errors.fullName && (
            <Text style={{ color: "#FF3B30", fontSize: W("3%"), marginBottom: H("2%") }}>
              {errors.fullName}
            </Text>
          )}

          {/* Email */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="mail-outline" size={16} color="#000" />
            <Text style={{ marginLeft: 8, fontWeight: "600", color: "#000" }}>
              Email
            </Text>
          </View>

          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              borderBottomWidth: 1,
              borderColor: errors.email ? "#FF3B30" : "#D9D9D9",
              marginBottom: errors.email ? H("0.5%") : H("3%"),
              paddingVertical: H("1%"),
              color: "#000",
            }}
          />
          {errors.email && (
            <Text style={{ color: "#FF3B30", fontSize: W("3%"), marginBottom: H("2%") }}>
              {errors.email}
            </Text>
          )}

          {/* Age - No validation */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="calendar-outline" size={16} color="#000" />
            <Text style={{ marginLeft: 8, fontWeight: "600", color: "#000" }}>
              Age
            </Text>
          </View>

          <View
            style={{
              marginTop: H("1.5%"),
              marginBottom: H("3%"),
              alignItems: "center",
              backgroundColor: "#F4F4F4",
              borderRadius: 16,
              paddingVertical: H("1%"),
            }}
          >
            <DatePicker
              style={{ height: H("22%"), width: W("80%") }}
              date={selectedDate}
              mode="date"
              minimumDate={new Date("1900-01-01")}
              maximumDate={new Date()}
              textColor="#000"
              fadeToColor="#F4F4F4"
              androidMode="spinner"
              onDateChange={(date) => setSelectedDate(date)}
            />
          </View>

          {/* Gender */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="male-female-outline" size={16} color="#000" />
            <Text style={{ marginLeft: 8, fontWeight: "600", color: "#000" }}>
              Gender (Optional)
            </Text>
          </View>

          <View style={{ marginTop: H("1%") }}>
            <TouchableOpacity
              onPress={() => setShowGender(!showGender)}
              style={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 10,
                paddingHorizontal: W("4%"),
                paddingVertical: H("1.8%"),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#FAFAFA",
              }}
            >
              <Text style={{ color: "#000", fontSize: W("3.5%") }}>
                {gender}
              </Text>

              <Icons
                name={showGender ? "chevron-up-outline" : "chevron-down-outline"}
                size={20}
                color="#000"
              />
            </TouchableOpacity>

            {showGender && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#E0E0E0",
                  borderRadius: 10,
                  marginTop: 5,
                  backgroundColor: "#fff",
                }}
              >
                {genderOptions.map((item, index) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setGender(item);
                      setShowGender(false);
                    }}
                    style={{
                      paddingVertical: H("1.8%"),
                      paddingHorizontal: W("4%"),
                      borderBottomWidth: index !== genderOptions.length - 1 ? 1 : 0,
                      borderBottomColor: "#eee",
                    }}
                  >
                    <Text style={{ fontSize: W("3.5%"), color: "#000" }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Interests Section */}
        <Text style={{ fontSize: W("4%"), marginTop: H("2%"), color: "#000", marginLeft: W("5%"), fontWeight: "600" }}>
          Interests
        </Text>

        {/* Row 1 */}
        <View style={{ gap: 10, flexDirection: "row", justifyContent: "center", marginTop: H("2%"), flexWrap: "wrap", paddingHorizontal: W("5%") }}>
          <TouchableOpacity 
            onPress={() => toggleInterest("relationships")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.relationships ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.relationships ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Relationships
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleInterest("friends")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.friends ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.friends ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Friends
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleInterest("travel")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.travel ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.travel ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Travel
            </Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View style={{ gap: 10, flexDirection: "row", justifyContent: "center", marginTop: H("2%"), flexWrap: "wrap", paddingHorizontal: W("5%") }}>
          <TouchableOpacity 
            onPress={() => toggleInterest("selfCare")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.selfCare ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.selfCare ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Self Care
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleInterest("calm")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.calm ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.calm ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Calm
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleInterest("money")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.money ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.money ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Money
            </Text>
          </TouchableOpacity>
        </View>

        {/* Row 3 */}
        <View style={{ gap: 10, flexDirection: "row", justifyContent: "center", marginTop: H("2%"), flexWrap: "wrap", paddingHorizontal: W("5%") }}>
          <TouchableOpacity 
            onPress={() => toggleInterest("food")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.food ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.food ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Food
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleInterest("health")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.health ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.health ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Health
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => toggleInterest("family")}
            style={{ 
              borderRadius: H(5), 
              height: H("5%"), 
              paddingHorizontal: W("4%"),
              justifyContent: "center",
              borderWidth: 1, 
              borderColor: "#000",
              backgroundColor: selectedInterests.family ? "rgba(0, 149, 255, 1)" : "transparent"
            }}>
            <Text style={{ color: selectedInterests.family ? "#fff" : "#000", fontSize: W("3%"), textAlign: "center" }}>
              Family
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={{ backgroundColor: "rgba(0, 149, 255, 1)", margin: 20, padding: 15, borderRadius: 10, alignItems: "center" }} 
        onPress={handleSave}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profilesetup3;