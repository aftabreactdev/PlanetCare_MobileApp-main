import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/Ionicons";
import { DatePicker } from "react-native-wheel-pick";

const Profilesetup = (props) => {
  const [gender, setGender] = useState("Male");
  const [showGender, setShowGender] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date("2018-06-27")
  );

  const genderOptions = [
    "Male",
    "Female",
    "Non-binary",
    "Prefer not to say",
    "Other",
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ✅ HEADER WITH WHITE BACKGROUND */}
        <View style={{ backgroundColor: "#FFFFFF", paddingBottom: 20 }}>
          
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ marginTop: 20, marginLeft: 15 }}
          >
            <Icons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>

          {/* Header */}
          <Text style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 10,
          }}>
            Profile Setup
          </Text>

          <Text style={{
            textAlign: "center",
            fontSize: 14,
            marginTop: 5,
            fontWeight: "500",
          }}>
            Set up your profile
          </Text>
        </View>

        {/* FORM CARD */}
        <View style={{
          backgroundColor: "white",
          
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}>

          {/* Full Name */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="user" size={14} />
            <Text style={{ marginLeft: 8, fontWeight: "bold" }}>
              Full Name
            </Text>
          </View>

          <TextInput
            placeholder="Daniel Park"
            style={{
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
              marginBottom: 20,
            }}
          />

          {/* Email */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="envelope" size={14} />
            <Text style={{ marginLeft: 8, fontWeight: "bold" }}>
              Email
            </Text>
          </View>

          <TextInput
            placeholder="example@gmail.com"
            keyboardType="email-address"
            style={{
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
              marginBottom: 20,
            }}
          />

          {/* Age */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="calendar" size={14} color="#333" />
            <Text style={{ marginLeft: 8, fontWeight: "600", fontSize: 14 }}>
              Age
            </Text>
          </View>

          <View style={{
            marginTop: 12,
            marginBottom: 20,
            alignItems: "center",
            backgroundColor: "#F4F4F4",
            borderRadius: 16,
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}>
            <DatePicker
              style={{ height: 180, width: 300 }}
              date={selectedDate}
              mode="date"
              minimumDate={new Date("2000-01-01")}
              maximumDate={new Date("3000-12-31")}
              textColor="#000"
              fadeToColor="#F4F4F4"
              androidMode="spinner"
              onDateChange={(date) => setSelectedDate(date)}
            />
          </View>

          {/* Gender Dropdown */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="venus-mars" size={14} />
            <Text style={{ marginLeft: 8, fontWeight: "bold" }}>
              Gender (Optional)
            </Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => setShowGender(!showGender)}
              style={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 14,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#FAFAFA",
              }}
            >
              <Text style={{ color: "#333", fontSize: 14 }}>
                {gender}
              </Text>

              <Icons
                name={showGender ? "chevron-up-outline" : "chevron-down-outline"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>

            {showGender && (
              <View style={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 10,
                marginTop: 5,
                backgroundColor: "#fff",
              }}>
                {genderOptions.map((item, index) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setGender(item);
                      setShowGender(false);
                    }}
                    style={{
                      paddingVertical: 14,
                      paddingHorizontal: 15,
                      borderBottomWidth: index !== genderOptions.length - 1 ? 1 : 0,
                      borderBottomColor: "#eee",
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ProfileSetup2")}
            style={{
              alignSelf: "center",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/images/yellow.png")}
              style={{
                height: 60,
                width: 60,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

export default Profilesetup;