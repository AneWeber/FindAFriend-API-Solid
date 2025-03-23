import { OrgsRepository } from "../orgs-repository";
import { Org, Prisma } from "@prisma/client";
import { randomUUID } from 'node:crypto';

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async findByEmail(email: string){
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput){
    const org = {
      name: data.name,
      id: data.id ?? randomUUID(),
      author_name: data.author_name,
      email: data.email,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      zip: data.zip,
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street
    }

    this.items.push(org)

    return org
  }
}