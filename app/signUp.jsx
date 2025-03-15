import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import "../global.css";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const SignUpPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (setter) => (value) => {
    setter(value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };
  const handeSignUp = (data) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
          .then(() => {
            Alert.alert(
              "User signed in successfully!",
              "Verification email sent"
            );
            router.push("");
          })
          .catch((error) => {
            Alert.alert("Error sending verification email: ", error.message);
          });
      })
      .catch((error) => {
        Alert.alert("Error creating user: ", error.message);
      });
    reset();
  };

  return (
    <View className="flex-1 items-center justify-start  p-[1rem] bg-slate-300">
      <Image
        source={require("../assets/signin.webp")}
        className="w-[300px] h-[300px] object-cover rounded-full"
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full mb-[0.5rem]">
              <TextInput
                placeholder="Enter your username"
                value={value}
                onBlur={onBlur}
                onChangeText={handleInputChange(onChange)}
                className="p-2 text-[1.1rem]  text-gray-800 w-full h-[3rem]
               bg-white border border-gray-200 rounded-md mt-[-2rem]"
              />
              {errors.name && (
                <Text className="text-red-500 mb-[0.5rem] text-[10px]">
                  {errors.name.message}
                </Text>
              )}
            </View>
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full mb-[0.5rem]">
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                value={value}
                onBlur={onBlur}
                onChangeText={handleInputChange(onChange)}
                className="p-2 text-[1.1rem]  text-gray-800 w-full h-[3rem] bg-white border border-gray-200 rounded-md"
              />
              {errors.email && (
                <Text className="text-red-500 mb-[0.2rem] text-[10px]">
                  {errors.email.message}
                </Text>
              )}
            </View>
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full relative flex-row mb-[0.5rem]">
              <TextInput
                placeholder="Enter your password"
                value={value}
                onBlur={onBlur}
                onChangeText={handleInputChange(onChange)}
                secureTextEntry={!showPassword}
                className="p-2 text-[1.1rem]  text-gray-800 w-full h-[3rem] bg-white border border-gray-200 rounded-md"
              />
              <TouchableOpacity
                className="absolute right-[1rem] top-[0.5rem]"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Entypo
                  name={showPassword ? "eye-with-line" : "eye"}
                  color="black"
                  size={25}
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-red-500 text-[10px] mb-[0.5rem]">
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <View className="w-full relative flex-row mb-[0.5rem]">
              <TextInput
                placeholder="Re-type your password"
                value={value}
                onBlur={onBlur}
                onChangeText={handleInputChange(onChange)}
                secureTextEntry={!showConfirmPassword}
                className="p-2 text-[1.1rem]  text-gray-800 w-full h-[3rem] bg-white border border-gray-200 rounded-md"
              />
              <TouchableOpacity
                className="absolute right-[1rem] top-[1rem]"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Entypo
                  name={showConfirmPassword ? "eye-with-line" : "eye"}
                  color="black"
                  size={25}
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text className="text-red-500 text-[10px]">
                {errors.confirmPassword.message}
              </Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(handeSignUp)}
        activeOpacity={0.8}
        className="w-full h-[3rem] justify-center items-center bg-purple-600 mt-[1rem] rounded-md"
      >
        <Text className="text-[1.5rem] font-[700] text-white">Sign Up</Text>
      </TouchableOpacity>

      <View className="flex-row mt-[1rem]">
        <Text>If you already have an account,</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <Text className="text-purple-600 text-[1.1rem] font-[700]">
            {" "}
            Log In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpPage;
