import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
    justifyContent: "space-between",
  },
  formContainer: {
    marginVertical: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  inputData: {
    flexDirection: "row",
    backgroundColor: "rgba(164, 165, 88, 0.77)",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  textInputData: {
    marginLeft: 10,
    color: "rgba(255, 255, 255, 0.99)",
  },
  buttom: {
    width: "100%",
    backgroundColor: "rgba(227, 231, 2, 0.77)",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  textoMsg: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.99)",
  },
  textButtom: {
    color: "rgba(255, 255, 255, 0.99)",
  },
});
