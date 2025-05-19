import { StyleSheet,Dimensions } from "react-native";
const {height: screenHeigth} = Dimensions.get("window")
export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(224, 224, 224)",
  },

  conteudoHeader:{
    paddingTop:40,
    paddingHorizontal: 20,
     height: screenHeigth * 0.36,
    backgroundColor: "rgba(0, 16, 109, 0.6)",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius:40

  },
  containerIndex: {
    margin: 20,
    flex:1 
  },
  containerTextoImagem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:12,
    marginBottom: 20
  },
  textoContainerImagemTexto: {
    color: "rgb(184, 184, 184)",
    fontSize: 12,
  },
  adcionarTransacoes: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
    backgroundColor: "rgba(0, 47, 255, 0.69)",
    borderRadius: 50,
    padding: 10,
  },

  titleSaudacoes: {
    flexDirection: "row",
  },
  titleNome: {
    fontSize: 14,
    color: "rgba(248, 248, 248, 0.89)",
    marginLeft: 7,
    fontWeight: "bold",
    maxWidth: 130
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
    fontWeight: 500
  },
  titleLogo2: {
    color: "rgb(255, 255, 255)",
    marginLeft: 5,
    fontSize: 30,
    fontWeight: "bold"
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
    color: "#111",
    fontSize: 14,
    textAlign: "center",
  },
});
