import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository"; 
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { expect, describe, it, beforeEach} from 'vitest'
import { PetRegisterUseCase } from "./pet-register"
import { OrgNotFoundError } from "./errors/org-not-found-error";
import { makePet } from "tests/factories/make-pet.factory";
import { makeOrgWithPasswordHash } from "tests/factories/make-org.factory";

describe('Create Pet Use Case', ()=> {
  let petsRepository: InMemoryPetsRepository
  let orgsRepository: InMemoryOrgsRepository
  let sut: PetRegisterUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new PetRegisterUseCase(petsRepository, orgsRepository)
  })
  
  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create(makeOrgWithPasswordHash())
    const { pet } = await sut.execute(makePet({ org_id: org.id}))

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet without an organization', async () => {
    const pet = makePet()

    await petsRepository.create(pet)

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})