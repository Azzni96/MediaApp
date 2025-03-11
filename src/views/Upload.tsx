import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../hooks/FormHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
// import {useNavigate} from 'react-router-dom';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  // const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
      setUploading(false);
      // redirect to home
      // navigate('/');
      //or notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="m-4 pt-10 pb-10 text-center text-3xl font-bold text-gray-800">Upload</h1>
      <form
        className="flex flex-col items-center justify-center rounded-2xl bg-white shadow-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col mb-4">
          <label className="text-gray-700 font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="mt-2 rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="flex w-full flex-col mb-4">
          <label className="text-gray-700 font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            className="mt-2 rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex w-full flex-col mb-4">
          <label className="text-gray-700 font-semibold" htmlFor="file">
            File
          </label>
          <input
            className="mt-2 mb-4 rounded-md border border-gray-300 p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
          />
        </div>
        <img
          className="mb-4 h-48 w-48 rounded-2xl object-cover"
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="mb-4 w-full cursor-pointer rounded-md bg-green-600 p-3 text-white hover:bg-green-800"
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button
          className="w-full cursor-pointer rounded-md bg-red-600 p-3 text-white hover:bg-red-800"
          onClick={resetForm}
        >
          Reset
        </button>
        <p className="mt-4 text-center text-gray-700">{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
