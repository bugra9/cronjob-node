import cron from 'node-cron';
import tesla from './tesla.js';

cron.schedule('* * * * *', () => {
    tesla();
});
