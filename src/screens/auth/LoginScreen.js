import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as W, heightPercentageToDP as H } from "react-native-responsive-screen";

const Login1 = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // ✅ Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) return "Email is required";
        if (!emailRegex.test(email)) return "Invalid email format";

        return "";
    };

    // ✅ Password validation
    const validatePassword = (password) => {
        if (!password.trim()) return "Password is required";
        if (password.length < 6) return "Minimum 6 characters required";

        return "";
    };

    // ✅ Handle email
    const handleEmailChange = (text) => {
        setEmail(text);
        setEmailError(validateEmail(text));
    };

    // ✅ Handle password
    const handlePasswordChange = (text) => {
        setPassword(text);
        setPasswordError(validatePassword(text));
    };

    // ✅ Form valid check
    const isFormValid =
        email &&
        password &&
        !validateEmail(email) &&
        !validatePassword(password);

    // ✅ Login handler
    const handleLogin = () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        const emailErr = validateEmail(trimmedEmail);
        const passErr = validatePassword(trimmedPassword);

        setEmailError(emailErr);
        setPasswordError(passErr);

        if (emailErr || passErr) {
            Alert.alert("Error", emailErr || passErr);
            return;
        }

        Alert.alert("Success", "Login Successful!");
        props.navigation.navigate("MainTabs", {
            screen: "Home"
        });
    };

    return (
        <View style={{ flex: 1, }}>
            <Image
                source={require("../../assets/images/Splashbackground.jpg")}
                style={{ height: H("100%"), width: W("100%") }}
            />

            <RadialGradient
                colors={[
                    "rgba(143, 0, 255, 1)",
                    "rgba(143, 0, 250, 0.6)",
                    "rgba(160, 80, 220, 0.2)",
                    "rgba(200, 120, 255, 0.0)",
                ]}
                stops={[0.1, 0.6, 0.9, 1]}
                center={[200, 200]}
                radius={200}
                style={{
                    position: "absolute",
                    top: H("15%"),
                    alignSelf: "center",
                    width: W("100%"),
                    height: H("45%"),
                    borderRadius: H("20%"),
                }}
            />

            {/* Header */}
            <Text style={{
                color: "white",
                position: "absolute",
                top: H("15%"),
                alignSelf: "center",
                fontSize: 40,
                fontWeight: "bold",
            }}>
                Login
            </Text>

            <Text style={{
                color: "white",
                position: "absolute",
                top: H("25%"),
                fontSize: 25,
                alignSelf: "center",
            }}>
                Hi Welcome back,
            </Text>
            <Text style={{
                color: "white",
                position: "absolute",
                top: H("29%"),
                fontSize: 25,
                alignSelf: "center",
            }}>
                you’ve been
            </Text>
            <Text style={{
                color: "white",
                position: "absolute",
                top: H("33%"),
                fontSize: 25,
                alignSelf: "center",
                fontStyle: "italic",
            }}>
                missed
            </Text>

            {/* Card */}
            <View style={{
                backgroundColor: "white",
                height: H("70%"),
                width: W("100%"),
                alignSelf: "center",

                position: "absolute",
                top: H("40%"),
                borderRadius: 30,
                paddingTop: 20,
            }}>
                <Text style={{
                    fontSize: 25,
                    alignSelf: "center",
                    fontWeight: "900",
                }}>
                    Login
                </Text>

                {/* Email */}
                <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>Email</Text>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderColor: emailError ? "red" : "#ccc",
                    }}>
                        <Icon name="envelope" size={12} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 10 }}
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={handleEmailChange}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {emailError ? (
                        <Text style={{ color: "red", fontSize: 11 }}>
                            {emailError}
                        </Text>
                    ) : null}
                </View>

                {/* Password */}
                <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>Password</Text>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderColor: passwordError ? "red" : "#ccc",
                    }}>
                        <Icon name="lock" size={14} />

                        <TextInput
                            style={{ flex: 1, marginLeft: 10 }}
                            placeholder="********"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={handlePasswordChange}
                        />

                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Icon name={showPassword ? "eye-slash" : "eye"} size={14} />
                        </TouchableOpacity>
                    </View>

                    {passwordError ? (
                        <Text style={{ color: "red", fontSize: 11 }}>
                            {passwordError}
                        </Text>
                    ) : null}
                </View>

                {/* Forgot */}
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("ForgotPassword")}
                    style={{ marginTop: 10, alignSelf: "flex-end", marginRight: 20 }}
                >
                    <Text style={{ color: "#0099ff", fontSize: 12 }}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                {/* Button */}
                <TouchableOpacity
                    disabled={!isFormValid}
                    onPress={handleLogin}
                    style={{
                        marginTop: 10,
                        alignSelf: "center",
                        opacity: isFormValid ? 1 : 0.5,
                    }}
                >
                    <Text style={{
                        backgroundColor: "gold",
                        height: H('5%'),
                        width: W('70%'),
                        textAlign: "center",
                        textAlignVertical: "center",
                        borderRadius: 10,
                        fontWeight: "bold",
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>



            {/* Divider */}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    // marginTop: 20,
                    width: 200,
                    alignSelf: "center",
                    position: "absolute",
                    top: H('85%'),
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        marginHorizontal: 10,
                    }}
                />
                <Text style={{ color: "gray", fontSize: 12 }}>or login with</Text>
                <View
                    style={{
                        flex: 1,
                        height: 1,
                        backgroundColor: "rgba(217, 217, 217, 1)",
                        marginHorizontal: 10,
                    }}
                />
            </View>



            {/* Social Icons */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 15,
                    marginTop: 25,
                    position: "absolute",
                    top: H('85%'),
                    alignSelf: "center",
                }}
            >
                <TouchableOpacity onPress={() => {
                    // Handle Google login
                    Alert.alert("Google login", "Coming soon!");
                }}>
                    <Image
                        source={require("../../assets/icons/google.png")}
                        style={{ height: 20, width: 20 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // Handle Facebook login
                    Alert.alert("Facebook login", "Coming soon!");
                }}>
                    <Image
                        source={require("../../assets/icons/facebook.png")}
                        style={{ height: 20, width: 20 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    // Handle Apple login
                    Alert.alert("Apple login", "Coming soon!");
                }}>
                    <Image
                        source={require("../../assets/icons/apple.png")}
                        style={{ height: 20, width: 20 }}
                    />
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 20,
                    position: "absolute",
                    bottom: 0,
                    alignSelf: "center",
                }}
            >
                <Text style={{ color: "gray", opacity: 0.7 }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                    <Text
                        style={{
                            color: "rgba(0, 153, 255, 1)",
                            fontSize: 11,
                            textDecorationLine: "underline",
                        }}
                    >
                        sign up
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default Login1;