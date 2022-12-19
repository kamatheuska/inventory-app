import * as dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

import * as ingredientsData from '../../ingredients/ingredients.data.json';
import Ingredients from '../../ingredients/ingredients.model';
import { connectToDatabase } from '../../lib/db/connect';

const logger = pino();

async function seedIngredients() {
    const json = ingredientsData;
    const result = await Ingredients.insertMany(json);

    if (result.length === json.length) {
        logger.info(`Seeded ${result.length} ingredients to the database`);
    } else {
        throw new Error('Error on seeding ingredients');
    }
}

async function seed() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('Seed needs a uri to connect to the db');

    const connection = await connectToDatabase(uri);
    logger.info('Connected to database');
    await seedIngredients();

    connection.close();
}

seed().catch((error) => {
    logger.error(error);
    throw error;
});
