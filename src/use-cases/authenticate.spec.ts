import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import bcrypt from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
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

    const { org } = await sut.execute({
      email: 'example@email.com',
      password: 'securePass123'
    })
    
    expect(org.id).toEqual(expect.any(String))
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
