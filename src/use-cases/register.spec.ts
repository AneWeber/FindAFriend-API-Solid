import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgAlreadyExistsError } from "./errors/alreadyExistsError";
import { expect, describe, it, beforeEach} from 'vitest'
import { compare } from "bcryptjs";
import { RegisterUseCase } from "./register";
import { makeOrg } from "tests/factories/make-org.factory";

describe('Create Org Use Case', ()=> {
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute(makeOrg())

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const password = '123456'
    const { org } = await sut.execute(makeOrg({ password }))
    
    expect(await compare(password, org.password_hash)).toBe(true)
    expect(await compare(password, orgsRepository.items[0].password_hash)).toBe(true)
  })
  
  it('should not be able to register with same email twice', async () => {
    
    const email = 'example@email.com'
    await sut.execute(makeOrg({ email }))

    await expect(sut.execute(makeOrg({ email }))).rejects.toBeInstanceOf(OrgAlreadyExistsError)

  })
})