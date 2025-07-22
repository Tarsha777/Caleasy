import { useState, useEffect } from 'react';
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

  // Auto-calculate when inputs change
  useEffect(() => {
    const autoCalculate = () => {
      const num1 = parseFloat(input1);
      
      // Clear result if input1 is empty or invalid
      if (!input1.trim() || isNaN(num1)) {
        setResult(null);
        return;
      }

      try {
        let calcResult: number;
        
        if (requiresTwoInputs) {
          const num2 = parseFloat(input2);
          // Only calculate if both inputs are valid
          if (!input2.trim() || isNaN(num2)) {
            setResult(null);
            return;
          }
          calcResult = operation(num1, num2);
        } else {
          calcResult = operation(num1);
        }

        if (!isFinite(calcResult)) {
          setResult(null);
          return;
        }

        setResult(calcResult);
      } catch (error) {
        setResult(null);
      }
    };

    // Small delay to avoid too many calculations while typing
    const timeoutId = setTimeout(autoCalculate, 300);
    return () => clearTimeout(timeoutId);
  }, [input1, input2, operation, requiresTwoInputs]);

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
        />
        
        {requiresTwoInputs && (
          <input
            type="number"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            placeholder={placeholder2}
            className="calc-input w-full"
          />
        )}
        
        <button
          onClick={handleClear}
          className="w-full px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-md transition-all duration-200"
        >
          Clear
        </button>
        
        {result !== null && (
          <div className="mt-4 p-3 bg-accent rounded-md border-l-4 border-primary animate-fade-in">
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