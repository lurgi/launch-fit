import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { useToast } from "@/hooks/use-toast";

const ideaSchema = z.object({
  title: z.string().min(3, "아이디어 제목을 입력하세요.").max(50, "아이디어 제목은 50자 이하로 입력하세요."),
  description: z.string().min(5, "아이디어 설명을 입력하세요.").max(500, "아이디어 설명은 500자 이하로 입력하세요."),
  website: z.string().url("올바른 URL을 입력하세요.").max(200, "소개 홈페이지는 200자 이하로 입력하세요."),
});

type IdeaFormValues = z.infer<typeof ideaSchema>;

type Method = "create" | "update";

async function fetcher(url: string, { arg }: { arg: IdeaFormValues & { ideaId?: string } }, method: Method) {
  return fetch(url, {
    method: method === "create" ? "POST" : "PUT",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

interface IdeaFormProps {
  method: Method;
  onSubmit?: (data: { ideaId: string }) => void;
  defaultValues: IdeaFormValues;
  ideaId?: string;
}

export default function IdeaForm({ method, onSubmit, defaultValues, ideaId: _ideaId }: IdeaFormProps) {
  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues,
  });

  const { trigger, isMutating } = useSWRMutation<
    { isError: boolean; message: string; ideaId?: string },
    Error,
    string,
    IdeaFormValues & { ideaId?: string }
  >("/api/idea", (url, { arg }) => fetcher(url, { arg }, method));

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof ideaSchema>) => {
    const { isError, message, ideaId } = await trigger({ ...values, ideaId: _ideaId });
    if (isError) {
      const { dismiss } = toast({
        title: "아이디어 생성/수정에 실패했습니다.",
        description: message,
        variant: "destructive",
      });
      setTimeout(() => {
        dismiss();
      }, 3000);
      return;
    } else {
      onSubmit?.({ ideaId: ideaId! });
    }
  };

  const isValid =
    form.getValues("title") !== defaultValues.title ||
    form.getValues("description") !== defaultValues.description ||
    form.getValues("website") !== defaultValues.website;

  return (
    <Form {...form}>
      <form className="w-full p-6 rounded-lg space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        {/* 아이디어 제목 */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">💡 아이디어 제목</FormLabel>
              <FormControl>
                <Input {...field} placeholder="예: 혁신적인 노트 앱" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 아이디어 설명 */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">📝 아이디어 설명</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="간단한 설명을 입력하세요" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 소개 홈페이지 */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">🌐 소개 홈페이지</FormLabel>
              <FormControl>
                <Input {...field} placeholder="예: https://myproject.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isMutating || !isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md"
        >
          {method === "create" ? "관심 등록 페이지 만들기" : "아이디어 수정하기"}
        </Button>
      </form>
    </Form>
  );
}
