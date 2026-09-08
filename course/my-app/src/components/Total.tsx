export const Total: React.FC<{ parts: { name: string; exerciseCount: number }[] }> = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return <p>Total number of exercises: {total}</p>;
}; 