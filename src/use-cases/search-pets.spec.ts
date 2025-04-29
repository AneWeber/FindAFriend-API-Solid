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
    const org = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org.id, age: '2' }))
    await petsRepository.create(makePet({ org_id: org.id, age: '3'  }))

    const org2 = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org2.id, age: '4' }))
    await petsRepository.create(makePet({ org_id: org2.id, age: '5' }))

    const { pets } = await sut.execute({ city: org.city, age: '2' })
    expect(pets).toHaveLength(1)

    const { pets: pets2 } = await sut.execute({ city: org2.city, age: '5' })
    expect(pets2).toHaveLength(1)  
  })

  it('should be able to search pets by city and energy level', async () => {
    const org = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org.id, energy_level: 'medium' }))
    await petsRepository.create(makePet({ org_id: org.id, energy_level: 'medium'  }))

    const org2 = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org2.id, energy_level: 'low' }))
    await petsRepository.create(makePet({ org_id: org2.id, energy_level: 'low' }))

    const { pets } = await sut.execute({ city: org.city, energy_level: 'medium' })
    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city, energy_level: 'low' })
    expect(pets2).toHaveLength(2)    
  })

  it('should be able to search pets by city and environment', async () => {
    const org = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor' }))
    await petsRepository.create(makePet({ org_id: org.id, environment: 'indoor'  }))

    const org2 = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org2.id, environment: 'indoor' }))
    await petsRepository.create(makePet({ org_id: org2.id, environment: 'outdoor' }))

    const { pets } = await sut.execute({ city: org.city, environment: 'indoor' })
    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: org2.city, environment: 'indoor' })
    expect(pets2).toHaveLength(1)  
  })
  
  it('should be able to search pets by city and name', async () => {
    const org = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org.id, name: 'good boy' }))
    await petsRepository.create(makePet({ org_id: org.id, name: 'thief boy'  }))

    const { pets } = await sut.execute({ city: org.city, name: 'good boy' })
    expect(pets).toHaveLength(1)
  })
  
  it('should be able to search pets by city and size', async () => {
    const org = await orgsRepository.create(makeOrgWithPasswordHash())
    await petsRepository.create(makePet({ org_id: org.id, size: 'small' }))
    await petsRepository.create(makePet({ org_id: org.id, size: 'big'  }))

    const { pets } = await sut.execute({ city: org.city, size: 'small' })
    expect(pets).toHaveLength(1)
  })

})