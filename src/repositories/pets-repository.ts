import { Prisma, Pet } from '@prisma/client'

export interface FindAllParams {
  city: string
  name?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByOrgId(orgId: string, page: number): Promise<Pet[] | null>
  findAll(params: FindAllParams): Promise<Pet[]>
}