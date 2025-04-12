import { transacoesType } from "@/types/transacoes";
import { createContext } from "react";

interface TransacoesContext {
  transacoes: transacoesType[];
  loadTransacoes: () => void;
  adicionarTransacao: (novaTransacao: transacoesType) => Promise<void>; // Corrigido para 'adicionarTransacao'
  editarTransacao: (novaTransacao: transacoesType) => void;
  deletarTransacao: (id: number) => void;
}

export const ContextTransacao = createContext<TransacoesContext | undefined>(
  undefined
);
