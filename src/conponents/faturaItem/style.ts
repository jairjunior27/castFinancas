import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal:10,
    borderRadius: 8,
    marginVertical: 10,

  },
  iconTexto: {
    flexDirection: "row",
    alignItems: "center"
  },
  valorVencimento: {
   alignItems: "center",
  },
  titulo:{
    marginHorizontal: 10,
    color:"rgb(70, 62, 62)",
    fontSize:16,
    fontWeight: "500",
    maxWidth: 120
  },
  tituloValorData:{
   color: "#081a2c",
   fontSize: 11,
   justifyContent: "flex-end",
  
  }
});
