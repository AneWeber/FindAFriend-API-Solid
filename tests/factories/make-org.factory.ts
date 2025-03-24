import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  password?: string,
  email?: string,
}

//TODO: send password_hash instead
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
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
    street: faker.location.street(),
  }
}