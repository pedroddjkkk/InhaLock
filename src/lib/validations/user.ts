import { z } from "zod";

export const createUserSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Usuário inválido",
        required_error: "Usuário é obrigatório",
      })
      .min(3, "Usuário deve ter pelo menos 3 caracteres")
      .max(255, "Usuário deve ter no máximo 255 caracteres"),
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z.string().refine(
      (value: string) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[@$!%*#?&]/.test(value);

        return (
          value.length >= minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          hasSpecialChar
        );
      },
      {
        message:
          "A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      }
    ),
    confirmPassword: z.string().refine((value: string) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[@$!%*#?&]/.test(value);

      return (
        value.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar
      );
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Usuário é obrigatório",
    })
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .max(255, "Usuário deve ter no máximo 255 caracteres"),
  password: z.string().refine(
    (value: string) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[@$!%*#?&]/.test(value);

      return (
        value.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar
      );
    },
    {
      message:
        "A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
    }
  ),
});
