import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    backgroundColor: "rgb(255, 255, 255)",
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },

  container1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center"
  },

  container2: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  containerIconText: {
    flexDirection: "row",
    alignItems: "center",
  },

  containerIconLabel: {
    alignItems: "center",
    marginRight: 20,
  },

  icon: {
    backgroundColor: "rgba(77, 77, 77, 0.14)",
    padding: 8,
    borderRadius: 50,
  },
  label: {
    fontSize: 11,
    color: "rgb(12, 12, 12)",
  },

  title: {
    fontSize: 14,
    color: "rgb(46, 34, 34)",
    maxWidth: 140
  },
  textData: {
    color: "rgb(206, 70, 70)",
    alignItems: "flex-end",
  },
  textDespesas: {
    color: "rgb(206, 70, 70)",
  },
  textReceita: {
    color: "rgb(8, 185, 67)",
  },
  dataDespesas: {
    color: "rgb(51, 49, 49)",
    fontSize: 10,
    fontWeight: "bold"
  },

  edite: {
    marginRight: 24,
  },

  
});
