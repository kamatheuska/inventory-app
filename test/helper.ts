const helper = require('fastify-cli/helper.js')
import { FastifyInstance } from 'fastify';
import mongoose from 'mongoose';
import * as path from 'path'


const AppPath = path.join(__dirname, '..', 'src', 'app.ts')

export async function config () {
  return {}
}

export async function build (): Promise<FastifyInstance> {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath]

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await helper.build(argv, await config()) as FastifyInstance;


  return app
}

export async function getConnection() {
  // if (!mongoose.connection) {
  //   return await connectToDatabase(process.env.MONGODB_URI!, logger);
  // } else {
    return mongoose.connection;
  // }
}