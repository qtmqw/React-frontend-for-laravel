import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { postD } from '../api/Api'

const EditMyCar = ({ post }) => {
    const [image, setImage] = useState(post.image);
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [showModal, setShowModal] = useState(false);


    const handleUpdateCar = async (e) => {
        e.preventDefault();

        const carData = {
            image,
            title,
            description,
        };

        try {
            const response = await axios.put(`${postD}/${post.id}`, carData);
            console.log(response.data)
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        setShowModal(false);
    };

    return (
        <>
            <Button
                className="w-[50%] bg-deep-purple-400 uppercase text-white font-bold shadow text-xs rounded outline-none focus:outline-none mr-1 -py-2"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Edit Post
            </Button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  my-6 mx-auto max-w-3xl w-[100%]">
                            <div className="rounded-xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[100%] border-4 border-deep-purple-400">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Edit Post
                                    </h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleUpdateCar} encType='multipart/form-data'>
                                        <label className='mb-3 flex'>
                                            <div className='w-full'>
                                                <Input
                                                    size="lg"
                                                    label="Title"
                                                    required
                                                    type="text"
                                                    id="title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </div>
                                        </label>

                                        <label className='mb-3 w-full'>
                                            <Textarea
                                                id="description"
                                                label="Description"
                                                required
                                                type="text"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </label>

                                        <label className='mb-3 flex'>
                                            <div className='w-full'>
                                                <Input
                                                    size="lg"
                                                    label="Image"
                                                    required
                                                    type="text"
                                                    id="image"
                                                    value={image}
                                                    onChange={(e) => setImage(e.target.value)}
                                                />
                                            </div>
                                        </label>
                                        <div className="flex items-center justify-end pt-3 border-t border-solid border-blueGray-200 rounded-b mt-4 jus">
                                            <Button type="submit" className='bg-deep-purple-400'>Submit</Button>
                                            <Button
                                                className="bg-white text-red-500 background-transparent font-bold uppercase px-6 py-2 ml-3 text-sm outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                                type="cancel"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}

export default EditMyCar