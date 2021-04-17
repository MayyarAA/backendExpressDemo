import express from 'express';
import data from './data/data.json';

const app = express();
const router = express.Router();
const PORT = 3200;

app.use(logger);

app.get('/', (req, res) => res.send(`a get req on paht / on port ${PORT}`));

//http://localhost:3200/users/2
app.get(
	'/users/:id',
	(req, res, next) => {
		// throw new Error();
		let user = Number(req.params.id);
		res.send(data[user]);
		// next();
	},
	(req, res) => {
		console.log('second response from second middleware component');
	}
);

app.get('/getAllItem', auth, (req, res, next) => {
	next();
	res.send('user is authenticaed successfully here is the user page');
	console.log('erorr in auth');
});

app.use((err, req, res, next) => {
	res.send(`Error from custom logic ${err.stack}`);
});

app.listen(PORT, () => {
	// console.log(data);
	console.log(`your server is listing on ${PORT}`);
});

function logger(req, res, next) {
	console.log('logging form the logger middleware ');
	next();
}

function auth(req, res, next) {
	if (req.query.admin === 'true') {
		next();
	} else {
		res.send('user is not authenticated');
	}
}
