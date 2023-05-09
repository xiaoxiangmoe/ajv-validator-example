import ajv_module from 'ajv';
const Ajv = ajv_module.default;
import addFormatsModule from 'ajv-formats';
const addFormats = addFormatsModule.default;

const defsSchema = {
    $id: 'http://example.com/schemas/defs.json',
    definitions: {
        Weather: {
            codeGen: 'namedEnum',
            description: 'The weather enum',
            oneOf: [
                {
                    const: 1,
                    title: 'Sunny',
                    description: 'Blue sky',
                },
                {
                    const: 2,
                    title: 'Cloudy',
                    description: 'Slightly overcast',
                },
                {
                    const: 3,
                    title: 'Rainy',
                    description: 'Take an umbrella with you',
                },
            ],
        },
    },
};
const ajv = new Ajv({ schemas: [defsSchema] });
addFormats(ajv);
ajv.addVocabulary(['codeGen']);

const schema = {
    $id: 'http://example.com/schemas/schema.json',
    type: 'object',
    properties: {
        month: {
            type: 'number',
            description: 'The month of the year',
        },
        day: {
            type: 'number',
            description: 'The day of the month',
        },
        weather: {
            $ref: 'defs.json#/definitions/Weather',
            description: 'the weather',
        },
    },
    required: ['month', 'day', 'weather'],
    additionalProperties: false,
};

const validate = ajv.compile(schema);

//////////////////////////////////

const data = {
    month: 1,
    day: 1,
    weather: 2,
};

const valid = validate(data);
if (!valid) {
    console.log(validate.errors);
}
