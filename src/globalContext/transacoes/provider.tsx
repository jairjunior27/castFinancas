import { transacoesType } from "@/types/transacoes";
import { useTransacoesDataBase } from "@/utils/dataBase/bancoSqlTransacao";
import { ReactNode, useEffect, useState } from "react";
import { ContextTransacao } from "./context";

export const TransacoesProvider = ({ children }: { children: ReactNode }) => {
  const [transacoes, setTransacoes] = useState<transacoesType[]>([]);
  const {
    create,
    getAll,
    update,
    remove,
 
  } = useTransacoesDataBase(); 

  const loadTransacoes = async () => {
    const data = await getAll();
    setTransacoes(data || []);
  };

  useEffect(() => {
    const setup = async () => {
      await loadTransacoes();
    };
    setup();
  }, []);

  const adicionarTransacao = async (novaTransacao: transacoesType) => {
    await create(novaTransacao); 
    await loadTransacoes(); 
  };

  const editarTransacao = async (novaTransacao: transacoesType) => {
    await update(novaTransacao); 
    await loadTransacoes(); // Recarrega as transações após editar
  };

  const deletarTransacao = async (id: number) => {
    await remove(id); 
    await loadTransacoes(); 
  };

  return (
    <ContextTransacao.Provider
      value={{
        transacoes,
        adicionarTransacao,
        loadTransacoes,
        deletarTransacao,
        editarTransacao,
      }}
    >
      {children}
    </ContextTransacao.Provider>
  );
};
