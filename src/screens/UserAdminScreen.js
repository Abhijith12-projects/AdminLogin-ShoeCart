import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const UserAdminScreen = () => {
  const navigation = useNavigation();

  const userPressHandler = () => {
    console.log("user pressed");
    navigation.navigate("UserLogin");
  };
  const adminPressHandler = () => {
    console.log("admin pressed");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Login method</Text>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <CustomButton title="User Login" onPress={userPressHandler} />
        </View>
        <View style={styles.btn}>
          <CustomButton title="Admin Login" onPress={adminPressHandler} />
        </View>
      </View>
    </View>
  );
};

export default UserAdminScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold" },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: "80%",
    marginVertical: 10,
    marginLeft: 50,
  },
});
