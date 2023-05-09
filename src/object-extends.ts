import ajv_module from 'ajv';
const Ajv = ajv_module.default;
import addFormatsModule from 'ajv-formats';
const addFormats = addFormatsModule.default;

const defsSchema = {
    $id: 'http://example.com/schemas/defs.json',
    definitions: {
        ButtonCommonParams: {
            type: 'object',
            properties: {
                photoId: { type: 'number' },
                userId: { type: 'number' },
            },
            required: ['photoId', 'userId'],
        },
    },
};
const ajv = new Ajv({ schemas: [defsSchema] });
addFormats(ajv);
ajv.addVocabulary(['codeGen']);

const schema = {
    $id: 'http://example.com/schemas/schema.json',
    type: 'object',
    allOf: [
        { $ref: 'defs.json#/definitions/ButtonCommonParams' },
        {
            type: 'object',
            properties: {
                buttonText: {
                    description: 'The text on the button',
                    type: 'string',
                },
            },
            required: ['buttonText'],
        },
    ],
};

const validate = ajv.compile(schema);

//////////////////////////////////

const data = {
    photoId: 1,
    userId: 1,
    buttonText: 'hello button',
};

const valid = validate(data);
if (!valid) {
    console.log(validate.errors);
}
