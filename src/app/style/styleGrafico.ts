import { StyleSheet, Dimensions, Platform } from "react-native";
const { width } = Dimensions.get("window");

export const styleGrafico = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
   
  },

  containerGrafico: {
    margin: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },

  titleLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
   marginVertical: 20
  },
  titleLogo1: {
    color: "rgb(112, 112, 112)",
    marginLeft: 5,
    fontSize: 30,
  },
  titleLogo2: {
    color: "rgb(161, 163, 39)",
    marginLeft: 5,
    fontSize: 30,
  },
  Picker: {
    width: width * 0.4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(116, 150, 140, 0.99)",
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#ddd",
    color: "#fff",
    marginHorizontal: 10,
    borderRadius: 10
  },
  pickerText: {
   backgroundColor: "rgba(116, 150, 140, 0.99)",
    fontSize: 14,
    color: "#fff",
   
   
  },

  data: {
    flexDirection: "row",
     justifyContent: "space-between",
     alignItems: "center"
  },

  textoButtom: {
    color: "#fff",
  },

  button: {
    backgroundColor: "rgba(116, 150, 140, 0.99)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    width: width * .7
  },

  buttomContainer:{
    justifyContent: "center",
    alignItems: "center"
  }
});
