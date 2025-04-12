import { ReactNode, useEffect, useState } from "react";
import { ContextUser } from "./context";
import { cadastroType } from "@/types/cadastroTypeStorage";
import { atualizarImagem, getCadastro } from "@/utils/cadastroStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTransacoesDataBase } from "@/utils/dataBase/bancoSqlTransacao";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<cadastroType | null>(null);
  const route = useRouter();
  const {clearAll} = useTransacoesDataBase()
  
  useEffect(() => {
    const getAll = async () => {
      const response = await getCadastro();
      setUser(response);
    };
    getAll();
  }, []);

  const editarImagem = async (novaImg: string) => {
    const novaImagem = await atualizarImagem(novaImg);
    setUser(novaImagem);
  };
  const excluirConta = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir sua conta e todos os dados? Essa ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("cadastro");
              await clearAll();
              setUser(null);
              route.replace("/");
            } catch (error) {
              console.log("Erro ao excluir dados:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ContextUser.Provider value={{ editarImagem, excluirConta, user, setUser }}>
      {children}
    </ContextUser.Provider>
  );
};
