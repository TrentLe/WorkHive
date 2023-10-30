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
            <textarea name="bio" value={formState.bio} onChange={handleChange} cols="30" rows="10" className="bg-transparent m-3 text-white" placeholder='Tell Us About Yourself'></textarea>

          </form>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Submit
          </button>
        </div>
      </section>
      {/* <!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-black">
             <p>Do you wish to save these changes?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default ProfileEditor