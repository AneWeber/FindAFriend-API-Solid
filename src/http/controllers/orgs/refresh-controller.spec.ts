import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrg } from 'tests/factories/make-org.factory'
 
describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const org = makeOrg()
    await request(app.server).post('/orgs').send(org)

    const authResponse = await request(app.server).post('/orgs/authenticate').send({
      email: org.email,
      password: org.password,
    })

    const cookies = authResponse.headers['set-cookie'];

    expect(cookies).toBeDefined();

    const response = await request(app.server)
      .patch('/orgs/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})