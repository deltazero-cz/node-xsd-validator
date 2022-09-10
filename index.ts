import { parseXmlString, ValidationError} from "libxmljs"

export default function validateSchema(
    xml: string|Buffer,
    xsdSchema: string|Buffer
) : true|ValidationError[] {
  const parsedXML = parseXmlString(xml.toString()),
        parsedSchema = parseXmlString(xsdSchema.toString())

  return parsedXML.validate(parsedSchema) || parsedXML.validationErrors
}

export { ValidationError }
