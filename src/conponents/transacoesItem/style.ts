import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    backgroundColor: "rgba(129, 129, 129, 0.19)",
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
    backgroundColor: "rgb(240, 238, 238)",
    padding: 8,
    borderRadius: 50,
  },
  label: {
    fontSize: 11,
    color: "rgb(155, 155, 155)",
  },

  title: {
    fontSize: 14,
    color: "rgb(218, 218, 218)",
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
    color: "rgb(212, 211, 211)",
    fontSize: 10,
  },

  edite: {
    marginRight: 24,
  },

  
});
