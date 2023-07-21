"use client";

import { useState } from "react";
import { Tv } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  imageUrl: z.string().nonempty({ message: "Imagem é obrigatório" }),
});

interface TvFormFormProps {
  initialData: Tv | null;
}

const TvForm: React.FC<TvFormFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  const title = initialData ? "Editar TV" : "Criar TV";
  const description = initialData ? "Editar TV." : "Adicionar nova TV.";
  const toastMessage = initialData ? "TV atualizada." : "TV criada.";
  const action = initialData ? "Salvar alterações" : "Criar";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (initialData) {
        await axios.patch(`/api/tvs/${params.tvId}`, values);
        toast.success(toastMessage);
        router.refresh();
        router.push("/tvs");
      } else {
        await axios.post("/api/tvs", values);
        toast.success(toastMessage);
        router.refresh();
        router.push("/tvs");
      }
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem da TV</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormDescription>
                  Imagens de 1920x1080 e 1080x1920
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Nome da Tv"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Nome da TV</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TvForm;
