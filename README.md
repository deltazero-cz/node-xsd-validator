# Validating XMLs against XSD schema

Tool for simple validation of XML documents against a XSD schema. Using [libxml](https://github.com/GNOME/libxml2) via [libxmljs](https://github.com/libxmljs/libxmljs).

### Installation

```shell
npm i xsd-validator
```

### Usage

```js
import validateSchema from 'xsd-validator'

// returns true for valid documents
validateSchema('<xml...', '<xs:schema...')
// -> true

// returns Error[] for invalid valid documents
validateSchema('<xml...', '<xs:schema...')
// [error, error ... ]

```

### Requirements

Make sure you have met the requirements for [node-gyp](https://github.com/TooTallNate/node-gyp#installation). You DO NOT need to manually install node-gyp; it comes bundled with node.
