import React from 'react';

const Total = ({ parts }) => {
  let totalExercises = 0;

  parts.forEach((part) => {
    totalExercises += part.exercises;
  });

  return <p>Total number of exercises: {totalExercises}</p>;
}

export default Total;