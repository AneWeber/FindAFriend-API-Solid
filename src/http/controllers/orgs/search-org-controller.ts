import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchOrgsUseCase } from '@/use-cases/factories/make-search-orgs-use-case'

export async function searchOrgController(request: FastifyRequest, reply: FastifyReply) {
  const searchOrgsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchOrgsQuerySchema.parse(request.query)
  
  const searchOrgsUseCase = makeSearchOrgsUseCase()

  const { orgs } = await searchOrgsUseCase.execute({
    city: q,
    page,
  })

  return reply.status(200).send({
    orgs,
  })
}