import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from 'tests/factories/make-org.factory'

describe('Register Organization (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new org', async () => {
    const response = await request(app.server).post('/orgs').send(makeOrg())

    expect(response.statusCode).toEqual(201)

  })

  it('should not be able to register a new org with same email', async () => {
    const email = 'existing@email.com'
    await request(app.server).post('/orgs').send(makeOrg({email: email}))
    const response = await request(app.server).post('/orgs').send(makeOrg({email: email}))

    expect(response.statusCode).toEqual(400)
  })
})