import { React, useContext, useState, useEffect } from 'react'
import { getDisplayUser } from '../../utilities/users-api'
import { DisplayUserContext } from '../../pages/App/App'
import { uploadImage } from '../../utilities/users-api'
import { deletePhotoFromDB, getUser } from '../../utilities/users-service'

export default function ProfileCard() {
    const [displayUser, setDisplayUser] = useContext(DisplayUserContext)
    const [imgFile, setImgFile] = useState()
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchDisplayUser = async () => {
            try {
                const fetchedDisplayUser = await getDisplayUser()
                setDisplayUser(fetchedDisplayUser)
            } catch (error) {
                console.error('Error fetching display user:', error)
            }
        }
        fetchDisplayUser()
    }, [])

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
            await fetchDisplayUser()
            getUser()
        } catch (error) {
            console.error('Error uploading image:', error)
        }
        return
    }

    const handleDeleteProfilePicture = async () => {
        const updatedUser = await deletePhotoFromDB(
            displayUser.profilePictureUrl
        )
        setDisplayUser(updatedUser)
        getUser()
    }

    return (
        <div className="items-left mx-auto my-20 flex w-1/2 flex-col justify-center rounded-lg bg-slate-100 p-4 text-center shadow-md lg:w-1/2">
            <div className="mb-4">
                {displayUser && displayUser.profilePictureUrl ? (
                    <img
                        src={displayUser.profilePictureUrl}
                        alt={displayUser.name}
                        className="mx-auto h-[230px] w-[230px] rounded-full"
                    />
                ) : null}
            </div>

            <h1 className="p-2 text-left text-xl font-semibold">
                {displayUser?.name}
            </h1>
            <h2 className=" w-full rounded bg-white p-2 text-left text-sm text-emerald-600">
                {displayUser?.email}
            </h2>

            <form
                className="mt-4 flex flex-col items-start justify-around"
                autoComplete="off"
                onSubmit={handleUploadPhoto}
            >
                <input
                    className="mt-2"
                    type="file"
                    name="file"
                    onChange={handleChange}
                />
                <button
                    className="btn-primary mt-2 rounded bg-emerald-800 p-2 text-white"
                    type="submit"
                >
                    Upload new profile picture
                </button>
            </form>

            {displayUser && displayUser.profilePictureUrl ? (
                <button
                    onClick={handleDeleteProfilePicture}
                    className="btn-primary my-2 w-[22.5%] rounded bg-red-300 p-2 text-white hover:bg-red-200"
                >
                    Delete profile picture
                </button>
            ) : null}
            <p className="error-message">&nbsp;{error}</p>
        </div>
    )
}
