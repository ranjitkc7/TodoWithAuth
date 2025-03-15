import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import "../global.css";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          Alert.alert("Logged in successfully!");
          router.push("/todo");
          setEmail("");
          setPassword("");
        } else {
          setErrors("Please verify your email to continue.");
          Alert.alert("Please verify your email to continue.");
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View
      className="flex-1 items-center justify-start p-[1rem]
     bg-slate-300"
    >
      <Image
        source={require("../assets/login.webp")}
        className="w-[300px] h-[300px] object-cover rounded-full"
      />
      <TextInput
        placeholder="Enter your email"
        keyboardType={"email-address"}
        value={email}
        onChangeText={setEmail}
        className="mt-2 p-2 text-[1.1rem] mb-[1rem] text-gray-800 w-full h-[3rem] bg-white border border-gray-200 rounded-md"
      />
      <View className="w-full flex-row relative">
        <TextInput
          placeholder="Enter your password"
          keyboardType={"password"}
          value={password}
          secureTextEntry={!showpassword}
          onChangeText={setPassword}
          className="mt-1 p-2 text-[1.1rem] text-gray-800 w-full h-[3rem]
           bg-white border border-gray-200 rounded-md"
        />
        <TouchableOpacity
          className="absolute right-[1rem] top-[1rem]"
          activeOpacity={0.8}
          onPress={() => setShowpassword(!showpassword)}
        >
          {!showpassword ? (
            <Entypo name="eye" color="black" size={25} />
          ) : (
            <Entypo name="eye-with-line" color="black" size={20} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleLogIn}
        activeOpacity={0.8}
        className="w-full h-[3rem] justify-center items-center
       bg-purple-600 mt-[1rem] rounded-md"
      >
        <Text className="text-[1.5rem] font-[700] text-white">Log In</Text>
      </TouchableOpacity>
      <View className="flex-row mt-[1rem]">
        <Text>If you have not any account Please,</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/signUp")}
        >
          <Text className="text-purple-600 text-[1.1rem] font-[600]">
            {" "}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
