import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

type prop = {
  label: string;
  isSelected: boolean;
  onPressButtom: () => void;
};
export const ButtomItem = ({ label, onPressButtom,isSelected }: prop) => {
  return (
    <TouchableOpacity onPress={onPressButtom} style={isSelected ? style.Buttomselecionado : style.ButtomNaoSelecionado}>
      <Text style={isSelected ? style.textSelecionado : style.textNaoSelecionado}>{label}</Text>
    </TouchableOpacity>
  );
};
