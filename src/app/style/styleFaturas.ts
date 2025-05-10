import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
export const styleFaturas = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(54, 54, 54)",
    padding: 20
  },
  containerFaturas:{
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
  titleSaudacoes: {
    flexDirection: "row",
  },
  titleNome: {
    fontSize: 14,
    color: "rgba(199, 253, 3, 0.89)",
    marginLeft: 7,
    maxWidth: 250
  },
  titleLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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

  TextoFaturasAvencer:{
   textAlign: "center",
   fontSize: 20,
   color: "#ccc",
   marginBottom: 20
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

});
