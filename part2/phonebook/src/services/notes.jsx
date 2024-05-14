const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return fetch(baseURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      return response.json();
    });
}

const create = newPerson => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPerson)
  })
    .then(response => response.json())
}

const deleteById = (id) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('failed')
      }
    })
}

const update = (id, updatedPerson) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPerson),
  })
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Person not found');
        } else {
          throw new Error('Failed to update')
        }
      }
      return response.json();
    });
};

export default {
  getAll: getAll,
  create: create,
  delete: deleteById,
  update: update,
}