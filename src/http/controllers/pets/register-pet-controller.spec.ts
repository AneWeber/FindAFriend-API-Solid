import request from 'supertest'

import { app } from '@/app'
import { makePet } from 'tests/factories/make-pet.factory'
import { makeOrg } from 'tests/factories/make-org.factory'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

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
    
    const authResponse = await request(app.server)
    .post('/orgs/authenticate')
    .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

      expect(response.statusCode).toEqual(201)
  })
})