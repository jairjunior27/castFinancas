import { cadastroType } from "@/types/cadastroTypeStorage";
import { createContext } from "react";

interface ContextUserType {
  user: cadastroType | null;
  editarImagem: (novaImagem: string) => Promise<void>;
  excluirConta: () => Promise<void>;
  setUser: (user: cadastroType | null) => void
} 
export const ContextUser = createContext<ContextUserType | undefined>(undefined);
