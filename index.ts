import { parseXml } from "libxmljs"
import type { XMLParseOptions } from "libxmljs"

// todo: bin linking

export default function validateSchema(
    xml: string|Buffer,
    xsdSchema: string|Buffer,
    xmlParserOptions ?: XMLParseOptions,
    xsdParserOptions ?: XMLParseOptions
) : true|ValidationError[] {
  const parsedXML = parseXml(xml.toString(), xmlParserOptions),
        parsedSchema = parseXml(xsdSchema.toString(), xsdParserOptions)

  // @ts-ignore
  return parsedXML.validate(parsedSchema) || parsedXML.validationErrors
}

export interface ValidationError extends Error {
  domain: number|null;
  code: number|null;
  level: number|null;

  line: number|null;
  column: number;
}
