import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      if (email === "admin@gmail.com" && password === "admin123") {
        await AsyncStorage.setItem("userToken", "valid_token_here");
        navigation.navigate("AdminDashboard");
        const data = await AsyncStorage.getItem("userToken");
        console.log(data);
      } else {
        Alert.alert(
          "Authentication failed!",
          "please check admin credentials or try after sometime"
        );
      }
    } catch (error) {
      console.error(error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Login</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Admin email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Enter Admin password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <Pressable style={styles.loginBtn} onPress={loginHandler}>
        <Text style={styles.textBtn}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 100,
    alignSelf: "center",
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: "80%",
  },
  loginBtn: {
    backgroundColor: "rgb(236, 176, 80)",
    width: "90%",
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
