const express = require('express');
const app = express();
const PORT = 9876;

app.use(express.json());

const windowSize = 10;
let numbersWindow = [];

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}
//prime
function generatePrimes(n) {
  const primes = [];
  let num = 2;
  while (primes.length < n) {
    if (isPrime(num)) primes.push(num);
    num++;
  }
  return primes;
}

// Fibonaaci
function generateFibonacci(n) {
  const fib = [0, 1];
  while (fib.length < n) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib.slice(0, n);
}

// even 
function generateEvenNumbers(n) {
  const evens = [];
  for (let i = 1; evens.length < n; i++) {
    if (i % 2 === 0) evens.push(i);
  }
  return evens;
}

// random
function generateRandomNumbers(n) {
  const randoms = [];
  for (let i = 0; i < n; i++) {
    randoms.push(Math.floor(Math.random() * 100) + 1); // random between 1-100
  }
  return randoms;
}

// average
function calculateAverage() {
  if (numbersWindow.length === 0) return 0;
  const sum = numbersWindow.reduce((a, b) => a + b, 0);
  return sum / numbersWindow.length;
}


app.post('/addNumber', (req, res) => {
  const { number } = req.body;
  if (typeof number !== 'number') {
    return res.status(400).json({ error: 'Please provide a number' });
  }

  if (numbersWindow.length >= windowSize) {
    numbersWindow.shift(); // remove oldest number
  }
  numbersWindow.push(number);

  const avg = calculateAverage();
  res.json({ average: avg, currentWindow: numbersWindow });
});


app.get('/primes', (req, res) => {
  res.json({ numbers: generatePrimes(10) });
});

app.get('/fibonacci', (req, res) => {
  res.json({ numbers: generateFibonacci(10) });
});


app.get('/even', (req, res) => {
  res.json({ numbers: generateEvenNumbers(10) });
});


app.get('/random', (req, res) => {
  res.json({ numbers: generateRandomNumbers(10) });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
