import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import RadialGradient from "react-native-radial-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import {widthPercentageToDP as W, heightPercentageToDP as H} from "react-native-responsive-screen";

const CompanyAdmin = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    
    // Form data states
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // Error states
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validation functions
    const validateFullName = (name) => {
        if (!name.trim()) return "Full name is required";
        if (name.trim().length < 2) return "Full name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(name)) return "Full name can only contain letters and spaces";
        return "";
    };

    const validateCompanyName = (name) => {
        if (!name.trim()) return "Company name is required";
        if (name.trim().length < 2) return "Company name must be at least 2 characters";
        return "";
    };

    const validateCompanyEmail = (email) => {
        if (!email.trim()) return "Company email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validateCompanySize = (size) => {
        if (!size.trim()) return "Company size is required";
        const sizeRegex = /^(\d+-\d+|\d+\+|\d+)$/;
        if (!sizeRegex.test(size)) return "Please enter valid company size (e.g., 50-200, 100+, 50)";
        return "";
    };

    const validatePassword = (pwd) => {
        if (!pwd) return "Password is required";
        if (pwd.length < 6) return "Password must be at least 6 characters";
        if (!/(?=.*[A-Z])/.test(pwd)) return "Password must contain at least one uppercase letter";
        if (!/(?=.*[a-z])/.test(pwd)) return "Password must contain at least one lowercase letter";
        if (!/(?=.*[0-9])/.test(pwd)) return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*])/.test(pwd)) return "Password must contain at least one special character (!@#$%^&*)";
        return "";
    };

    const validateConfirmPassword = (pwd, confirmPwd) => {
        if (!confirmPwd) return "Please confirm your password";
        if (pwd !== confirmPwd) return "Passwords do not match";
        return "";
    };

    const validateTermsAndConditions = () => {
        if (!isChecked) return "You must agree to the Terms & Conditions";
        return "";
    };

    // Real-time validation handlers
    const handleFullNameChange = (text) => {
        setFullName(text);
        const error = validateFullName(text);
        setErrors(prev => ({ ...prev, fullName: error }));
    };

    const handleCompanyNameChange = (text) => {
        setCompanyName(text);
        const error = validateCompanyName(text);
        setErrors(prev => ({ ...prev, companyName: error }));
    };

    const handleCompanyEmailChange = (text) => {
        setCompanyEmail(text);
        const error = validateCompanyEmail(text);
        setErrors(prev => ({ ...prev, companyEmail: error }));
    };

    const handleCompanySizeChange = (text) => {
        setCompanySize(text);
        const error = validateCompanySize(text);
        setErrors(prev => ({ ...prev, companySize: error }));
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        const error = validatePassword(text);
        setErrors(prev => ({ ...prev, password: error }));
        
        // Also re-validate confirm password if it exists
        if (confirmPassword) {
            const confirmError = validateConfirmPassword(text, confirmPassword);
            setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
        }
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        const error = validateConfirmPassword(password, text);
        setErrors(prev => ({ ...prev, confirmPassword: error }));
    };

    const handleTermsChange = () => {
        setIsChecked(!isChecked);
        if (errors.terms) {
            setErrors(prev => ({ ...prev, terms: "" }));
        }
    };

    // Submit handler
    const handleSignUp = async () => {
        // Validate all fields
        const fullNameError = validateFullName(fullName);
        const companyNameError = validateCompanyName(companyName);
        const companyEmailError = validateCompanyEmail(companyEmail);
        const companySizeError = validateCompanySize(companySize);
        const passwordError = validatePassword(password);
        const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
        const termsError = validateTermsAndConditions();

        const newErrors = {
            fullName: fullNameError,
            companyName: companyNameError,
            companyEmail: companyEmailError,
            companySize: companySizeError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
            terms: termsError,
        };

        setErrors(newErrors);

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== "");
        
        if (hasErrors) {
            // Show first error in alert
            const firstError = Object.values(newErrors).find(error => error !== "");
            Alert.alert("Validation Error", firstError);
            return;
        }

        // Proceed with sign up
        setIsLoading(true);
        
        try {
            // Simulate API call
            // const response = await api.signUp({
            //     fullName,
            //     companyName,
            //     companyEmail,
            //     companySize,
            //     password,
            // });
            
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success - navigate to next screen
            Alert.alert(
                "Success",
                "Account created successfully!",
                [
                    {
                        text: "OK",
                        onPress: () => props.navigation.navigate('MoodSelection')
                    }
                ]
            );
            
        } catch (error) {
            Alert.alert("Error", "Failed to create account. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View>
                <Image source={require("../../assets/images/Splashbackground.jpg")}
                    style={{ height: 700, width: 400 }}
                />

                {/* Purple Glow */}
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
                        top: H("10%"),
                        alignSelf: "center",
                        width: W("100%"),
                        height: H("100%"),
                        borderRadius: H("20%"),
                    }}
                />
                
                <View style={{ flexDirection: "row", position: "absolute" }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="arrow-back" size={20} color="white" style={{ top: 20, left: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Roleselection')}>
                        <Entypo name="cross" size={20} color="white" style={{ top: 20, left: 300 }} />
                    </TouchableOpacity>
                </View>

                {/* Header */}
                <Text
                    style={{
                        color: "white",
                        position: "absolute",
                        top: 40,
                        alignSelf: "center",
                        fontSize: 30,
                        fontWeight: "bold",
                    }}
                >
                    Create Account
                </Text>

                <Text
                    style={{
                        color: "white",
                        position: "absolute",
                        top: 90,
                        alignSelf: "center",
                        fontSize: 15,
                        fontStyle: "italic",
                        textAlign: "center",
                    }}
                >
                    Set up your Company on {"\n"}Planet Care
                </Text>

                {/* White Form Card */}
                <View
                    style={{
                        backgroundColor: "white",
                        height: "auto",
                        width: W("100%"),
                        position: "absolute",
                        top: H("23%"),
                        borderRadius: 30,
                        alignSelf: "center",
                        paddingBottom: 30,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            alignSelf: "center",
                            fontWeight: "900",
                            marginTop: 20,
                        }}
                    >
                        Sign Up
                    </Text>

                    {/* Full Name */}
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                width: W("70%"),
                            }}
                        >
                            <Icon name="user" size={12} color="black" />
                            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 12 }}>Full Name</Text>
                        </View>
                        <TextInput
                            style={{
                                alignSelf: "center",
                                borderBottomWidth: 1,
                                borderColor: errors.fullName ? "red" : "rgba(217, 217, 217, 1)",
                                width: W("70%"),
                                fontSize: 13,
                                bottom: 5,
                                paddingVertical: 5,
                            }}
                            placeholder="Daniel Park"
                            value={fullName}
                            onChangeText={handleFullNameChange}
                        />
                        {errors.fullName ? (
                            <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 2 }}>
                                {errors.fullName}
                            </Text>
                        ) : null}
                    </View>

                    {/* Company Name */}
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                width: W("70%"),
                            }}
                        >
                            <Icon name="building-o" size={12} color="black" />
                            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 12 }}>Company Name</Text>
                        </View>
                        <TextInput
                            style={{
                                alignSelf: "center",
                                borderBottomWidth: 1,
                                borderColor: errors.companyName ? "red" : "rgba(217, 217, 217, 1)",
                                width: W("70%"),
                                fontSize: 13,
                                bottom: 5,
                                paddingVertical: 5,
                            }}
                            placeholder="Planet Care Inc."
                            value={companyName}
                            onChangeText={handleCompanyNameChange}
                        />
                        {errors.companyName ? (
                            <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 2 }}>
                                {errors.companyName}
                            </Text>
                        ) : null}
                    </View>

                    {/* Company Email */}
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                width: W("70%"),
                            }}
                        >
                            <Icon name="envelope" size={12} color="black" />
                            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 12 }}>Company Email</Text>
                        </View>
                        <TextInput
                            style={{
                                alignSelf: "center",
                                borderBottomWidth: 1,
                                borderColor: errors.companyEmail ? "red" : "rgba(217, 217, 217, 1)",
                                width: W("70%"),
                                fontSize: 13,
                                bottom: 5,
                                paddingVertical: 5,
                            }}
                            placeholder="example@gmail.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={companyEmail}
                            onChangeText={handleCompanyEmailChange}
                        />
                        {errors.companyEmail ? (
                            <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 2 }}>
                                {errors.companyEmail}
                            </Text>
                        ) : null}
                    </View>

                    {/* Company Size */}
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                width: W("70%"),
                            }}
                        >
                            <Ionicons name="people" size={12} color="black" />
                            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 12 }}>Company Size</Text>
                        </View>
                        <TextInput
                            style={{
                                alignSelf: "center",
                                borderBottomWidth: 1,
                                borderColor: errors.companySize ? "red" : "rgba(217, 217, 217, 1)",
                                width: W("70%"),
                                fontSize: 13,
                                bottom: 5,
                                paddingVertical: 5,
                            }}
                            placeholder="50-200"
                            value={companySize}
                            onChangeText={handleCompanySizeChange}
                        />
                        {errors.companySize ? (
                            <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 2 }}>
                                {errors.companySize}
                            </Text>
                        ) : null}
                    </View>

                    {/* Password */}
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                width: W("70%"),
                            }}
                        >
                            <Icon name="lock" size={12} color="black" />
                            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 13 }}>Set Password</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderColor: errors.password ? "red" : "rgba(217, 217, 217, 1)",
                                width: W("70%"),
                                alignSelf: "center",
                            }}
                        >
                            <TextInput
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 5,
                                    paddingVertical: 15,
                                    fontSize: 13,
                                }}
                                placeholder="Enter password"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={handlePasswordChange}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Icon
                                    name={showPassword ? "eye-slash" : "eye"}
                                    size={13}
                                    color="#888"
                                    style={{ marginRight: 8 }}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password ? (
                            <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 2 }}>
                                {errors.password}
                            </Text>
                        ) : null}
                    </View>

                    {/* Confirm Password */}
                    <View style={{ marginTop: 10 }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "center",
                                width: W("70%"),
                            }}
                        >
                            <Icon name="lock" size={12} color="black" />
                            <Text style={{ fontWeight: "bold", marginLeft: 8, fontSize: 13 }}>Confirm Password</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderColor: errors.confirmPassword ? "red" : "rgba(217, 217, 217, 1)",
                                width: W("70%"),
                                alignSelf: "center",
                            }}
                        >
                            <TextInput
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 5,
                                    paddingVertical: 15,
                                    fontSize: 13,
                                }}
                                placeholder="Confirm password"
                                secureTextEntry={!showConfirmPassword}
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Icon
                                    name={showConfirmPassword ? "eye-slash" : "eye"}
                                    size={13}
                                    color="#888"
                                    style={{ marginRight: 8 }}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword ? (
                            <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 2 }}>
                                {errors.confirmPassword}
                            </Text>
                        ) : null}
                    </View>

                    {/* Terms & Conditions */}
                    <View style={{
                        flexDirection: "row",
                        alignSelf: "center",
                        marginTop: 15,
                    }}>
                        <TouchableOpacity
                            onPress={handleTermsChange}
                            style={{
                                width: 15,
                                height: 15,
                                borderWidth: 1.5,
                                borderColor: errors.terms ? "red" : "#555",
                                justifyContent: "center",
                                alignItems: "center",
                                marginRight: 4,
                                borderRadius: 4,
                            }}
                        >
                            {isChecked && (
                                <Text style={{ textAlignVertical: "center", fontSize: 10, color: "white", backgroundColor: "rgba(143, 0, 255, 1)", width: 15, textAlign: "center", height: 15 }}>✔</Text>
                            )}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 13 }}>Agree with </Text>
                        <TouchableOpacity>
                            <Text style={{ color: "blue", textDecorationLine: "underline", fontSize: 13 }}>
                                Terms & Conditions
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {errors.terms ? (
                        <Text style={{ color: "red", fontSize: 11, alignSelf: "center", marginTop: 5 }}>
                            {errors.terms}
                        </Text>
                    ) : null}

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={{
                            alignSelf: "center",
                            marginTop: 15,
                            backgroundColor: "rgba(255, 215, 0, 1)",
                            height: 35,
                            width: 250,
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                            opacity: isLoading ? 0.7 : 1,
                        }}
                        onPress={handleSignUp}
                        disabled={isLoading}
                    >
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            alignSelf: "center",
                            marginTop: 15,
                            width: 250,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "rgba(217, 217, 217, 1)",
                                marginRight: 8,
                            }}
                        />
                        <Text style={{ color: "gray", fontSize: 12, textAlign: "center" }}>
                            or sign up with
                        </Text>
                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: "rgba(217, 217, 217, 1)",
                                marginLeft: 8,
                            }}
                        />
                    </View>

                    {/* Social Icons */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 15,
                            marginTop: 15,
                        }}
                    >
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/icons/google.png")}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../../assets/icons/facebook.png")}
                                style={{ height: 20, width: 20 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
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
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ color: "gray" }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('Login1')}>
                            <Text
                                style={{
                                    color: "rgba(0, 153, 255, 1)",
                                    fontSize: 11,
                                    textDecorationLine: "underline",
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CompanyAdmin;