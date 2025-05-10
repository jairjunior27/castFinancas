import { Feather } from "@expo/vector-icons";
import { StatusBar, Text, TextInput, View } from "react-native";
import { style } from "./style/styleIndexIntro";
import { SignupForm } from "../conponents/signupForm";

export default function Page() {
  return (
    <View style={style.containerCadastro}>
      <View style={style.containerIndex}>
        <View style={style.titleLogo}>
          <Feather name="trending-up" size={32} color="#40F313" />
          <Text style={style.titleLogo1}>Cast</Text>
          <Text style={style.titleLogo2}>Finanças</Text>
        </View>
        <SignupForm />
        <TextInput />
        <StatusBar
          barStyle="light-content"
          backgroundColor="trasparent"
          translucent={true}
        />
      </View>
    </View>
  );
}
