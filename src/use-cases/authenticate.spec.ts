import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcrypt from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { makeOrgWithPasswordHash } from "tests/factories/make-org.factory";


describe('Authenticate Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateUseCase
  
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    const password = 'securePass123'
    const org = await orgsRepository.create(
      makeOrgWithPasswordHash({ password_hash: await bcrypt.hash(password, await bcrypt.genSalt(6))})
    )

    const { org: authenticatedOrg } = await sut.execute({
      email: (await org).email,
      password,
    })
    
    expect(authenticatedOrg.id).toEqual(org.id)
    expect(authenticatedOrg.email).toEqual(org.email)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await orgsRepository.create({
      name: 'Org For All',
      author_name: 'John Doe',
      email: 'example@email.com',
      whatsapp: '1234567890',
      password_hash: await bcrypt.hash('securePass123', await bcrypt.genSalt(6)),
      zip: '12345-678',
      state: 'California',
      city: 'Los Angeles',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    })

    await expect(() =>
      sut.execute({
        email: 'example2@email.com',
        password: 'securePass123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Org For All',
      author_name: 'John Doe',
      email: 'example@email.com',
      whatsapp: '1234567890',
      password_hash: await bcrypt.hash('securePass123', await bcrypt.genSalt(6)),
      zip: '12345-678',
      state: 'California',
      city: 'Los Angeles',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    })

    await expect(() =>
      sut.execute({
        email: 'example@email.com',
        password: 'securePass333',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  
})
