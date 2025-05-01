import { z } from "zod";

export const reportFormSchema = z.object({
  reportTitle: z.string().min(3, "Title must be at least 3 characters"),
  businessUnit: z.string({
    required_error: "Nivel de acesso obrigatório para o cadastro !",
  }),
  reportOwner: z.string().min(3, "Report owner must be at least 3 characters"),
  briefDescription: z
    .string()
    .min(3, "Brief description must be at least 3 characters")
    .max(400, "Brief description must be less than 400"),
  detailedDescription: z
    .string()
    .min(3, "Detailed description must be at least 3 characters")
    .max(1000, "Brief description must be less than 1000"),
  reportUrl: z.string().url(),
});

export const featureFormSchema = z.object({
  name: z.string().min(3, "Your name must has at least three characters "),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .refine(
      (e) => e.endsWith("@smartops.com"),
      "Email must be from the @smartops.com domain"
    ),
  briefDescription: z
    .string()
    .min(3, "Brief description must be at least 3 characters")
    .max(400, "Brief description must be less than 400"),
  detailedDescription: z
    .string()
    .min(3, "Detailed description must be at least 3 characters")
    .max(1000, "Brief description must be less than 1000"),
});
