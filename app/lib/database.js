import { database } from 'database/database'

export const getDatabaseID = () => database.ref('/').push().key

// We need to take care of the case where id is undefined
// which will cause the query to delete EVERYTHING in the path
export const removeInDB = (path) => (id) => {
  if (id == null) throw new Error('Invalid ID for removal.')
  database.ref(`${path}/${id}`).remove()
}
