import { Org } from "@prisma/client"

export interface OrgDTO {
  id: string
  name: string
  author_name: string
  email: string
  whatsapp: string
  zip: string
  state: string
  city: string
  neighborhood: string
  street: string
}

export function sanitizeOrg(org: Org): OrgDTO {
  return {
    id: org.id,
    name: org.name,
    author_name: org.author_name,
    email: org.email,
    whatsapp: org.whatsapp,
    zip: org.zip,
    state: org.state,
    city: org.city,
    neighborhood: org.neighborhood,
    street: org.street,
  }
}