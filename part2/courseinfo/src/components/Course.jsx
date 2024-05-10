const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sumOfExercises }) => <p><strong>Number of exercises {sumOfExercises}</strong></p>

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => ( 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  const parts = course.parts;
  
  const sum = (parts) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return totalExercises;
  };
  
  return (
    <>
      <Header name={course.name} />
      <Content parts={parts} />
      <Total sumOfExercises={sum(parts)} /> 
    </>
  );
};

export default Course