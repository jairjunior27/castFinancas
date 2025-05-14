import { ContextUser } from "@/globalContext/usuario/context";
import { getCadastro } from "@/utils/cadastroStorage";
import { useCallback, useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styleFaturas } from "../style/styleFaturas";
import { Feather } from "@expo/vector-icons";
import { useTransacoesDataBase } from "@/utils/dataBase/bancoSqlTransacao";
import { FaturaType } from "@/types/faturaType";
import { FaturaItem } from "@/conponents/faturaItem";
import { useFocusEffect } from "expo-router";

export default function Page() {
  const [dadosFatura, setDadosFatura] = useState<FaturaType[]>([]);

  const usuario = useContext(ContextUser);
  const { getAllFatura, removeFatura } = useTransacoesDataBase();

  useEffect(() => {
    const getAll = async () => {
      const dados = await getCadastro();
      usuario?.setUser(dados);
    };
    getAll();
  }, []);

  useFocusEffect( 
    useCallback(() => {
    loadFaturas()
  },[]) )

  const loadFaturas = async () => {
    const dados = await getAllFatura();

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const faturasAtivas: FaturaType[] = [];

    for (const fatura of dados) {
      const dataVencimento = new Date(fatura.data);
      dataVencimento.setHours(0, 0, 0, 0);

      if (dataVencimento >= hoje) {
        faturasAtivas.push(fatura);
      } else {
        await removeFatura(fatura.id);
      }
    }

    faturasAtivas.sort((a, b) => a.data - b.data);

    setDadosFatura(faturasAtivas);
  };

  useEffect(() => {
    loadFaturas();
  }, []);

  const handleDelete = async (id: number) => {
    await removeFatura(id);
    await loadFaturas();
  };

  return (
    <View style={styleFaturas.container}>
   
  
         <View style={styleFaturas.conteudoHeader}>
              <View style={styleFaturas.titleLogo}>
                <Feather name="trending-up" size={32} color="#fff" />
                <Text style={styleFaturas.titleLogo1}>Cast</Text>
                <Text style={styleFaturas.titleLogo2}>Finanças</Text>
              </View>
              <View style={styleFaturas.containerTextoImagem}>
                <View style={styleFaturas.titleSaudacoes}>
                  <Text style={styleFaturas.textoContainerImagemTexto}>
                    Seja bem vindo(a)
                  </Text>
                  <Text
                    style={styleFaturas.titleNome}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {usuario?.user && usuario?.user.nome}
                  </Text>
                </View>
                {usuario?.user && usuario?.user.imagem && (
                  <View style={styleFaturas.containerImagem}>
                    <Image
                      source={{ uri: usuario.user.imagem }}
                      style={styleFaturas.imagem}
                    />
                  </View>
                )}
              </View>
            </View>

        <View style={styleFaturas.containerFaturasAvencer}>
          <Text style={styleFaturas.TextoFaturasAvencer}>Faturas a Vencer</Text>
          <FlatList
            data={dadosFatura}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FaturaItem key={item.id} fatura={item} onDelete={handleDelete} />
            )}
          />
        </View>
      </View>

  );
}
