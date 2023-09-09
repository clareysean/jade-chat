import { React, useContext, useState, useEffect } from 'react'
import { getDisplayUser } from '../../utilities/users-api'
import { DisplayUserContext } from '../../pages/App/App'
import { uploadImage } from '../../utilities/users-api'
import { deletePhotoFromDB, getUser } from '../../utilities/users-service'

export default function ProfileCard() {
    const [displayUser, setDisplayUser] = useContext(DisplayUserContext)
    const [imgFile, setImgFile] = useState()
    const [error, setError] = useState('')

    const fetchDisplayUser = async () => {
        const fetchedDisplayUser = await getDisplayUser() // from db
        setDisplayUser(fetchedDisplayUser)
    }

    const handleChange = (e) => {
        const selectedFile = e.target.files[0]
        console.log('Selected File:', selectedFile) // Debugging
        setImgFile(selectedFile)
    }

    const handleUploadPhoto = async (e) => {
        e.preventDefault()
        if (!imgFile) {
            setError('Select a file to upload!')
            return
        }
        const formData = new FormData()
        formData.append('file', imgFile)
        try {
            await uploadImage(formData)
            fetchDisplayUser()
            // set user as updated user returned
        } catch (error) {
            console.error('Error uploading image:', error)
        }
        return
    }

    const handleDeleteProfilePicture = async () => {
        console.log(displayUser.profilePictureUrl)
        await deletePhotoFromDB(displayUser.profilePictureUrl)
        fetchDisplayUser()
    }

    return (
        <div className="mx-20 my-20 flex w-1/2 flex-col items-start rounded-lg bg-slate-100 p-4 text-center shadow-md lg:mx-20 lg:w-1/2">
            <div className="mb-4">
                {displayUser && displayUser.profilePictureUrl ? (
                    <img
                        src={displayUser.profilePictureUrl}
                        alt={displayUser.name}
                        className="mx-auto h-24 w-24 rounded-full"
                    />
                ) : null}
            </div>

            <h1 className="p-2 text-left text-xl font-semibold">
                {displayUser.name}
            </h1>
            <h2 className=" w-full rounded bg-white p-2 text-left text-sm text-emerald-600">
                {displayUser.email}
            </h2>

            <form
                className="flex items-end"
                autoComplete="off"
                onSubmit={handleUploadPhoto}
            >
                <input
                    className="mt-2 block"
                    type="file"
                    name="file"
                    onChange={handleChange}
                />
                <button
                    className="btn my-1 rounded bg-emerald-800 p-2 text-white"
                    type="submit"
                >
                    Upload new profile picture
                </button>
            </form>

            {displayUser && displayUser.profilePictureUrl ? (
                <button
                    onClick={handleDeleteProfilePicture}
                    className="btn my-1 rounded bg-red-100 p-2 text-white"
                >
                    Delete profile picture
                </button>
            ) : null}
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
