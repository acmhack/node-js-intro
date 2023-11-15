const fs = require('fs');
const express = require('express');
const mongodb = require('mongodb');

const client = new mongodb.MongoClient('mongodb+srv://cluster0.ab123.mongodb.net/myFirstDatabase');

client.connect().then(() => {
	client
		.db('database')
		.collection('users')
		.find()
		.toArray()
		.then((users) => {
			console.log(users);
		});
});

const app = express();

let visits = Number(fs.readFileSync('visits.txt').toString());

app.get('/page', (req, res) => {
	visits++;
	fs.writeFileSync('visits.txt', visits.toString());
	res.send(fs.readFileSync('./page.html').toString());
});

app.get('/visits', (req, res) => {
	// res.send(visits.toString());
	res.json({ visits: visits });
});

app.get('/user', (req, res) => {
	res.json({
		name: 'jason',
		password: '123',
		email: 'mail@example.com'
	});
});

app.listen(3000);

