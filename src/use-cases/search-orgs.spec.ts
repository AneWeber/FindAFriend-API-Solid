import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchOrgsUseCase } from "./search-orgs";
import bcrypt from "bcryptjs";

describe('Search Organizations Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: SearchOrgsUseCase
  
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchOrgsUseCase(orgsRepository)
  })

  it('should be able to search for orgs', async () => {
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

    await orgsRepository.create({
      name: 'Org For All',
      author_name: 'John Doe',
      email: 'example@email.com',
      whatsapp: '1234567890',
      password_hash: await bcrypt.hash('securePass123', await bcrypt.genSalt(6)),
      zip: '12345-678',
      state: 'California',
      city: 'San Diego',
      neighborhood: 'Downtown',
      street: 'Main St, 123'
    })

    const { orgs } = await sut.execute({
      city: 'San Diego',
      page: 1,
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([expect.objectContaining({ city: 'San Diego'})])
  })

  it('should be able to fetch a paginated org search', async () => {
    for (let i = 1; i <= 22; i++) {
      await orgsRepository.create({
        name: 'Org For All',
        author_name: 'John Doe',
        email: 'example@email.com',
        whatsapp: '1234567890',
        password_hash: await bcrypt.hash('securePass123', await bcrypt.genSalt(6)),
        zip: '12345-678',
        state: 'California',
        city: `San Diego ${i}`,
        neighborhood: 'Downtown',
        street: 'Main St, 123'
      })
    }

    const { orgs } = await sut.execute({
      city: 'San Diego',
      page: 2,
    })

    expect(orgs).toHaveLength(2)
    expect(orgs).toEqual([
      expect.objectContaining({ city: 'San Diego 21'}),
      expect.objectContaining({ city: 'San Diego 22'})
    ])
  })
})