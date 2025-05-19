import { Feather } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { style } from "./style";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as imagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { cadastroStore } from "@/utils/cadastroStorage";
import { ContextUser } from "@/globalContext/usuario/context";

const signupSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().nonempty("O email é obrigatório").email("E-mail invalido"),
  idade: z
    .string()
    .min(1, "A idade é obrigatória.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 120,
      {
        message: "A idade deve ser um número entre 1 e 120.",
      }
    ),
});

type formSchema = z.infer<typeof signupSchema>;

export const SignupEditForm = () => {
  const [imagem, setImagem] = useState<string | null>(null);
  const [msg, setMensagem] = useState("");
  const router = useRouter();
  const context = useContext(ContextUser);
  if (!context) {
    return <Text>Usuário não encontrado!</Text>;
  }
  const {user,setUser}  = context 

  useEffect(() => {
    const time = setTimeout(() => {
      setMensagem("");
    }, 3000);
    return () => clearTimeout(time);
  }, [msg]);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("nome", user.nome);
      setValue("idade", String(user.idade));
      setValue("email", user.email);
      setImagem(user.imagem || null);
    }
  }, [user]);

  const handleImagem = async () => {
    const { status } = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Habilite o acesso à galeria.");
      return;
    }
    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const onSubmit = async (data: formSchema) => {
    if (!imagem) {
      setMensagem("Você precisa adicionar uma imagem.");
      return;
    }

    const formData = {
      nome: data.nome,
      email: data.email,
      idade: data.idade,
      imagem: imagem,
    };

    try {
      await cadastroStore(formData);
      setUser({
        ...user,
        nome: formData.nome,
        email: formData.email,
        idade: formData.idade,
        imagem: formData.imagem,
      });

      setMensagem("Cadastro atualizado com sucesso!");
      router.push("/(tabs)/home");
    } catch (e) {
      console.log("erro ao cadastrar", e);
    }
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder="Digite seu nome"
        style={style.inputItem}
        onChangeText={(e) => setValue("nome", e)}
        defaultValue={user?.nome} // <- opcional se quiser também
      />
      {errors.nome && (
        <Text style={style.textError}>{errors.nome.message}</Text>
      )}

      <TextInput
        placeholder="Digite sua idade"
        style={style.inputItem}
        onChangeText={(e) => setValue("idade", e.replace(/\D/g, ""))}
        keyboardType="numeric"
        defaultValue={user?.idade?.toString()}
      />
      {errors.idade && (
        <Text style={style.textError}>{errors.idade.message}</Text>
      )}

      <TextInput
        placeholder="Digite seu email"
        style={style.inputItem}
        onChangeText={(e) => setValue("email", e)}
        defaultValue={user?.email}
      />
      {errors.email && (
        <Text style={style.textError}>{errors.email.message}</Text>
      )}

      <TouchableOpacity style={style.conteudoImagem} onPress={handleImagem}>
        <Feather name="image" size={30} color="#ccc" />
        <Text style={style.textImage}>Adicione uma imagem</Text>
      </TouchableOpacity>

      {imagem && (
        <View style={style.containerPreview}>
          <View style={style.conteudoPreview}>
            <Image source={{ uri: imagem }} style={style.preview} />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={style.conteudoButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>Atualizar</Text>
      </TouchableOpacity>

      {msg && (
        <View style={style.erroImagem}>
          <Text style={style.textoErroImagem}>{msg}</Text>
        </View>
      )}
    </View>
  );
};
