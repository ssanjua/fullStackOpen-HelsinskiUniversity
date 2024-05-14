import React from "react";

const Persons = ({ namesFiltered }) => {
  return (
    <>
      {
        namesFiltered.map((person) =>
          <p key={person.id}>{person.name} {person.number}</p>
        )
      }
    </>
  )
}

export default Persons;