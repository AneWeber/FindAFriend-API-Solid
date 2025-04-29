import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type Overwrite = {
  org_id?: string
  name?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: crypto.randomUUID(),
    name: overwrite?.name ?? faker.animal.petName(),
    about: faker.animal.type(),
    age: overwrite?.age ?? faker.number.int(18).toString(),
    size: overwrite?.size ?? faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy_level: overwrite?.energy_level ?? faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment: overwrite?.environment ?? faker.helpers.arrayElement(['indoor', 'outdoor']),
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
  }
}