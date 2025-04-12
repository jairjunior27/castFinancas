import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
export const style = StyleSheet.create({
  container: {
    minHeight: 200,
    height: height * 0.5,
  },
  textoTrnsacoes: {
    color: "#fff",
    fontWeight: "500",
  },
});
