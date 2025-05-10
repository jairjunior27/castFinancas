// stylePerfil.ts
import { StyleSheet } from "react-native";

export const stylePerfil = StyleSheet.create({
  container: {
    backgroundColor: "#2B2B2B",
    flex: 1,
    justifyContent: "center",
  },
  containerPerfil: {
    margin: 20,
  },
  profileBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },

  imageBox: {
    position: "relative",
    marginBottom: 16,
  },
  iconBack: {
    backgroundColor: "rgb(255, 255, 255)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center", 
    marginBottom: 40,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "rgb(200, 201, 168)",
    backgroundColor: "#ccc",
  },

  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4a90e2",
    padding: 6,
    borderRadius: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    color: "rgb(145, 167, 48)",
    maxWidth: 300
  },

  info: {
    fontSize: 16,
    color: "rgb(24, 24, 24)",
    marginBottom: 4,
  },

  editButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },

  editText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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

  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  rodape: {
    position: "absolute",
    bottom: 10,
    fontSize: 12,
    color: "#aaa",
    textAlign: "center",
  },
});
