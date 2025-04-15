import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'

import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";

const registerBodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  password: z.string().min(6),
  
  zip: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
})

export async function registerOrgController (
  request: FastifyRequest, 
  reply: FastifyReply
) { 
  const body = registerBodySchema.parse(request.body)

  const registerOrgUseCase = makeRegisterUseCase()

  try{
    const { org } = await registerOrgUseCase.execute(body)

    return reply.status(201).send(org)
  } catch (err) {
    if(err instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({message: err.message})
    }
  }
}