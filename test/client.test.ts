import { createClient, SupabaseClient } from '../src/index'

const URL = 'http://localhost:3000'
const KEY = 'some.fake.key'

const supabase = createClient(URL, KEY)

test('it should create the client connection', async () => {
  expect(supabase).toBeDefined()
  expect(supabase).toBeInstanceOf(SupabaseClient)
})

test('it should throw an error if no valid params are provided', async () => {
  expect(() => createClient('', KEY)).toThrowError('supabaseUrl is required.')
  expect(() => createClient(URL, '')).toThrowError('supabaseKey is required.')
})

describe('Custom Headers', () => {
  test('should have custom header set', () => {
    const customHeader = { 'X-Test-Header': 'value' }

    const request = createClient(URL, KEY, { global: { headers: customHeader } }).rpc('')

    // @ts-ignore
    const getHeaders = request.headers

    expect(getHeaders).toHaveProperty('X-Test-Header', 'value')
  })
})

describe('Realtime url', () => {
  test('should switch protocol from http to ws', () => {
    const client = createClient('http://localhost:3000', KEY)

    // @ts-ignore
    const realtimeUrl = client.realtimeUrl

    expect(realtimeUrl).toEqual('ws://localhost:3000/realtime/v1')
  })

  test('should switch protocol from https to wss', () => {
    const client = createClient('https://localhost:3000', KEY)

    // @ts-ignore
    const realtimeUrl = client.realtimeUrl

    expect(realtimeUrl).toEqual('wss://localhost:3000/realtime/v1')
  })

  test('should ignore case', () => {
    const client = createClient('HTTP://localhost:3000', KEY)

    // @ts-ignore
    const realtimeUrl = client.realtimeUrl

    expect(realtimeUrl).toEqual('ws://localhost:3000/realtime/v1')
  })
})

// Socket should close when there are no open connections
// https://github.com/supabase/supabase-js/issues/44

// Should throw an error when the URL and KEY isn't provided
// https://github.com/supabase/supabase-js/issues/49
