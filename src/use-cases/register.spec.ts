import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { UserAlreadyExistsError } from "./errors/alreadyExistsError";
import { expect, describe, it} from 'vitest'
import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { OrgAlreadyExistsError } from "@/repositories/org-already-exists-error";

describe('Register Use Case', ()=> {
  it('should be able to register', async () => {
    const orgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const { org } = await registerUseCase.execute({
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const { org } = await registerUseCase.execute({ 
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
    const orgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    const email = 'example@email.com'

    await registerUseCase.execute({
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

    await expect(() => registerUseCase.execute({
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