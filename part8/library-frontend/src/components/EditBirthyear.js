import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const EditBirthyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })
  const authorsResult = useQuery(ALL_AUTHORS)
  if (authorsResult.loading) {
    return <div>loading...</div>
  }
  const blankAuthor = { id: 'blank', name: null }
  const authors = authorsResult.data.allAuthors

  const submit = (event) => {
    event.preventDefault()
    if (!name) return

    const authorParams = { name }
    const bornInt = parseInt(born, 10) || 0
    editAuthor({ variables: { ...authorParams, born: bornInt } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <label>
          Author
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {[blankAuthor, ...authors].map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          Born
          <input value={born} type="number" onChange={({ target }) => setBorn(target.value)} />
        </div>

        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default EditBirthyear
