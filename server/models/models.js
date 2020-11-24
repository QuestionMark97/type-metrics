const { Pool } = require('pg');

const PG_URI = 'postgres://eirhzsjq:GmkIkvq4lKoQC5ioopgGIlIfqfWj1EXW@suleiman.db.elephantsql.com:5432/eirhzsjq';

const pool = new Pool({ connectionString: PG_URI });

pool.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
