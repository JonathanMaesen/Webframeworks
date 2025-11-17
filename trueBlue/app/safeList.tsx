import { StyleSheet, Text, View } from "react-native";

export default function safeList(){
  return (
    <View
      style={styles.container}
    >
      <Text>SafeList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});
