import { ContextUser } from "@/globalContext/usuario/context";
import { cadastroType } from "@/types/cadastroTypeStorage";
import { getCadastro } from "@/utils/cadastroStorage";
import { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { styleFaturas } from "./style/styleFaturas";
import { Feather } from "@expo/vector-icons";
import { useTransacoesDataBase } from "@/utils/dataBase/bancoSqlTransacao";
import { FaturaType } from "@/types/faturaType";
import { FaturaItem } from "@/conponents/faturaItem";

export default function Page() {
  const [dadosFatura, setDadosFatura] = useState<FaturaType[]>([]);

  const usuario = useContext(ContextUser);
  const { getAllFatura,removeFatura } = useTransacoesDataBase();

  useEffect(() => {
    const getAll = async () => {
      const dados = await getCadastro();
      usuario.setUser(dados);
    };
    getAll();
  }, []);



    useEffect(() => {
      const getAll = async () => {
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
    
      getAll();
    }, []);
    

  return (
    <View style={styleFaturas.container}>
      <View style={styleFaturas.containerFaturas}>
        <View style={styleFaturas.containerTextoImagem}>
          <View style={styleFaturas.titleSaudacoes}>
            <Text style={styleFaturas.textoContainerImagemTexto}>
              Seja bem vindo(a)
            </Text>
            <Text style={styleFaturas.titleNome}>
              {usuario.user && usuario.user.nome}
            </Text>
          </View>
          {usuario.user && usuario.user.imagem && (
            <View style={styleFaturas.containerImagem}>
              <Image
                source={{ uri: usuario.user.imagem }}
                style={styleFaturas.imagem}
              />
            </View>
          )}
        </View>
        <View style={styleFaturas.titleLogo}>
          <Feather name="trending-up" size={32} color="#40F313" />
          <Text style={styleFaturas.titleLogo1}>Cast</Text>
          <Text style={styleFaturas.titleLogo2}>Finanças</Text>
        </View>

        <View>
          <FlatList
            data={dadosFatura}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FaturaItem
                data={item.data}
                id={item.id}
                titulo={item.titulo}
                valor={item.valor}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}
