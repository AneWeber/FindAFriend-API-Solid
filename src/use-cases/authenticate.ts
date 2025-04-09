import { OrgsRepository } from "@/repositories/orgs-repository"
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { compare } from "bcryptjs"
import { sanitizeOrg, OrgDTO } from '@/utils/sanitize-org'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: OrgDTO
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const passwordMatches = await compare(password, org.password_hash)

    if (!passwordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org: sanitizeOrg(org),
    }
  }
}
