#!/usr/bin/env node
const http = require('http');
const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const config = require('./config');
const apiKey = config.apiKey;
const api = `http://api.weatherstack.com/current?access_key=${apiKey}`;

rl.question('', input => {
	const weatherRequest = `${api}&query=${input}`;

	http
		.get(weatherRequest, res => {
			const { statusCode } = res;
			if (statusCode !== 200) {
				console.log(`statusCode: ${statusCode}`);
				return;
			}

			let responseBody = '';

			res.setEncoding('utf8');
			res.on('data', chunk => (responseBody += chunk));
			res.on('end', () => {
				const parseData = JSON.parse(responseBody);
				console.log(parseData);
			});
		})
		.on('error', err => {
			console.error(err);
		});

	rl.close();
});
