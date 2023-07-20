"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const roles = ["admin", "eventos", "marketing"];

const formSchema = z
  .object({
    name: z.string().min(3, "Nome muito curto"),
    username: z.string().min(3, "Usuário muito curto"),
    password: z.string().min(6, "Senha muito curta"),
    confirmPassword: z.string().min(6, "Senha muito curta"),
    role: z.enum(["admin", "eventos", "marketing"]),
    isActive: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

interface RegisterFormProps {
  initialData: User | null;
}

const Register: React.FC<RegisterFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Editar usuário" : "Criar usuário";
  const description = initialData
    ? "Editar um usuário."
    : "Adicionar um novo usuário.";
  const toastMessage = initialData ? "Usuário atualizada." : "Usuário criado.";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      password: "",
      confirmPassword: "",
    } || {
      name: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      isActive: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/register/${params.userId}`, values);
        toast.success(toastMessage);
        router.refresh();
        router.push("/register");
      }
      await axios.post("/api/register", values);
      toast.success(toastMessage);
      router.refresh();
      router.push("/register");
    } catch (error: any) {
      toast.error("Algo deu errado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="pt-5 md:grid md:grid-cols-4 gap-4 mb-10">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome completo" {...field} />
                  </FormControl>
                  <FormDescription>Este é seu nome completo</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu usuário" {...field} />
                  </FormControl>
                  <FormDescription>Este é seu usuário</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <Select
                    // @ts-ignore
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleciona sua função" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Esta é sua função</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>Esta é sua senha</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme a senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>Confirme sua senha</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Ativo</FormLabel>
                    <FormDescription>
                      Selecione se o usuário está ativo ou inativo
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="space-x-2 flex items-center justify-start w-full">
            <Button disabled={isLoading} type="submit">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Register;
