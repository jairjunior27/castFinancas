import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectedIcon } from "../slectedIcon";
import DateTimePicker from "@react-native-community/datetimepicker";

import { style } from "./style";
import { useContext, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { DespesasHelps } from "@/helps/despesasHelp";
import { ContextTransacao } from "@/globalContext/transacoes/context";

export const Despesas = () => {
  const dataDespesas = DespesasHelps;
  const [selected, setSelected] = useState<number | null>(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [title, setTitle] = useState("");
  const [valor, setValor] = useState("");
  const [isDate, setIsDate] = useState(false);
  const tipo: "Entrada" | "Saida" = "Saida";
  const transacao = useContext(ContextTransacao);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios"); // No iOS, precisa manter aberto
    if (selectedDate) {
      setDate(selectedDate);
      setIsDate(true);
    }
  };

  const salvarTransacao = async () => {
    if (!title || !valor || selected === null) {
      alert("Preencha todos os campos");
      return;
    }

    const novaTransacao = {
      id: new Date().getTime(),
      title,
      valor: parseFloat(valor),
      data: date.toISOString(),
      icon: DespesasHelps.find((item) => item.id === selected)?.icon || "",
      tipo,
    };

    try {
      await transacao?.adicionarTransacao(novaTransacao);
      setTitle(""); // Resetar campos
      setValor("");
      setSelected(null);
      alert("Transação salva com sucesso");
    } catch (e) {
      console.error("Erro ao salvar transação:", e);
    }
  };
  return (
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={style.container}>
          {dataDespesas.map((item) => (
            <SelectedIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              onPress={() => setSelected(item.id)}
              isSelect={selected === item.id}
            />
          ))}
        </View>
      </ScrollView>
      <View style={style.formContainer}>
        <TextInput
          style={style.input}
          placeholder="Digite o nome da despesa"
          value={title}
          onChangeText={(e) => setTitle(e)}
        />
        <TextInput
          style={style.input}
          placeholder="Digite o valor R$"
          keyboardType="numeric"
          onChangeText={(text) => {
            const numeric = text.replace(/[^0-9.]/g, "");
            setValor(numeric);
          }}
          value={valor}
        />
        <TouchableOpacity
          style={style.inputData}
          onPress={() => setShowPicker(true)}
        >
          <Feather name="calendar" size={24} color="#fff" />
          <Text style={style.textInputData}>
            {!isDate ? "Adicione a data " : date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TouchableOpacity style={style.buttom} onPress={salvarTransacao}>
          <Text style={style.textButtom}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
