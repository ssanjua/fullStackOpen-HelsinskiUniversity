import React from "react";

const Persons = ({ namesFiltered, handleDelete }) => {
  return (
    <div>
      {
        namesFiltered.map((person) =>
          <div key={person.id}>
            <p>{person.name} {person.number}
              <button onClick={() => handleDelete(person.id, person.name)}
              >
                delete
              </button>
            </p>
          </div>
        )
      }

    </div>
  )
}

export default Persons;