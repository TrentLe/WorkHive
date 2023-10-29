import React, { useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'
import Left from '../../components/left/left';
import './ProfileEditor.css'
import { UPDATE_USER } from '../../utils/mutations';
import { useApolloClient, useMutation } from '@apollo/client';

const ProfileEditor = () => {
  const client = useApolloClient()

  const [formState, setFormState] = useState({
    bio: "",
    profilepicture: "",
    password: "",
    email: "",
    username: "",
  })

  const [updateUser] = useMutation(UPDATE_USER)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState({
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser({
        variables: { ...formState },
      })      

      await client.refetchQueries({
        include: "all",
      })

    } catch (err) {
      console.error(err)
    }

    setFormState({
      bio: "",
      profilepicture: "",
      password: "",
      email: "",
      username: "",
    })
  }


  return (

    <>
      <section className='positioning bg-transparent'>
        <Left />
        <div className='about__me-section bg-transparent'>

          <h2 className='d-flex justify-content-center align-items-center'>ProfileEditor</h2>
          <AiFillPicture />
          <form className="d-flex justify-content-center align-items-center flex-column" onSubmit={handleSubmit}>
            <label className="">Bio</label>
            <textarea name="bio" value={formState.bio} onChange={handleChange} cols="30" rows="10" className="bg-transparent m-3" placeholder='Tell Us About Yourself'></textarea>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </section>
    </>


  )
}

export default ProfileEditor