import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

type prop = {
  label: string;
  icon: any;
  isSelect: boolean
  onPress: () => void
};
export const SelectedIcon = ({ label, icon ,onPress, isSelect}: prop) => {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Feather name={icon} size={28} style={isSelect ? style.selecionado : style.naoSelecionado} />
      <Text style={[style.text, isSelect ? style.selecionado : style.naoSelecionado]}>{label}</Text>
    </TouchableOpacity>
  );
};
