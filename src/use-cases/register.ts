import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "@/repositories/org-already-exists-error";
import bcrypt from "bcryptjs";

interface RegisterUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsapp: string
  password: string
  zip: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute ({       
    name,
    author_name,
    email,
    whatsapp,
    password,
    zip,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude
  }: RegisterUseCaseRequest) {
    const salt = await bcrypt.genSalt(6)
    const password_hash = await bcrypt.hash(password, salt)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }
  
    await this.orgsRepository.create({
        name,
        author_name,
        email,
        whatsapp,
        password_hash,
        zip,
        state,
        city,
        neighborhood,
        street,
        latitude,
        longitude,
    })
  }
}