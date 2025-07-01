"use server"

import { error } from "console";
import { z } from "zod";

const createUsernameSchema = z.object({
    username: z.string({ message: "O username é obrigatório" }).min(4, "O username precisa ter no mínimo 4 caracteres")
})

type createUsernameFormData = z.infer<typeof createUsernameSchema>

export async function createUsername(data: createUsernameFormData) {
    const schema = createUsernameSchema.safeParse(data);

    if(!schema.success) {
        console.log(schema);
        return {
            data: null,
            error: schema.error.issues[0].message
        }
    }

    console.log(data.username)

    return{
        data: "USERNAME CRIADO",
        error: null
    }
}