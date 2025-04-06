import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository"
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";

export async function registerOrgController (request: FastifyRequest, reply: FastifyReply) {
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
    
  const { name, author_name, email, whatsapp, password, zip, state, city, neighborhood, street} = registerBodySchema.parse(request.body)

  try{
    const orgsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    await registerUseCase.execute({
      name,
      author_name,
      email,
      whatsapp,
      password,
      zip,
      state,
      city,
      neighborhood,
      street
    })
  } catch (err) {
    if(err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({message: err.message})
    }
    
    throw err
  }
  
  return reply.status(201).send()
}