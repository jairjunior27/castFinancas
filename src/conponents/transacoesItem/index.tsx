import { Feather } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { FormatData } from "@/helps/formatData";
import { TransacoesProvider } from "@/globalContext/transacoes/provider";

type prop = {
  icon: any;
  title: string;
  valor: number;
  data: string;
  color: string;
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
};
export const TransacoesItem = ({
  icon,
  title,
  valor,
  data,
  color,
  label,
  onEdit,
  onDelete,
}: prop) => {
  const formattedValor =
    valor && !isNaN(valor)
      ? valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "Valor inválido";
  return (
    <TransacoesProvider>
      <View style={style.container}>
        <View style={style.container1}>
          <View style={style.containerIconText}>
            <View style={style.containerIconLabel}>
              <Feather name={icon} size={22} color={color} style={style.icon} />
              <Text style={style.label}>{label}</Text>
            </View>

            <Text style={style.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          </View>
          <View style={style.textData}>
            <Text
              style={label === "Saida" ? style.textDespesas : style.textReceita}
            >
              {formattedValor}
            </Text>
            <Text style={style.dataDespesas}>{FormatData(data)}</Text>
          </View>
        </View>
        {onDelete && onEdit && (
          <View style={style.container2}>
            <TouchableOpacity onPress={onEdit}>
              <Feather
                name="edit"
                size={20}
                color="rgba(218, 218, 218, 0.9)"
                style={style.edite}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={onDelete}>
              <Feather name="trash" size={20} color="rgba(133, 77, 77, 0.9)" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TransacoesProvider>
  );
};
