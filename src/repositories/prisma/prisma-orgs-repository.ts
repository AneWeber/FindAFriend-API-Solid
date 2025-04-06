import { prisma } from '@/lib/prisma'
import { Prisma, Org } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }

  async findManyByCity(city: string, page: number): Promise<Org[]> {
    const orgs = await prisma.org.findMany({
      where: {
        city: {
          contains: city,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return orgs
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}