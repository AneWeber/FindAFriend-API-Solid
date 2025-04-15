import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from 'tests/factories/make-org.factory'

describe('Search Organizations (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search org by city', async () => {
    const org = makeOrg()
    await request(app.server).post('/orgs').send(org)

    const response = await request(app.server)
    .get('/orgs/search')
    .query({ q: org.city})
    .expect(200)

  expect(response.body.orgs).toHaveLength(1)
  })
})