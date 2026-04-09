const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lab 3 Translation API',
      version: '1.0.0',
      description: 'API documentation for language, dictionary, words, and translation endpoints.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    paths: {
      '/languages': {
        get: {
          tags: ['Language'],
          summary: 'Get all languages',
          responses: {
            200: {
              description: 'List of languages',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/dictionaries': {
        get: {
          tags: ['Dictionary'],
          summary: 'Get all dictionaries',
          responses: {
            200: {
              description: 'List of dictionaries',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'object',
                      additionalProperties: true,
                    },
                  },
                },
              },
            },
            500: {
              description: 'Server error',
            },
          },
        },
      },
      '/words': {
        get: {
          tags: ['Word'],
          summary: 'Get all words',
          responses: {
            200: {
              description: 'List of words',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            500: {
              description: 'Server error',
            },
          },
        },
      },
      '/translate': {
        get: {
          tags: ['Translation'],
          summary: 'Translate a word',
          parameters: [
            {
              in: 'query',
              name: 'word',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Word to translate',
            },
            {
              in: 'query',
              name: 'lang',
              required: false,
              schema: {
                type: 'string',
              },
              description: 'Target language code',
            },
          ],
          responses: {
            200: {
              description: 'Translation found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      original: {
                        type: 'string',
                      },
                      translation: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Missing required query parameter',
            },
            404: {
              description: 'Translation not found',
            },
            500: {
              description: 'Server error',
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJSDoc(options);
