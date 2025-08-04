import { FloatingSymbols } from '@/components/FloatingSymbols';
import { CalculatorCard } from '@/components/CalculatorCard';
import calculatorLogo from '@/assets/calculator-logo.png';

const Index = () => {
  // Mathematical operation definitions
  const operations = [
    {
      title: 'Addition',
      symbol: '+',
      operation: (a: number, b: number) => a + b,
      requiresTwoInputs: true,
      placeholder1: 'First number',
      placeholder2: 'Second number',
      description: 'Add two numbers together'
    },
    {
      title: 'Subtraction',
      symbol: '−',
      operation: (a: number, b: number) => a - b,
      requiresTwoInputs: true,
      placeholder1: 'First number',
      placeholder2: 'Second number',
      description: 'Subtract second from first'
    },
    {
      title: 'Multiplication',
      symbol: '×',
      operation: (a: number, b: number) => a * b,
      requiresTwoInputs: true,
      placeholder1: 'First number',
      placeholder2: 'Second number',
      description: 'Multiply two numbers'
    },
    {
      title: 'Division',
      symbol: '÷',
      operation: (a: number, b: number) => {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      },
      requiresTwoInputs: true,
      placeholder1: 'Dividend',
      placeholder2: 'Divisor',
      description: 'Divide first by second'
    },
    {
      title: 'Modulo',
      symbol: '%',
      operation: (a: number, b: number) => a % b,
      requiresTwoInputs: true,
      placeholder1: 'First number',
      placeholder2: 'Second number',
      description: 'Remainder of division'
    },
    {
      title: 'Percentage',
      symbol: '%',
      operation: (a: number, b: number) => (a * b) / 100,
      requiresTwoInputs: true,
      placeholder1: 'Percentage',
      placeholder2: 'Of number',
      description: 'Calculate percentage of number'
    },
    {
      title: 'Square',
      symbol: 'x²',
      operation: (a: number) => a * a,
      requiresTwoInputs: false,
      placeholder1: 'Enter number',
      description: 'Square of a number'
    },
    {
      title: 'Cube',
      symbol: 'x³',
      operation: (a: number) => a * a * a,
      requiresTwoInputs: false,
      placeholder1: 'Enter number',
      description: 'Cube of a number'
    },
    {
      title: 'Square Root',
      symbol: '√x',
      operation: (a: number) => {
        if (a < 0) throw new Error('Cannot take square root of negative number');
        return Math.sqrt(a);
      },
      requiresTwoInputs: false,
      placeholder1: 'Enter number',
      description: 'Square root of a number'
    },
    {
      title: 'Cube Root',
      symbol: '∛x',
      operation: (a: number) => Math.cbrt(a),
      requiresTwoInputs: false,
      placeholder1: 'Enter number',
      description: 'Cube root of a number'
    },
    {
      title: 'Power of 2',
      symbol: '2ⁿ',
      operation: (a: number) => Math.pow(2, a),
      requiresTwoInputs: false,
      placeholder1: 'Enter exponent',
      description: '2 raised to the power of n'
    },
    {
      title: 'Power of N',
      symbol: 'xⁿ',
      operation: (a: number, b: number) => Math.pow(a, b),
      requiresTwoInputs: true,
      placeholder1: 'Base',
      placeholder2: 'Exponent',
      description: 'Base raised to the power of exponent'
    },
    {
      title: 'Factorial',
      symbol: 'n!',
      operation: (a: number) => {
        if (a < 0 || !Number.isInteger(a)) throw new Error('Factorial only for non-negative integers');
        if (a > 170) throw new Error('Number too large for factorial');
        let result = 1;
        for (let i = 2; i <= a; i++) result *= i;
        return result;
      },
      requiresTwoInputs: false,
      placeholder1: 'Enter integer',
      description: 'Factorial of a number'
    },
    {
      title: 'Natural Log',
      symbol: 'ln(x)',
      operation: (a: number) => {
        if (a <= 0) throw new Error('Logarithm only for positive numbers');
        return Math.log(a);
      },
      requiresTwoInputs: false,
      placeholder1: 'Enter number',
      description: 'Natural logarithm (base e)'
    },
    {
      title: 'Log Base 10',
      symbol: 'log₁₀(x)',
      operation: (a: number) => {
        if (a <= 0) throw new Error('Logarithm only for positive numbers');
        return Math.log10(a);
      },
      requiresTwoInputs: false,
      placeholder1: 'Enter number',
      description: 'Logarithm base 10'
    },
    {
      title: 'Log Base N',
      symbol: 'logₙ(x)',
      operation: (a: number, b: number) => {
        if (a <= 0 || b <= 0) throw new Error('Logarithm only for positive numbers');
        if (b === 1) throw new Error('Base cannot be 1');
        return Math.log(a) / Math.log(b);
      },
      requiresTwoInputs: true,
      placeholder1: 'Number',
      placeholder2: 'Base',
      description: 'Logarithm with custom base'
    },
    {
      title: 'Sine',
      symbol: 'sin(x)',
      operation: (a: number) => Math.sin(a),
      requiresTwoInputs: false,
      placeholder1: 'Angle in radians',
      description: 'Sine of angle in radians'
    },
    {
      title: 'Cosine',
      symbol: 'cos(x)',
      operation: (a: number) => Math.cos(a),
      requiresTwoInputs: false,
      placeholder1: 'Angle in radians',
      description: 'Cosine of angle in radians'
    },
    {
      title: 'Tangent',
      symbol: 'tan(x)',
      operation: (a: number) => Math.tan(a),
      requiresTwoInputs: false,
      placeholder1: 'Angle in radians',
      description: 'Tangent of angle in radians'
    },
    {
      title: 'Exponential',
      symbol: 'eˣ',
      operation: (a: number) => Math.exp(a),
      requiresTwoInputs: false,
      placeholder1: 'Enter exponent',
      description: 'e raised to the power of x'
    },
    {
      title: 'Rectangle Area',
      symbol: 'A□',
      operation: (a: number, b: number) => a * b,
      requiresTwoInputs: true,
      placeholder1: 'Length',
      placeholder2: 'Width',
      description: 'Area of rectangle (length × width)'
    },
    {
      title: 'Triangle Area',
      symbol: 'A△',
      operation: (a: number, b: number) => (a * b) / 2,
      requiresTwoInputs: true,
      placeholder1: 'Base',
      placeholder2: 'Height',
      description: 'Area of triangle (base × height ÷ 2)'
    },
    {
      title: 'Circle Area',
      symbol: 'A○',
      operation: (a: number) => Math.PI * a * a,
      requiresTwoInputs: false,
      placeholder1: 'Radius',
      description: 'Area of circle (π × radius²)'
    },
    {
      title: 'Square Area',
      symbol: 'A⬜',
      operation: (a: number) => a * a,
      requiresTwoInputs: false,
      placeholder1: 'Side length',
      description: 'Area of square (side²)'
    },
    {
      title: 'Trapezoid Area',
      symbol: 'A⬢',
      operation: (a: number, b: number) => (a * b) / 2,
      requiresTwoInputs: true,
      placeholder1: 'Sum of bases (b1+b2)',
      placeholder2: 'Height',
      description: 'Area of trapezoid (sum of bases × height ÷ 2)'
    },
    {
      title: 'Parallelogram Area',
      symbol: 'A▱',
      operation: (a: number, b: number) => a * b,
      requiresTwoInputs: true,
      placeholder1: 'Base',
      placeholder2: 'Height',
      description: 'Area of parallelogram (base × height)'
    },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingSymbols />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src={calculatorLogo} 
              alt="Calculator Logo" 
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-5xl font-bold text-foreground">
              Mathematical Calculator
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interactive mathematical operations at your fingertips. 
            Each operation is ready to use - just enter your numbers and calculate instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {operations.map((op, index) => (
            <CalculatorCard
              key={index}
              title={op.title}
              symbol={op.symbol}
              operation={op.operation}
              requiresTwoInputs={op.requiresTwoInputs}
              placeholder1={op.placeholder1}
              placeholder2={op.placeholder2}
              description={op.description}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-card rounded-lg border border-border shadow-[var(--shadow-soft)]">
            <h2 className="text-lg font-semibold text-foreground mb-2">Quick Tips</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Results appear automatically as you type</li>
              <li>• All operations provide instant calculations</li>
              <li>• Clear button resets each calculation</li>
              <li>• Trigonometric functions use radians</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;