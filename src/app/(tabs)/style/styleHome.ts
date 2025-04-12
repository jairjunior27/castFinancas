import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
  },
  containerIndex: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  containerTextoImagem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoContainerImagemTexto: {
    color: "#fff",
    fontSize: 12,
  },
  adcionarTransacoes: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: "rgb(245, 241, 5)",
    borderRadius: 50,
    padding: 10,
  },

  titleSaudacoes: {
    flexDirection: "row",
  },
  titleNome: {
    fontSize: 14,
    color: "rgba(199, 253, 3, 0.89)",
    marginLeft: 7
  },

  titleLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  containerImagem: {
    width: 60,
    height: 60,
  },
  imagem: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 50,
  },
  containerModal: {
    backgroundColor: "#2B2B2B",
    margin: 20,
  },
  containerTransacao: {
    alignItems: "center",
    backgroundColor: "#fff",
  },

  iconBack: {
    backgroundColor: "#fff00f",
    padding: 10,
    borderRadius: 50,
  },
  textoTransacao: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});
