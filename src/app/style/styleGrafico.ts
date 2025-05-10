import { StyleSheet, Dimensions, Platform } from "react-native";
const { width } = Dimensions.get("window");

export const styleGrafico = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)",
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 40,
    marginBottom: 70,
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
    backgroundColor: "rgb(33, 134, 173)",
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: "#ddd",
    color: "#fff",
    marginHorizontal: 10,
  },
  pickerText: {
   
    fontSize: 14,
    color: "#111",
   
  },

  data: {
    flexDirection: "row",
     justifyContent: "space-between"
  },

  textoButtom: {
    color: "#fff",
  },

  button: {
    backgroundColor: "rgb(33, 134, 173)",
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
