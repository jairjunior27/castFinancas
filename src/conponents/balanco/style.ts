import { StyleSheet, Platform } from "react-native";

export const style = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 40,
    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra Android
    elevation: 4,
  },
  entradasSaidas: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  textEntrada: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1E8449",
    marginBottom: 4,
  },
  entradas: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1E8449",
  },
  textSaida: {
    fontWeight: "600",
    fontSize: 16,
    color: "#C0392B",
    marginBottom: 4,
  },
  saidas: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#C0392B",
  },
  textTotal: {
    fontWeight: "600",
    fontSize: 18,
    color: "#2C3E50",
    marginBottom: 4,
  },
});
