import { statement } from './statement.js';
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const invoices = require('./invoices.json');
const plays = require('./plays.json');

const result = statement(invoices[0], plays);

console.log('\n\n');
console.log(result);
