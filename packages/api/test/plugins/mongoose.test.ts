import { test } from 'tap';
import { build } from '../helper';

test('Plugins:Mongoose Startup', { timeout: 15000 }, async (t) => {
    const app = await build({ MONGODB_SERVER_SELECTION_TIMEOUT_MS: 1500 });
    t.ok(app, 'should mount the app and connect to MongoDB');
    await app.close();
});
