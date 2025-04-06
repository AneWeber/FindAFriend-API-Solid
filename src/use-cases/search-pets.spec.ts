import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsUseCase } from "./search-pets";
import { makePet } from "tests/factories/make-pet.factory";
import { makeOrgWithPasswordHash } from "tests/factories/make-org.factory";

describe('Search Organizations Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: SearchPetsUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create(makeOrgWithPasswordHash())

    await petsRepository.create(makePet({ org_id: org.id }))
    await petsRepository.create(makePet({ org_id: org.id }))

    const org2 = await orgsRepository.create(makeOrgWithPasswordHash())

    await petsRepository.create(makePet({ org_id: org2.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city })

    expect(pets2).toHaveLength(1)  
  })

  it('should be able to search pets by city and age', async () => {
    
  })
  it('should be able to search pets by city and energy level', async () => {
    
  })
  it('should be able to search pets by city and environment', async () => {
    
  })
  it('should be able to search pets by city and name', async () => {
    
  })
  it('should be able to search pets by city and size', async () => {
    
  })

})