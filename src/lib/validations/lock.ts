import z from "zod";

const createLockSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  password: z
    .string()
    .min(4, "Senha deve ter pelo menos 4 caracteres")
    .max(255, "Senha deve ter no máximo 255 caracteres"),
  securityCode: z
    .string()
    .min(4, "Código de segurança deve ter pelo menos 4 caracteres"),
});
