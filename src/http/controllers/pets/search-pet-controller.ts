import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pet-use-case";

const querySchema = z.object({
  city: z.string().min(1),
  name: z.string().optional(),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
})

export async function searchPetController(request: FastifyRequest, reply: FastifyReply) {
  const { city, name, age, size, energy_level, environment } = querySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city, name, age, size, energy_level, environment 
    })

    return reply.status(200).send({ pets })
  } catch (error) {
    console.error(error)
    return reply.status(500).send({ message: 'Internal server error'})
  }
} 