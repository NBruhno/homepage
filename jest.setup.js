import { TextEncoder, TextDecoder, ReadableStream } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
global.ReadableStream = ReadableStream
