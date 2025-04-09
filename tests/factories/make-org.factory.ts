import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string,
  password_hash?: string,
  email?: string,
  city?: string,
}

export function makeOrg(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.company.name(),
    author_name: faker.person.fullName(),
    email: overwrite?.email ?? faker.internet.email(),
    whatsapp: faker.phone.number(),
    password: overwrite?.password ?? faker.internet.password(),
    zip: faker.location.zipCode(),
    state: faker.location.state(),
    city: overwrite?.city ?? faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
  }
}

export function makeOrgWithPasswordHash(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: faker.company.name(),
    author_name: faker.person.fullName(),
    email: overwrite?.email ?? faker.internet.email(),
    whatsapp: faker.phone.number(),
    password_hash: overwrite?.password_hash ?? faker.internet.password(),
    zip: faker.location.zipCode(),
    state: faker.location.state(),
    city: overwrite?.city ?? faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
  }
}