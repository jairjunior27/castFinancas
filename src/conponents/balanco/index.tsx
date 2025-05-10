import { Text, View } from "react-native";
import { style } from "./style";
import { useContext, useEffect, useState } from "react";
import { FormatData } from "@/helps/formatData";
import { ContextTransacao } from "@/globalContext/transacoes/context";
import { formatarMoeda } from "@/helps/formatValor";
import { FormatDinheiroBr } from "@/helps/formatDinheiro";

export const Balanco = () => {
  const [total, setTotal] = useState<number>(0);
  const [entrada, setEntrada] = useState<number>(0);
  const [saida, setSaida] = useState<number>(0);

  const transacoes = useContext(ContextTransacao);

  const loadBalanco = async () => {
    const transacoesFiltradas =
      transacoes?.transacoes.filter((t) => {
        const data = new Date();
        const mesAtual = data.getMonth() + 1;
        const anoAtual = data.getFullYear();

        const [dia, mes, ano] = FormatData(t.data).split("/").map(Number);

        return mes === mesAtual && ano === anoAtual;
      }) ?? [];

    const totalEntradas =
      transacoesFiltradas
        .filter((i) => i.tipo === "Entrada")
        .reduce((acc, item) => acc + item.valor, 0) ?? 0;

    const totalSaidas =
      transacoesFiltradas
        .filter((i) => i.tipo === "Saida")
        .reduce((acc, item) => acc + item.valor, 0) ?? 0;
    setEntrada(totalEntradas);
    setSaida(totalSaidas);
    setTotal(totalEntradas - totalSaidas);
  };

  useEffect(() => {
    loadBalanco();
  }, [transacoes]);
  return (
    <View style={style.container}>
      <View style={style.entradasSaidas}>
        <View>
          <Text style={style.textEntrada}>Entradas</Text>
          <Text>{FormatDinheiroBr(entrada)}</Text>
        </View>
        <View>
          <Text style={style.textSaida}>Saidas</Text>
          <Text>{FormatDinheiroBr(saida)}</Text>
        </View>
      </View>
      <View>
        <Text style={style.textTotal}>Total</Text>
        <Text style={total >= 0 ? style.entradas : style.saidas}>
          {FormatDinheiroBr(total)}
        </Text>
      </View>
    </View>
  );
};
