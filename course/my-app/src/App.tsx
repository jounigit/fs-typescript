const Header: React.FC<{ name: string }> = ({ name }) => (
    <h1>Hello, {name}</h1>
);

const Content: React.FC<{ parts: { name: string; exerciseCount: number }[] }> = ({ parts }) => (
    <div>
        {parts.map((part, index) => (
            <p key={index}>
                {part.name} {part.exerciseCount}
            </p>
        ))}
    </div>
);

const Total: React.FC<{ parts: { name: string; exerciseCount: number }[] }> = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return <p>Total number of exercises: {total}</p>;
};  

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
  console.log(`Total number of exercises: ${totalExercises}`);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;