import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  findManyByCity(city: string, page: number): Promise<Org[]>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}