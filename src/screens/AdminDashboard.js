import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { Image } from "react-native";
import Items from "../../tabs/Items";
import AddItems from "../../tabs/AddItems";
import Notification from "../../tabs/Notification";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab === 0 ? (
        <Items />
      ) : selectedTab === 1 ? (
        <AddItems />
      ) : (
        <Notification />
      )}
      <View style={styles.bottomView}>
        <Pressable style={styles.bottonTab} onPress={() => setSelectedTab(0)}>
          <Image
            style={[
              styles.bottonTabimg,
              { tintColor: selectedTab === 0 ? "#b76e07" : "black" },
            ]}
            source={require("../../images/items.png")}
          />
        </Pressable>
        <Pressable style={styles.bottonTab} onPress={() => setSelectedTab(1)}>
          <Image
            style={[
              styles.bottonTabimg,
              {
                width: 38,
                height: 38,
                tintColor: selectedTab === 1 ? "#b76e07" : "black",
              },
            ]}
            source={require("../../images/add.png")}
          />
        </Pressable>

        <Pressable style={styles.bottonTab} onPress={() => setSelectedTab(2)}>
          <Image
            style={[
              styles.bottonTabimg,
              { tintColor: selectedTab === 2 ? "#b76e07" : "black" },
            ]}
            source={require("../../images/notification.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default AdminDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#f2dabf",
  },
  bottonTab: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    alignContent: "center",
  },
  bottonTabimg: {
    height: 30,
    width: 30,
    marginLeft: 25,
  },
});
