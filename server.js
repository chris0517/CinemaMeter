import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';
import { dir } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));




app.post('/api/loadCollection', (req, res) => {
	let connection = mysql.createConnection(config);
	let userID = req.body;
	let sql = `SELECT * FROM collection WHERE userID = ?`;
	let data = [userID];
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/addCollection', (req, res) => {

	let connection = mysql.createConnection(config);
	const {name, userID, movieID} = req.body;

	let sql = `
	INSERT INTO collection (movieID, userID, movieName)
	VALUES (?, ?, ?)`;


	console.log(sql);
	let data = [movieID, userID, name];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end();
});




app.post('/api/loadMyPageRank', (req, res) => {

	let connection = mysql.createConnection(config);
	const {number} = req.body;

	let sql = `
		SELECT name, rating
		FROM movies 
		ORDER BY rating DESC
		LIMIT ?`;


	console.log(sql);
	let data = [number];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});

	connection.end();
});


app.post('/api/loadSearchResult', (req, res) => {
	let connection = mysql.createConnection(config);
	const {movieID, actorFirst, actorLast, dirFirst, dirLast} = req.body;



	let sql = `SELECT M.name, R.reviewTitle, R.reviewContent, R.reviewScore, D.first_name AS director_first_name, D.last_name AS director_last_name, (SELECT AVG(reviewScore) 
	FROM Review WHERE movieID = M.id GROUP BY movieID) AS average_review_score
	FROM Review R, roles RO, actors A, movies M, directors D, movies_directors MD
	WHERE R.movieID = M.id
	AND M.id = RO.movie_id
	AND RO.actor_id = A.id
	AND M.id = MD.movie_id
	AND MD.director_id = D.id`;

	let data = [];

	if(movieID) {
		sql = sql + ` AND R.movieID = ?`;
		data.push(movieID);
	}
	if(actorFirst && actorLast){
		sql = sql + ` AND A.first_name = ?
		AND A.last_name = ?`;

		data.push(actorFirst, actorLast);
	}
	if(dirFirst && dirLast){
		sql = sql + ` AND D.first_name = ?
		AND D.last_name = ?`;
		data.push(dirFirst, dirLast)
	}
	sql = sql + ` GROUP BY R.reviewID, M.id, D.id`;

	console.log (sql);
	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});


app.post('/api/loadUserSettings', (req, res) => {

	let connection = mysql.createConnection(config);
	let userID = req.body.userID;

	let sql = `SELECT mode FROM user WHERE userID = ?`;
	console.log(sql);
	let data = [userID];
	console.log(data);

	connection.query(sql, data, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		//let obj = JSON.parse(string);
		res.send({ express: string });
	});

	connection.end();
});

app.post('/api/getMovies', (req, res) => {
	let connection = mysql.createConnection(config);
	let sql = `SELECT * FROM movies`;

	connection.query(sql, (error, results, fields) => {
		if (error) {
			return console.error(error.message);
		}

		let string = JSON.stringify(results);
		res.send({ express: string });
	});
	connection.end();
});



app.post('/api/addReview', (req, res) => {
	let connection = mysql.createConnection(config);
	const {reviewTitle, reviewContent, reviewScore, userID, movieID} = req.body;

	let sql = `INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES (?, ?, ?, ?, ?)`;
	let data = [reviewTitle, reviewContent, reviewScore, userID, movieID];
	connection.query(sql, data, (error, result) => {
		if (error) {
			return console.error(error.message);
		}
		let string = JSON.stringify("Data Sent Successfully");
		res.send({ express: string });
	});
	connection.end();
});



app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server