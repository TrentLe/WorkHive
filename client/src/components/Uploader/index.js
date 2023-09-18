import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { UPLOAD_IMAGE } from '../../utils/mutations';

import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
// import { AxiosContext } from 'react-axios/lib/components/AxiosProvider'
import  axios  from 'axios'
import FormData from 'form-data'

function Uploader() {
  const [image, setImage] = useState('');
  // const [fileName, setFileName] = useState("No selected file");
  // const [file, setFile] = useState(null);

  // const [uploadImage] = useMutation(UPLOAD_IMAGE, {
  //   onCompleted: (data) => {
  //     console.log(data.uploadImage.url);
  //   },
  // });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // setFileName(selectedFile);
    setImage(selectedFile);
    // setFile(selectedFile);
  };

  const handleSaveClick = async () => {
    //uploadImage({ variables: { file } });
    const formData = await new FormData()
    formData.append('image', image)
    axios.post('url', formData, {
      headers:{
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,

      }
    }).then((res) => {
      console.log(res)
    })
  };

  return (
    <main>
      <form onClick={() => document.querySelector(".input-field").click()}>
        <input
          type="file"
          name="file"
          accept='image/*'
          className='input-field'
          hidden
          onChange={handleFileChange}
        />

        {image ?
          <img src={image} width={150} height={150} alt={'test'} />
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
          <MdDelete onClick={() => {
            setImage(null)
          }} />
        </span>
      </section>

      <button onClick={handleSaveClick}>Save</button>
    </main>
  );
}

export default Uploader;