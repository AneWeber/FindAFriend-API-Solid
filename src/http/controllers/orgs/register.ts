import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-users-repository"
import { OrgAlreadyExistsError } from "@/repositories/org-already-exists-error"

export async function register (request: FastifyRequest, reply: FastifyReply) {
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

    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
    
  const { name, author_name, email, whatsapp, password, zip, state, city, neighborhood, street, latitude, longitude } = registerBodySchema.parse(request.body)

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
      street,
      latitude,
      longitude,
    })
  } catch (err) {
    if(err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({message: err.message})
    }
    
    throw err
  }
  
  return reply.status(201).send()
}