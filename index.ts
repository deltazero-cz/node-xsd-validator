import { parseXmlString, ValidationError, ParserOptions } from "libxmljs"

// todo: bin linking

export default function validateSchema(
    xml: string|Buffer,
    xsdSchema: string|Buffer,
    xmlParserOptions ?: ParserOptions,
    xsdParserOptions ?: ParserOptions
) : true|ValidationError[] {
  const parsedXML = parseXmlString(xml.toString(), xmlParserOptions),
        parsedSchema = parseXmlString(xsdSchema.toString(), xsdParserOptions)

  return parsedXML.validate(parsedSchema) || parsedXML.validationErrors
}

export { ValidationError }
