/**
 * @jest-environment node
 */
const config = require('./config.json');
const Client = require('../dist');
const client = new Client(config.url, config);

it('Test domain upload', async () => {
  const result = await client.domain.upload({
    domain_name: config.domain_name,
    image: config.image
  });

  expect(typeof result).toBe('object');
  expect(typeof result.status).toBe('object');
  expect(typeof result.status.code).toBe('number');
  expect(typeof result.status.message).toBe('string');
});

it('Test domain status', async () => {
  const result = await client.domain.status({
    domain_name: config.domain_name,
    lang: 'zh_CN'
  });

  expect(typeof result).toBe('object');
  expect(typeof result.status).toBe('object');
  expect(typeof result.status.code).toBe('number');
  expect(typeof result.status.message).toBe('string');
});

it('Test registrant upload', async () => {
  const result = await client.registrant.upload({
    registrant_id: config.registrant_id,
    image: config.image
  });

  expect(typeof result).toBe('object');
  expect(typeof result.status).toBe('object');
  expect(typeof result.status.code).toBe('number');
  expect(typeof result.status.message).toBe('string');
});

it('Test registrant status', async () => {
  const result = await client.registrant.status({
    registrant_id: config.registrant_id,
    lang: 'zh_CN'
  });

  expect(typeof result).toBe('object');
  expect(typeof result.status).toBe('object');
  expect(typeof result.status.code).toBe('number');
  expect(typeof result.status.message).toBe('string');
});