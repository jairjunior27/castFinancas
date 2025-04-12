import { transacoesType } from "@/types/transacoes";
import { useSQLiteContext } from "expo-sqlite";
import { inicializeDataBase } from "@/utils/dataBase/inicializeBancoDados";
import { useEffect } from "react";
import { FaturaType } from "@/types/faturaType";

export function useTransacoesDataBase() {
  const db = useSQLiteContext();

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await inicializeDataBase(db);
      } catch (e) {
        console.error("Erro ao inicializar banco de dados:", e);
      }
    };

    initDatabase();
  }, [db]);

  const create = async (data: transacoesType) => {
    try {
      const stmt = await db.prepareAsync(
        "INSERT INTO transacoes(title, valor, icon, data, tipo) VALUES ($title, $valor, $icon, $data, $tipo)"
      );
      const result = await stmt.executeAsync({
        $title: data.title,
        $valor: data.valor,
        $icon: data.icon,
        $data: data.data,
        $tipo: data.tipo,
      });
      return { insertRowId: result.lastInsertRowId?.toString() };
    } catch (e) {
      console.error("Erro ao inserir transação:", e);
      throw e;
    }
  };

  const getAll = async (): Promise<transacoesType[]> => {
    try {
      const result = await db.getAllAsync<transacoesType>(
        "SELECT * FROM transacoes;"
      );
      return result;
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return [];
    }
  };

  const update = async (transacao: transacoesType) => {
    if (!transacao.id) return;
    try {
      await db.runAsync(
        `UPDATE transacoes SET title = ?, valor = ?, icon = ?, data = ?, tipo = ? WHERE id = ?;`,
        [
          transacao.title,
          transacao.valor,
          transacao.icon,
          transacao.data,
          transacao.tipo,
          transacao.id,
        ]
      );
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

  const remove = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM transacoes WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  const clearAll = async () => {
    try {
      await db.runAsync("DELETE FROM transacoes;");
      await db.runAsync("DELETE FROM sqlite_sequence WHERE name='transacoes';");
      await inicializeDataBase(db); // Recria a tabela se necessário
    } catch (error) {
      console.error("Erro ao deletar todas as transações:", error);
    }
  };

  const adcionarFatura = async (data: FaturaType) => {
    try {
      const add = await db.prepareAsync(
        "INSERT INTO faturas(titulo, valor, data) VALUES ($titulo, $valor,  $data)"
      );
      const result = await add.executeAsync({
        $titulo: data.titulo,
        $valor: data.valor,
        $data: data.data,
      });
      return { insertRowId: result.lastInsertRowId?.toString() };
    } catch (e) {
      console.error("Erro ao inserir faturas:", e);
      throw e;
    }
  };

  const getAllFatura = async (): Promise<FaturaType[]> => {
    try {
      const result = await db.getAllAsync<FaturaType>("SELECT * FROM faturas;");
      return result;
    } catch (error) {
      console.error("Erro ao buscar faturas:", error);
      return [];
    }
  };

  const updateFatura = async (fatura: FaturaType) => {
    if (!fatura.id) return;
    try {
      await db.runAsync(
        `UPDATE faturas SET titulo = ?, valor = ?, data = ? WHERE id = ?;`,
        [fatura.titulo, fatura.data, fatura.valor, fatura.id]
      );
    } catch (error) {
      console.error("Erro ao editar faturas:", error);
    }
  };

  const removeFatura = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM faturas WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Erro ao deletar fatura:", error);
    }
  };

  return {
    create,
    getAll,
    update,
    remove,
    clearAll,
    adcionarFatura,
    removeFatura,
    updateFatura,
    getAllFatura,
  };
}
