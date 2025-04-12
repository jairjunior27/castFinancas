import { FaturaType } from "@/types/faturaType"
import { Feather } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { style } from "./style"
import { FormatData } from "@/helps/formatData"

export const FaturaItem = ({titulo,valor,data}: FaturaType) =>{
    return(
        <View style={style.container}>
         <View style={style.iconTexto}><Feather name="file-text" size={24} color="#02a1ac" />
         <Text style={style.titulo}>{titulo}</Text></View>
       <View style={style.valorVencimento}>
       <Text style={style.tituloValorData}>{`Valor R$ ${valor.toFixed(2)}`}</Text>
       <Text style={style.tituloValorData}>{`vencimento ${FormatData(new Date(data).toISOString())}`}</Text>
       </View>
        </View>
    )
}