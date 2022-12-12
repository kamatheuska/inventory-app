import fp from 'fastify-plugin'
import Env, { FastifyEnvOptions } from '@fastify/env'
import S from 'fluent-json-schema'
import { AppConfig } from '../app.types'

export default fp<FastifyEnvOptions>(async (fastify) => {
  
  await fastify.register(Env, {
    schema: S.object()
      .prop('NODE_ENV', S.string().required())
      .prop('MONGODB_URI', S.string().required())
      .valueOf()
  })
})

declare module 'fastify' {
  export interface FastifyInstance {
    config: AppConfig;
  }
}
