import "../../helps/locale";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { styleTransacoes } from "../style/style.transacoes";
import { Feather } from "@expo/vector-icons";
import { transacoesType } from "@/types/transacoes";
import { DespesasHelps } from "@/helps/despesasHelp";
import { ReceitasHelps } from "@/helps/receitasHelps";
import { TransacoesItem } from "@/conponents/transacoesItem";
import { ContextTransacao } from "@/globalContext/transacoes/context";

export default function Page() {
  const [dataSelecionada, setDataSelecionada] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [transacaoEditando, setTransacaoEditando] =
    useState<transacoesType | null>(null);
  const [mesSelecionado, setMesSelecionado] = useState<string>(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const transacoes = useContext(ContextTransacao);

  useEffect(() => {
    transacoes?.loadTransacoes();
  }, []);

  const transacoesFiltradas = transacoes?.transacoes.filter((t) => {
    const data = new Date(t.data);
    const dataFormatada = data.toISOString().split("T")[0];
    const mesAno = `${data.getFullYear()}-${String(
      data.getMonth() + 1
    ).padStart(2, "0")}`;

    if (dataSelecionada) {
      return dataSelecionada === dataFormatada;
    }
    return mesAno === mesSelecionado;
  });
  const datasSelecionadas = transacoes?.transacoes.reduce((acc, transacao) => {
    const data = new Date(transacao.data);
    const dataFormatada = data.toISOString().split("T")[0];
    const mesAnoTransacao = `${data.getFullYear()}-${String(
      data.getMonth() + 1
    ).padStart(2, "0")}`;
    if (mesAnoTransacao === mesSelecionado) {
      acc[dataFormatada] = {
        marked: true,
        dotColor: "rgb(252, 164, 1)",
        selected: dataSelecionada === dataFormatada,
        selectedColor:
          dataSelecionada === dataFormatada ? "rgb(24, 110, 160)" : undefined,
      };
    }
    return acc;
  }, {} as Record<string, any>);

  const editarTransacao = async (transacao: transacoesType) => {
    setTransacaoEditando(transacao);
    setIsModal(true);
  };

  const handleEdite = async (t: transacoesType) => {
    await transacoes?.editarTransacao(t);
    setIsModal(false);
  };

  const handleDelete = async (id: number) => {
    await transacoes?.deletarTransacao(id);
  };

  return (
    <View style={styleTransacoes.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styleTransacoes.containerIndex}>
        <View style={styleTransacoes.calendario}>
          <Calendar
            headerStyle={{
              borderBottomWidth: 0.5,
              borderBottomColor: "rgba(0,0,0,.5)",
            
             
            }}
            onDayPress={(day: any) => setDataSelecionada(day.dateString)}
            onMonthChange={(month: any) => {
              setMesSelecionado(
                `${month.year}-${String(month.month).padStart(2, "0")}`
              );
              setDataSelecionada("");
            }}
            hideExtraDays={true}
            markedDates={datasSelecionadas}
            theme={{
              textMonthFontSize: 18,
              todayTextColor: "rgb(10, 22, 196)",
              textDayFontWeight: "bold",
              monthTextColor: "rgb(20, 20, 20)",
              selectedDayBackgroundColor: "rgb(226, 174, 2)",
              selectedDayTextColor: "rgb(231, 243, 229)",
              calendarBackground: "transparent",
              textDayStyle: { color: "#111" },
              arrowStyle: {
                margin: 0,
                padding: 0,
              },
              textSectionTitleColor: "rgb(37, 37, 37)",

            }}
          />
        </View>
       <Text style={styleTransacoes.textoTransacao}>Transações</Text>
        <View style={styleTransacoes.containerTransacoes}>
          <FlatList
            contentContainerStyle={{ paddingBottom: 60 }}
            data={transacoesFiltradas}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => {
              const cor =
                DespesasHelps.find((i) => i.icon === item.icon)?.cor ||
                ReceitasHelps.find((j) => j.icon === item.icon)?.color ||
                "";

              return (
                <TransacoesItem
                  data={item.data}
                  icon={item.icon}
                  label={item.tipo}
                  title={item.title}
                  valor={item.valor}
                  key={item.id}
                  color={cor}
                  onEdit={() => editarTransacao(item)}
                  onDelete={() => handleDelete(item.id)}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Modal visible={isModal} animationType="slide">
        <View style={styleTransacoes.containerModal}>
          <View style={styleTransacoes.headerModal}>
            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Feather
                name="chevron-left"
                size={22}
                style={styleTransacoes.iconBack}
                color="#ccc"
              />
            </TouchableOpacity>
            <Text style={styleTransacoes.textoModalHeader}>
              Editar Transação
            </Text>
          </View>

          <View style={styleTransacoes.titleLogo}>
            <Feather name="trending-up" size={32} color="#40F313" />
            <Text style={styleTransacoes.titleLogo1}>Cast</Text>
            <Text style={styleTransacoes.titleLogo2}>Finanças</Text>
          </View>
          <TextInput
            value={transacaoEditando?.title || ""}
            onChangeText={(text) =>
              setTransacaoEditando((prev) =>
                prev ? { ...prev, title: text } : null
              )
            }
            style={styleTransacoes.input}
          />

          <TextInput
            value={
              transacaoEditando?.valor ? transacaoEditando.valor.toString() : ""
            }
            keyboardType="numeric"
            onChangeText={(text) =>
              setTransacaoEditando((prev) =>
                prev ? { ...prev, valor: text === "" ? 0 : Number(text) } : null
              )
            }
            style={styleTransacoes.input}
          />
          <TouchableOpacity
            style={styleTransacoes.button}
            onPress={() => transacaoEditando && handleEdite(transacaoEditando)}
          >
            <Text>Editar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
