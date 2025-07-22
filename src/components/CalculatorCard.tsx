import { useState } from 'react';
import { toast } from 'sonner';

interface CalculatorCardProps {
  title: string;
  symbol: string;
  operation: (a: number, b?: number) => number;
  requiresTwoInputs?: boolean;
  placeholder1?: string;
  placeholder2?: string;
  description: string;
}

export const CalculatorCard = ({ 
  title, 
  symbol, 
  operation, 
  requiresTwoInputs = false, 
  placeholder1 = "Enter number",
  placeholder2 = "Enter second number",
  description 
}: CalculatorCardProps) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const num1 = parseFloat(input1);
    
    if (isNaN(num1)) {
      toast.error('Please enter a valid number');
      return;
    }

    try {
      let calcResult: number;
      
      if (requiresTwoInputs) {
        const num2 = parseFloat(input2);
        if (isNaN(num2)) {
          toast.error('Please enter a valid second number');
          return;
        }
        calcResult = operation(num1, num2);
      } else {
        calcResult = operation(num1);
      }

      if (!isFinite(calcResult)) {
        toast.error('Invalid operation result');
        return;
      }

      setResult(calcResult);
      toast.success(`${title} calculated successfully!`);
    } catch (error) {
      toast.error('Calculation error occurred');
    }
  };

  const handleClear = () => {
    setInput1('');
    setInput2('');
    setResult(null);
  };

  return (
    <div className="calc-card">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <div className="text-3xl font-mono mt-2 text-primary">{symbol}</div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </div>
      
      <div className="space-y-3">
        <input
          type="number"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder={placeholder1}
          className="calc-input w-full"
          onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
        />
        
        {requiresTwoInputs && (
          <input
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder={placeholder2}
            className="calc-input w-full"
            onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
          />
        )}
        
        <div className="flex gap-2">
          <button
            onClick={handleCalculate}
            className="calc-operation flex-1"
          >
            Calculate
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-md transition-all duration-200"
          >
            Clear
          </button>
        </div>
        
        {result !== null && (
          <div className="mt-4 p-3 bg-accent rounded-md border-l-4 border-primary">
            <div className="text-sm text-muted-foreground">Result:</div>
            <div className="text-xl font-mono font-bold text-primary">
              {typeof result === 'number' ? result.toFixed(6).replace(/\.?0+$/, '') : result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};