import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
export const style = StyleSheet.create({
  container: {
   maxHeight: height * .4,
   marginBottom: 20

  },
  textoTrnsacoes: {
    color: "#111",
    fontWeight: "500",
    marginBottom:10
  },
});
