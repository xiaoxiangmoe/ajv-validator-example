import ajv_module from 'ajv';
const Ajv = ajv_module.default;
import addFormatsModule from 'ajv-formats';
const addFormats = addFormatsModule.default;

const ajv = new Ajv({ schemas: [], strict: true });
addFormats(ajv);

{
    const schema = {
        type: 'object',
        properties: {
            foo: {
                description: 'The foo property',
                type: 'integer',
            },
            bar: {
                description: 'The bar property',
                type: 'string',
            },
        },
        required: ['foo'],
        additionalProperties: false,
    };

    const validate = ajv.compile(schema);

    //////////////////////////////////

    {
        const data = {
            foo: 1,
            bar: 'abc',
        };

        const valid = validate(data);
        if (!valid) {
            console.log(validate.errors);
        }
    }
}
