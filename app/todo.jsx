import { View, Text } from "react-native";
import React from "react";
import "../global.css";

const TodoFile = () => {
  const [task, setTask] = useState("");
  return (
    <View className="p-[8px] items-center justify-start">
      <TextInput
        placeholder="Enter your task"
        className="border-[1px] rounded-[12px] w-full h-[3rem] bg-white"
        value={task}
        onChangeText={setTask}
      />
    </View>
  );
};

export default TodoFile;
