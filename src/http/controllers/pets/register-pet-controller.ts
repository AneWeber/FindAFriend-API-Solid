import { FastifyRequest, FastifyReply } from "fastify"
import { z } from 'zod'

import { makePetRegisterUseCase } from "@/use-cases/factories/make-pet-register-use-case"
import { OrgNotFoundError } from "@/use-cases/errors/org-not-found-error"

const bodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string(),
})

export async function registerPetController (
  request: FastifyRequest, 
  reply: FastifyReply
) {
  const body = bodySchema.parse(request.body)

  const createPetUseCase = makePetRegisterUseCase()

  const org_id = request.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    return reply.status(201).send(pet)
  } catch (error) {
    if (error instanceof OrgNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    console.error(error)

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
