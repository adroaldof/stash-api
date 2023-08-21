import { tableNames } from '@/database/table-names.mjs'
import { connection } from '@/database/connection'
import { CreatePaymentRepository } from '@/application/ports/payment-repository'

export const createPaymentRepository: CreatePaymentRepository = async (input) => {
  await connection(tableNames.payments).insert(input)
}
