// import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import server from './server';
import dotenv from 'dotenv';
import { join } from 'path';
import sequelize from './database/sequelize';

dotenv.config({ path: join(__dirname, '..', '.env')});

// Constants
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT, async () => {
    try {
        await sequelize.authenticate().then(() => {
            logger.info("Sequelize Connection Success");
            logger.info('Express server started on port: ' + PORT);
        });
    } catch (error) {
        logger.err(new Error('printing out an error full'), true);
    }
});
