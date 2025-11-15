interface CO2DisplayProps {
  value: number
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function CO2Display({
  value,
  unit = 'kg',
  size = 'md',
  showLabel = true,
}: CO2DisplayProps) {
  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(2)}M`
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2)}K`
    }
    return val.toFixed(2)
  }

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  return (
    <div className="flex flex-col items-center">
      {showLabel && (
        <span className="text-sm text-gray-600 mb-1">CO₂ Absorbed</span>
      )}
      <div className={`font-bold text-primary-green ${sizeClasses[size]}`}>
        {formatValue(value)} {unit}
      </div>
    </div>
  )
}

