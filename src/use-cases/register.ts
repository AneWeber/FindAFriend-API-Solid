import { OrgsRepository } from "@/repositories/orgs-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { Org } from "@prisma/client";
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
}

interface RegisterUseCaseResponse {
  org: Org
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
    street
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
  
    if (orgWithSameEmail) throw new OrgAlreadyExistsError()
      
    const password_hash = await bcrypt.hash(password, await bcrypt.genSalt(6))

    const org = await this.orgsRepository.create({
        name,
        author_name,
        email,
        whatsapp, 
        password_hash,
        zip,
        state,
        city,
        neighborhood,
        street
    })

    return {
      org,
    }
  }
}