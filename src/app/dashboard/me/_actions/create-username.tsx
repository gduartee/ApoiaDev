"use server"

import { auth } from "@/lib/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createUsernameSchema = z.object({
    username: z.string({ message: "O username é obrigatório" }).min(4, "O username precisa ter no mínimo 4 caracteres")
})

type createUsernameFormData = z.infer<typeof createUsernameSchema>

export async function createUsername(data: createUsernameFormData) {
    const session = await auth();

    if (!session?.user) {
        return {
            data: null,
            error: "Usuário não autenticado"
        }
    }

    const schema = createUsernameSchema.safeParse(data);

    if (!schema.success) {
        console.log(schema);
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    try {
        const userId = session.user.id;

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username: data.username
            }
        })

        return{
            data: "Username criado com sucesso",
            error: null
        }
    } catch (error) {
        return {
            data: null,
            error: "Erro ao criar username"
        }
    }
}