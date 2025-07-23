import { z } from "zod";

// Схема для входных данных формы (без трансформации)
export const postFormInputSchema = z.object({
  title: z
    .string()
    .min(1, "Заголовок обязателен")
    .max(100, "Заголовок не должен превышать 100 символов"),
  
  description: z
    .string()
    .min(1, "Описание обязательно")
    .max(300, "Описание не должно превышать 300 символов"),
  
  slug: z
    .string()
    .min(1, "Slug обязателен")
    .max(50, "Slug не должен превышать 50 символов")
    .regex(/^[a-z0-9-]+$/, "Slug может содержать только строчные буквы, цифры и дефисы"),
  
  content: z
    .string()
    .min(10, "Содержимое должно содержать минимум 10 символов"),
  
  author: z
    .string()
    .optional(),
  
  tags: z
    .array(z.string())
    .optional(),
  
  category: z
    .string()
    .optional(),
  
  draft: z
    .boolean()
    .default(false),
});

// Схема для обработки данных (с трансформацией тегов в строку)
export const postFormSchema = postFormInputSchema.transform((data) => ({
  ...data,
  tags: data.tags || []
}));

export type PostFormInput = z.infer<typeof postFormInputSchema>;
export type PostFormData = z.infer<typeof postFormSchema>; 