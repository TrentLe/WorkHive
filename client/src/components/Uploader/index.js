import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../../utils/mutations';
import './Uploader.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

function Uploader() {

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file")
  const [uploadImage] = useMutation(UPLOAD_IMAGE, {
    onCompleted: (data) => {
      console.log(data.uploadImage.url);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImage(URL.createObjectURL(file));
    uploadImage({ variables: { file } });
  };

  return (
    <main>
      <form onClick={() => document.querySelector(".input-field").click()}>
        <input
          type="file"
          accept='image/*'
          className='input-field'
          hidden
          onChange={handleFileChange}
        />

        {image ?
          <img src={image} width={150} height={150} alt={fileName} />
          : 
          <>
            <MdCloudUpload color='#1475cf' size={60} />
            <p>Browse Files to upload</p>
          </>
        }
      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='#1475cf' />
        <span className='upload-content'>
          {fileName} - 
          <MdDelete onClick={() => {
            setFileName("No selected File")
            setImage(null)
          }} />
        </span>
      </section>
    </main>
  );
}

export default Uploader;