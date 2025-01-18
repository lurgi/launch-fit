import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const ideaSchema = z.object({
  title: z.string().min(3, "아이디어 제목을 입력하세요."),
  description: z.string().min(5, "아이디어 설명을 입력하세요."),
  emailText: z.string().min(5, "이메일 등록 문구를 입력하세요."),
  website: z.string().url("올바른 URL을 입력하세요."),
});

type IdeaFormValues = z.infer<typeof ideaSchema>;

export default function IdeaForm({ onSubmit, defaultValues }: { onSubmit: () => void; defaultValues: IdeaFormValues }) {
  const form = useForm<IdeaFormValues>({
    resolver: zodResolver(ideaSchema),
    defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof ideaSchema>) => {
    console.log(values);
    onSubmit();
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
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md ">
          관심 등록 페이지 만들기
        </Button>
      </form>
    </Form>
  );
}
