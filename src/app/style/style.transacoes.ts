import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
export const styleTransacoes = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
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
    marginTop: height * 0.1,
    marginBottom: 20,
  },
  titleLogo1: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 30,
  },
  titleLogo2: {
    color: "#EEFF00",
    marginLeft: 5,
    fontSize: 30,
  },

  containerModal: {
    backgroundColor: "#2B2B2B",
    padding: 20,
    flex: 1,
  },
  containerTransacoes: {
    height: height * 0.5,
  },
  containerIndex: {
    margin: 20,
  },

  calendario: {
    marginTop: 30,
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
    backgroundColor: "#fff",
  },
  textoModalHeader: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },

  button: {
    backgroundColor: "rgba(199, 253, 3, 0.89)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 20
  },
});
