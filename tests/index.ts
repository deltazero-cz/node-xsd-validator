import validateSchema, { ValidationError } from '../index'
import { expect } from 'chai'
import * as fs from 'fs'

const valid = fs.readFileSync(__dirname + '/invoice.xml'),
      invalid = fs.readFileSync(__dirname + '/invoice.invalid.xml'),
      xsd = fs.readFileSync(__dirname + '/isdoc-invoice-6.0.2.xsd')

describe('Valid File', () => {
  const validation = validateSchema(valid, xsd)
  it('Is Valid', () => expect(validation).to.be.true)
})

describe('Invalid File', () => {
  const validation = validateSchema(invalid, xsd) as ValidationError[],
        errors = [
            `DocumentType': [facet 'enumeration'] The value '9' is not an element of the set {'1', '2', '3', '4', '5', '6', '7'}.`,
            `DocumentType': '9' is not a valid value of the atomic type '{http://isdoc.cz/namespace/2013}DocumentTypeType'.`,
            `UUID': [facet 'pattern'] The value 'AEC4791C-4BA1-451E-A1DC' is not accepted by the pattern '[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}'.`,
            `UUID': 'AEC4791C-4BA1-451E-A1DC' is not a valid value of the atomic type '{http://isdoc.cz/namespace/2013}UUIDType'.`,
        ]

  it('Is Invalid', () => {
    expect(validation).to.be.an('array')
    // noinspection SuspiciousTypeOfGuard
    expect(validation).to.satisfy((errs : ValidationError[]) => errs.every(e => e instanceof Error))
  })

  errors.forEach(e =>
    it (`Error: ${e.split(`': `)[0]} Recognized`, () => expect(validation[0]?.message.includes(e))))
})
