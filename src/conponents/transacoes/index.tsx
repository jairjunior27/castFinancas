import { FlatList, Text, View } from "react-native";
import { style } from "./style";
import { useContext } from "react";

import { TransacoesItem } from "../transacoesItem";
import { FormatData } from "@/helps/formatData";
import { DespesasHelps } from "@/helps/despesasHelp";
import { ReceitasHelps } from "@/helps/receitasHelps";
import { ContextTransacao } from "@/globalContext/transacoes/context";

export const Transacoes = () => {
  const transacoes = useContext(ContextTransacao);

  const transacoesFiltradas =
    transacoes?.transacoes.filter((t) => {
      const data = new Date();
      const mesAtual = data.getMonth() + 1;
      const anoAtual = data.getFullYear();

      const [dia, mes, ano] = FormatData(t.data).split("/").map(Number);
      return mesAtual === mes && ano === anoAtual;
    }) ?? [];


  return (
    <View style={style.container}>
      <Text style={style.textoTrnsacoes}>Últimas Transações</Text>

      {transacoes?.transacoes.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#fff" }}>
          Nenhuma transação encontrada
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 40 }}
          data={transacoesFiltradas.slice(-4).reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const cor =
              DespesasHelps.find((i) => i.icon === item.icon)?.cor ||
              ReceitasHelps.find((j) => j.icon === item.icon)?.color ||
              "";

            return (
              <TransacoesItem
                data={item.data}
                icon={item.icon}
                title={item.title}
                valor={item.valor}
                color={cor}
                label={item.tipo}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};
