import { FaturaType } from "@/types/faturaType";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { FormatData } from "@/helps/formatData";
import { FormatDinheiroBr } from "@/helps/formatDinheiro";



type prop = {
    fatura: FaturaType
    onDelete: (id: number) => void
}
export const FaturaItem = ({ fatura,onDelete }: prop) => {
  return (
    <View style={style.container}>
      <View style={style.iconTexto}>
        <Feather name="file-text" size={24} color="#02a1ac" />
        <Text style={style.titulo} numberOfLines={1} ellipsizeMode="tail">{fatura.titulo}</Text>
      </View>
      <View style={style.valorVencimento}>
        <Text style={style.tituloValorData}>{` ${FormatDinheiroBr(
          fatura.valor
        )}`}</Text>
        <Text style={style.tituloValorData}>{`${FormatData(
          new Date(fatura.data).toISOString()
        )}`}
        
        </Text>
      
      </View>
      <TouchableOpacity onPress={()=> onDelete(fatura.id)}>
          <Feather name="trash" size={20} color="rgba(133, 77, 77, 0.9)" />
        </TouchableOpacity>
    </View>
  );
};
