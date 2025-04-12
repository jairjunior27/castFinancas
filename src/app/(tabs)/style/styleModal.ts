import { StyleSheet } from "react-native";

export const styleModal = StyleSheet.create({
  container: {
    backgroundColor: "#2B2B2B",
    flex: 1,
  },

  containerInTerno: {
    margin: 20,
  },

  headerModal: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBack: {
    marginRight: 10,
    padding: 4,
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgb(180, 164, 18)",
  },
  textoModalHeader: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  buttomSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 17,
   
  },
  
});
