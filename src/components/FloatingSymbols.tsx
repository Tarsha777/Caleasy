import { useEffect, useState } from 'react';

const mathSymbols = [
  '∑', '∏', '∫', '∂', '∞', '√', '∛', '∜', 'π', 'φ', 'θ', 'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'λ', 'μ', 'ν', 'ξ', 'ρ', 'σ', 'τ', 'ω',
  '±', '×', '÷', '=', '≠', '≈', '≡', '≤', '≥', '<', '>', '∝', '∈', '∉', '⊂', '⊃', '∪', '∩', '∅', 
  'sin', 'cos', 'tan', 'log', 'ln', 'exp', 'lim', 'max', 'min', 'Σ', 'Π', 'f(x)', 'x²', 'x³', 'xⁿ', '2ⁿ',
  '!', '%', '^', '√x', '∛x', 'logₙ', 'f⁻¹', '∇', '∆'
];

interface FloatingSymbol {
  id: string;
  symbol: string;
  x: number;
  y: number;
  animationClass: string;
}

export const FloatingSymbols = () => {
  const [symbols, setSymbols] = useState<FloatingSymbol[]>([]);

  useEffect(() => {
    const generateSymbols = () => {
      const newSymbols: FloatingSymbol[] = [];
      
      for (let i = 0; i < 25; i++) {
        newSymbols.push({
          id: `symbol-${i}`,
          symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          animationClass: `float-${(i % 6) + 1}`,
        });
      }
      
      setSymbols(newSymbols);
    };

    generateSymbols();

    // Regenerate symbols periodically for variety
    const interval = setInterval(generateSymbols, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className={`floating-symbol ${symbol.animationClass}`}
          style={{
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            fontSize: Math.random() * 1.5 + 1 + 'rem',
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
};