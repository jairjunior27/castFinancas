import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },

  container1: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
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
    borderRadius: 50,
  },
  label: {
    fontSize: 11,
    color: "rgb(12, 12, 12)",
  },

  title: {
    fontSize: 14,
    color: "rgb(46, 34, 34)",
    maxWidth: 140,
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
    fontWeight: "bold",
  },

  edite: {
    marginRight: 24,
  },
});
