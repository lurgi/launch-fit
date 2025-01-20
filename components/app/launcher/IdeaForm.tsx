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
  title: z.string().min(3, "아이디어 제목을 입력하세요."),
  description: z.string().min(5, "아이디어 설명을 입력하세요."),
  emailText: z.string().min(5, "이메일 등록 문구를 입력하세요."),
  website: z.string().url("올바른 URL을 입력하세요."),
});

type IdeaFormValues = z.infer<typeof ideaSchema>;

async function fetcher(url: string, { arg }: { arg: IdeaFormValues }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

interface IdeaFormProps {
  onSubmit?: (data: { ideaId: string }) => void;
  defaultValues: IdeaFormValues;
}

export default function IdeaForm({ onSubmit, defaultValues }: IdeaFormProps) {
  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues,
  });

  const { trigger, isMutating } = useSWRMutation<
    { isError: boolean; message: string; ideaId?: string },
    Error,
    string,
    IdeaFormValues
  >("/api/idea", fetcher);

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof ideaSchema>) => {
    const { isError, message, ideaId } = await trigger(values);
    if (isError) {
      toast({
        title: "아이디어 생성 실패",
        description: message,
        variant: "destructive",
      });
    } else {
      onSubmit?.({ ideaId: ideaId! });
    }
  };

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

        {/* 이메일 등록 문구 */}
        <FormField
          control={form.control}
          name="emailText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">📩 이메일 등록 문구 설정</FormLabel>
              <FormControl>
                <Input {...field} placeholder="예: 관심이 있으시면 이메일을 입력하세요!" />
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
          disabled={isMutating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md "
        >
          관심 등록 페이지 만들기
        </Button>
      </form>
    </Form>
  );
}
