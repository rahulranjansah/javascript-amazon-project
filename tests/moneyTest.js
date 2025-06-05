import { formatCurrency } from "../scripts/utils/money.js";


// test cases

console.log('test suite: format currency')
console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95')
{
    console.log('passed');
}

else
{
    console.log('failed');
}

// edge case

console.log('works with zero');

if (formatCurrency(0) === '0.00')
    {
        console.log('passed');
    }

    else
    {
        console.log('failed');
    }

console.log('works with actual value');

if (formatCurrency(100) === '1.00')
{
    console.log('passed');
}

else
{
    console.log('failed');
}

// edge case

console.log('test suite: negative values');
console.log('fails with negative value');

if (formatCurrency(-0.3) === '-0.00')
    {
        console.log('passed');
    }

    else
    {
        console.log('failed');
    }
console.log('test suite: Rounding values');
console.log('rounds up correctly');

if (formatCurrency(200.5) === '2.01')
{
    console.log('passed');
}

else
{
    console.log('failed');
}

console.log('rounds down correctly');

if (formatCurrency(200.4) === '2.00')
    {
        console.log('passed');
    }

    else
    {
        console.log('failed');
    }