import { z } from "zod";

export const CreateAspirationSchema = z.object({
  title: z
    .string()
    .min(1, "Judul wajib diisi")
    .max(100, "Judul maksimal 100 karakter"),
  content: z
    .string()
    .min(10, "Isi aspirasi minimal 10 karakter")
    .max(2000, "Isi aspirasi maksimal 2000 karakter"),
  category: z.enum(
    [
      "infrastruktur",
      "keamanan",
      "kebersihan",
      "sosial",
      "administrasi",
      "lainnya",
    ],
    { error: "Kategori tidak valid" },
  ),
  is_anonymous: z.boolean(),
});

export const UpdateAspirationStatusSchema = z.object({
  id: z.string().uuid("ID aspirasi tidak valid"),
  status: z.enum(["baru", "diproses", "selesai", "ditolak"], {
    error: "Status tidak valid",
  }),
});

export type CreateAspirationInput = z.infer<typeof CreateAspirationSchema>;
export type UpdateAspirationStatusInput = z.infer<
  typeof UpdateAspirationStatusSchema
>;
