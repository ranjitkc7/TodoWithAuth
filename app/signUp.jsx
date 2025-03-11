import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("please enter valid email format"),
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

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  const [showpassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <View
      className="flex-1 items-center justify-start p-[1rem]
     bg-slate-300"
    >
      <Image
        source={require("../assets/signin.webp")}
        className="w-[300px] h-[300px] object-cover rounded-full"
      />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter your username"
            keyboardType={"default"}
            value={value}
            className=" p-2 mt-[-1rem] text-[1.1rem] mb-[0.5rem]
             text-gray-800 w-full h-[3rem] bg-white border
              border-gray-200 rounded-md"
            onBlur={() => {
              onBlur();
              trigger("name");
            }}
            onChangeText={(text) => {
              onChange(text);
              trigger("name");
            }}
          />
        )}
      />
      {errors.name && (
        <Text className="text-red-500 text-[10px]">{errors.name.message}</Text>
      )}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Enter your email"
            keyboardType={"email-address"}
            value={value}
            className=" p-2 mt-[-1rem] text-[1.1rem] mb-[0.5rem]
             text-gray-800 w-full h-[3rem] bg-white border
              border-gray-200 rounded-md"
            onBlur={() => {
              onBlur();
              trigger("email");
            }}
            onChangeText={(text) => {
              onChange(text);
              trigger("email");
            }}
          />
        )}
      />
      {errors.email && (
        <Text className="text-red-500 text-[10px]">{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-full relative flex-row">
            <TextInput
              placeholder="Enter your password"
              keyboardType={"password"}
              value={value}
              secureTextEntry={!showpassword}
              className=" p-2 mt-[-1rem] text-[1.1rem] mb-[0.5rem]
             text-gray-800 w-full h-[3rem] bg-white border
              border-gray-200 rounded-md"
              onBlur={() => {
                onBlur();
                trigger("password");
              }}
              onChangeText={(text) => {
                onChange(text);
                trigger("password");
              }}
            />
            <TouchableOpacity
              className="absolute right-[1rem] top-[1rem]` `"
              onPress={() => setShowpassword(!showpassword)}
            >
              {!showpassword ? (
                <Entypo name="eye" color="black" size={25} />
              ) : (
                <Entypo name="eye-with-line" color="black" size={25} />
              )}
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && (
        <Text className="text-red-500 text-[10px]">
          {errors.password.message}
        </Text>
      )}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="w-full relative flex-row">
            <TextInput
              placeholder="Re-type your password"
              keyboardType={"passowrd"}
              value={value}
              className=" p-2 mt-[-1rem] text-[1.1rem] mb-[0.5rem]
             text-gray-800 w-full h-[3rem] bg-white border
              border-gray-200 rounded-md"
              onBlur={() => {
                onBlur();
                trigger("confirmPassword");
              }}
              onChangeText={(text) => {
                onChange(text);
                trigger("confirmPassword");
              }}
            />
            <TouchableOpacity
              className="absolute right-[1rem] top-[1rem]"
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showpassword ? (
                <Entypo name="eye" color="black" size={25} />
              ) : (
                <Entypo name="eye-with-line" color="black" size={25} />
              )}
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.confirmPassword && (
        <Text className="text-red-500 text-[10px]">
          {errors.confirmPassword.message}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        className="w-full h-[3rem] justify-center items-center
       bg-purple-600 mt-[1rem] rounded-md"
      >
        <Text className="text-[1.5rem] font-[700] text-white">Sign Up</Text>
      </TouchableOpacity>
      <View className="flex-row mt-[1rem]">
        <Text>If you have already any account Please,</Text>
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
