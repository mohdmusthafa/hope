const app = require('./app');
const sequelize = require('./config/db-config');
const PORT = process.env.PORT || 3000;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function init() {
    await assertDatabaseConnectionOk();
    console.log(`Starting API Server`);

	app.listen(PORT, () => {
		console.log(`Server started on ${PORT}`)
	})
}

init();