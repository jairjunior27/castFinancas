import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    marginTop: 45,
  },
  inputItem: {
    width: "100%",
    backgroundColor: "#ccc",
    marginVertical: 14,
    borderRadius: 5,
    padding: 12,
  },

  conteudoImagem: {
    flexDirection: "row",
    alignItems: "center",
  },

  textImage: {
    marginLeft: 9,
    color: "#ccc",
  },

  conteudoButton: {
    backgroundColor: "#ccc",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginVertical: 40,
  },
  textError: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#E1494A",
    padding: 5 ,
    borderRadius: 10,
  },
  containerPreview: {
    alignItems: "center",
    justifyContent: "center",
  },
  conteudoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  preview: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 50,
    marginTop: 10,
  },
  erroImagem: {
    justifyContent: "center",
    alignItems: "center",
  },
  textoErroImagem: {
    color: "#fff",
    padding: 5 ,
    borderRadius: 10
  },
});
