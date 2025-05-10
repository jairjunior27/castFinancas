import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    backgroundColor: "rgb(255, 253, 253)",
    paddingVertical: 6,
    paddingHorizontal:10,
    borderRadius: 8,
    marginBottom: 20
  },
  iconTexto: {
    flexDirection: "row",
    alignItems: "center"
  },
  valorVencimento: {
   alignItems: "flex-end",
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
