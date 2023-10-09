import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const UserAdminScreen = () => {
  const navigation = useNavigation();

  const handleUserLogin = () => {
    navigation.navigate("UserLogin");
  };

  const handleAdminLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your sign in option</Text>
      <Pressable style={styles.button} onPress={handleUserLogin}>
        <Text style={styles.buttonText}>User Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleAdminLogin}>
        <Text style={styles.buttonText}>Admin Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#af0ccf",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  title: {
    fontSize: 20,
  },
});

export default UserAdminScreen;
