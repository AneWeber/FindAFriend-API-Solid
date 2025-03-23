import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { UserAlreadyExistsError } from "./errors/alreadyExistsError";
import { expect, describe, it, beforeEach} from 'vitest'
import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { OrgAlreadyExistsError } from "@/repositories/org-already-exists-error";

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterUseCase

describe('Register Use Case', ()=> {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'Org For All',
      author_name: 'John Doe',
      email: 'example@email.com',
      whatsapp: '1234567890',
      password: 'securePass123',
      zip: '12345-678',
      state: 'California',
      city: 'Los Angeles',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({ 
      name: 'Org For All',
      author_name: 'John Doe',
      email: 'example@email.com',
      whatsapp: '1234567890',
      password: 'securePass123',
      zip: '12345-678',
      state: 'California',
      city: 'Los Angeles',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    })

    const isPasswordCorrectlyHashed = await compare(
      'securePass123',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'example@email.com'

    await sut.execute({
      name: 'Org For All',
      author_name: 'John Doe',
      email,
      whatsapp: '1234567890',
      password: 'securePass123',
      zip: '12345-678',
      state: 'California',
      city: 'Los Angeles',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    })

    await expect(() => 
      sut.execute({
      name: 'Org For All',
      author_name: 'John Doe',
      email,
      whatsapp: '1234567890',
      password: 'securePass123',
      zip: '12345-678',
      state: 'California',
      city: 'Los Angeles',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    }),
  ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})