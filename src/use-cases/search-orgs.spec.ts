import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchOrgsUseCase } from "./search-orgs";
import bcrypt from "bcryptjs";
import { makeOrgWithPasswordHash } from "tests/factories/make-org.factory";

describe('Search Organizations Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: SearchOrgsUseCase
  
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new SearchOrgsUseCase(orgsRepository)
  })

  it('should be able to search for orgs', async () => {
    const org1 = await orgsRepository.create(makeOrgWithPasswordHash())
    const org2 = await orgsRepository.create(makeOrgWithPasswordHash())

    const { orgs } = await sut.execute({
      city: org1.city,
      page: 1,
    })

    expect(orgs).toHaveLength(1)
    expect(orgs).toEqual([expect.objectContaining({ city: org1.city})])
  })

  it('should be able to fetch a paginated org search', async () => {
    for (let i = 1; i <= 22; i++) {
      await orgsRepository.create(makeOrgWithPasswordHash({ city: `San Diego ${i}`}))
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