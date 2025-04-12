import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  Buttomselecionado: {
    flex: 1,
    alignItems: "center",
    fontSize: 11,
    backgroundColor: "rgb(204, 191, 10)",

    marginHorizontal: 2,
    padding: 10,
    borderRadius: 8,
  },
  ButtomNaoSelecionado: {
    flex: 1,
    alignItems: "center",
    fontSize: 11,
    backgroundColor: "#fff",
    marginHorizontal: 2,
    padding: 10,
    borderRadius: 8,
  },
  textSelecionado: {
    color: "#fff",
  },
  textNaoSelecionado: {
    color: "#000",
  },
});
