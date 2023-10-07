import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification</Text>
      <View style={styles.notification}>
        <Text style={styles.notificationText}># No new notifications</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  notification: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  notificationText: {
    fontSize: 18,
  },
  viewButton: {
    marginTop: 8,
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default Notification;
