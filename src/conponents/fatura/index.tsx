import { useContext, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { salvarFatura } from "@/utils/faturaStorage";
import * as Notifications from "expo-notifications";
import { styleFatura } from "./style";
import { Feather } from "@expo/vector-icons";
import { useTransacoesDataBase } from "@/utils/dataBase/bancoSqlTransacao";
import { formatarMoeda, limparMoeda } from "@/helps/formatValor";
import { Transacoes } from "../transacoes";
import { ContextTransacao } from "@/globalContext/transacoes/context";

export const Fatura = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [dataVencimento, setDataVencimento] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const { adcionarFatura, getAllFatura } = useTransacoesDataBase();
  const [msg, setMsg] = useState("");
  const transacao = useContext(ContextTransacao);
  useEffect(() => {
    if (msg !== "") {
      const time = setTimeout(() => {
        setMsg("");
        transacao?.setIsModal(false);
      }, 3000);
      return () => clearTimeout(time);
    }
  }, [msg]);
  const handleSalvar = async () => {
    if (!titulo.trim() || !valor.trim()) {
      setMsg("Preencha o todos os campos !");
      return;
    }

    const novaFatura = {
      id: Date.now(),
      titulo,
      valor: limparMoeda(valor),
      data: dataVencimento.getTime(),
    };

    await salvarFatura(novaFatura);

    const agora = new Date();
    agora.setHours(0, 0, 0, 0);

    const vencimento = new Date(dataVencimento);
    vencimento.setHours(0, 0, 0, 0);

    const dataTresDiasAntes = new Date(
      dataVencimento.getFullYear(),
      dataVencimento.getMonth(),
      dataVencimento.getDate() - 3,
      9,
      0,
      0,
      0
    );

    if (dataTresDiasAntes.getTime() > Date.now()) {
      await Notifications.scheduleNotificationAsync({
        identifier: `fatura-${novaFatura.id}-3dias`,
        content: {
          title: "Fatura vencendo em breve!",
          body: `Sua fatura "${titulo}" no valor de R$ ${valor} vence em 3 dias.`,
          sound: true,
        },
        trigger: {
          date: dataTresDiasAntes,
        } as Notifications.DateTriggerInput,
      });
    }

    const dataNoDia = new Date(
      dataVencimento.getFullYear(),
      dataVencimento.getMonth(),
      dataVencimento.getDate(),
      9,
      0,
      0,
      0
    );

    if (dataNoDia.getTime() > Date.now()) {
      await Notifications.scheduleNotificationAsync({
        identifier: `fatura-${novaFatura.id}-hoje`,
        content: {
          title: "Fatura vence hoje!",
          body: `Sua fatura "${titulo}" no valor de R$ ${valor} vence hoje.`,
          sound: true,
        },
        trigger: {
          date: dataNoDia,
        } as Notifications.DateTriggerInput,
      });
    }
    await adcionarFatura(novaFatura);
    setMsg("Fatura salva e notificações agendadas!");

    setTitulo("");
    setValor("");
    setDataVencimento(new Date());
    setIsDate(false);
  };

  const handleChange = (text: string) => {
    const formatado = formatarMoeda(text);
    setValor(formatado);
  };
  return (
    <View>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        style={styleFatura.input}
        placeholder="Digite a fatura Ex: Cartão Nubank"
        placeholderTextColor="#aaa"
      />
      <TextInput
        value={valor}
        onChangeText={handleChange}
        style={styleFatura.input}
        placeholder="Digite o valor da fatura"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => setMostrarDatePicker(true)}
        style={styleFatura.buttonData}
      >
        <Feather name="calendar" size={24} color="#fff" />
        <Text style={styleFatura.textoButtom}>
          {!isDate ? "Adicionar Data" : dataVencimento.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {mostrarDatePicker && (
        <DateTimePicker
          value={dataVencimento}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            setMostrarDatePicker(false);
            if (date) setDataVencimento(date);
            setIsDate(true);
          }}
        />
      )}
      {msg && <Text style={styleFatura.textoMsg}>{msg}</Text>}
      <TouchableOpacity style={styleFatura.button} onPress={handleSalvar}>
        <Text style={styleFatura.textoButtom}>Salvar Fatura</Text>
      </TouchableOpacity>
    </View>
  );
};
