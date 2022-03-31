import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'

const EditBirthyear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

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
        <div>
          Name
          <input value={name} onChange={({ target }) => setName(target.value)} />
        </div>
        <div>
          Born
          <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>

        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default EditBirthyear
