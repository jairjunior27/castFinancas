import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

const statusHeaderBar = Constants.statusBarHeight;
const { width, height } = Dimensions.get("window");
export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
  },
  containerCadastro: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    alignContent: "center",
    justifyContent: "center",
  },
  containerIndex: {
    marginHorizontal: 20,
    marginTop: statusHeaderBar,
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

  containerImage: {
    width: width * 0.9,
    height: height * 0.5,
    alignContent: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  titleContainer: {},

  titleBemVindo: {
    color: "#ffff",
    fontSize: 18,
    textAlign: "center",
  },
});
