import { z } from "zod";

export const CreateAnnouncementSchema = z.object({
  title: z
    .string()
    .min(1, "Judul pengumuman wajib diisi")
    .max(150, "Judul maksimal 150 karakter"),
  content: z
    .string()
    .min(10, "Isi pengumuman minimal 10 karakter")
    .max(5000, "Isi pengumuman maksimal 5000 karakter"),
  category: z.enum(
    ["penting", "kegiatan", "kesehatan", "keamanan", "sosial", "umum"],
    { error: "Kategori tidak valid" },
  ),
  priority: z.enum(["tinggi", "sedang", "rendah"], {
    error: "Prioritas tidak valid",
  }),
  is_pinned: z.boolean(),
});

export type CreateAnnouncementInput = z.infer<typeof CreateAnnouncementSchema>;
