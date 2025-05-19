import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
export const styleFaturas = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(235, 235, 235)",
  },

  conteudoHeader: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 16, 109, 0.6)",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  titleSaudacoes: {
    flexDirection: "row",
  },
  titleNome: {
    fontSize: 14,
    color: "rgba(248, 248, 248, 0.89)",
    marginLeft: 7,
    fontWeight: "bold",
    maxWidth: 130,
  },

  titleLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleLogo1: {
    color: "rgba(221, 221, 221, 0.89)",
    marginLeft: 5,
    fontSize: 30,
    fontWeight: 500,
  },
  titleLogo2: {
    color: "rgb(255, 255, 255)",
    marginLeft: 5,
    fontSize: 30,
    fontWeight: "bold",
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

  containerTextoImagem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  textoContainerImagemTexto: {
    color: "rgba(206, 200, 200, 0.84)",
    fontSize: 12,
  },
  containerFaturasAvencer: {
    padding: 20,
    maxHeight: height * .7
  },
  TextoFaturasAvencer: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "rgb(145, 143, 143)",
  },
  TextoTotalFaturas: {
    textAlign: "right",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
});
