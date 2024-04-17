const fizzOrBlank = (number) => number % 3 === 0 ? 'Fizz' : '';
const buzzOrBlank = (number) => number % 5 === 0 ? 'Buzz' : '';

const checkArgv = () => {
	if (process.argv[2] === undefined) {
		throw new Error('Please enter a positive number greater than 0');
	}
	const number = Number.parseInt(process.argv[2]);
	if (Number.isNaN(number) || number < 1) {
		throw new Error('Please enter a positive number greater than 0');
	}
	return number;
}

const getFizzBuzzOutput = (number) => {
	const fizz = fizzOrBlank(number);
	const buzz = buzzOrBlank(number);
	return fizz + buzz || number;
};

// we are using generator function to generate the fizzbuzz output
// this allows us to generate the output for any number of times
// and not break the memory limit
function* fizzBuzzGenerator(number) {
	for (let i = 1; i <= number; i++) {
		yield getFizzBuzzOutput(i);
	}
}

const main = () => {
	try {
		const number = checkArgv();
		const fizzBuzzIterator = fizzBuzzGenerator(number);
		for (const value of fizzBuzzIterator) {
			console.log(value);
		}
	} catch (error) {
		console.error(error.message);
	}
}

main();