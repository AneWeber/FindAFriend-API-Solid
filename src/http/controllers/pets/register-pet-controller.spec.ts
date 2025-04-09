import request from 'supertest'

import { app } from '@/app'
import { makePet } from 'tests/factories/make-pet.factory'
import { makeOrg } from 'tests/factories/make-org.factory'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Register Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.ready()
  })

  it('should be able to register a new pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org)

    const pet = makePet({ org_id: org.id})

    const response = await request(app.server)
      .post('/orgs/pets')
      .send(makePet())

    expect(response.status).toBe(201)
  })
})