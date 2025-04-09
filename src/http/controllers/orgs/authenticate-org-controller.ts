import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

const bodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export async function authenticateOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const body = bodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()

  try {
    const { org } = await authenticateUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id
        }
      }
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    
    console.error(error)
    return reply.status(500).send({message: 'Internal server error.'})
  }
}