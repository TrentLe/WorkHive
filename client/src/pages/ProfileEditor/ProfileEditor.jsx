import React from 'react'
import { AiFillPicture } from 'react-icons/ai'
import Left from '../../components/left/left';
import './ProfileEditor.css'

const ProfileEditor = () => {
  return (

    <>
        <section className='positioning'>
            <Left />
            <div className='about__me-section'>

                <h2 className='about__me-title'>ProfileEditor</h2>
                <AiFillPicture />
                <form className="about__me">
                    <h4 className="about__me-heading">About Me</h4>
                    <textarea name="aboutme" cols="30" rows="10" className="about__me-content" placeholder='Tell Us About Yourself'required></textarea>
                </form>
            </div>
        </section>
    </>


  )
}

export default ProfileEditor