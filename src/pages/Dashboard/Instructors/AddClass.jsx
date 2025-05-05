// import React, { useRef, useState } from 'react';
// import { useUser } from '../../../hooks/useUser';
// import { toast } from 'react-toastify';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// const KEY = import.meta.env.VITE_IMG_TOKEN;

// const AddClass = () => {
//     const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
//     const axiosSecure = useAxiosSecure();
//     const { currentUser, isLoading } = useUser();
//     const [image, setImage] = useState(null);
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const newData = Object.fromEntries(formData);
//         formData.append('file', image);

//         toast.promise(
//             fetch(API_URL, {
//                 method: 'POST',
//                 body: formData
//             })
//                 .then(res => res.json())
//                 .then(data => {
//                     console.log(data);
//                     if (data.success === true) {
//                         console.log(data.data.display_url);
//                         newData.image = data.data.display_url;
//                         newData.instructorName = currentUser.name;
//                         newData.instructorEmail = currentUser.email;
//                         newData.status = 'pending';
//                         newData.submitted = new Date(); 
//                         newData.totalEnrolled = 0;
//                         // console.log(newData);
//                         axiosSecure.post('/new-class' , newData)
//                         .then(res => {
//                             console.log(res.data);
//                         })

//                     }
//                 }),
//             {
//                 pending: 'Submitting your class...',
//                 success: 'Submitted successfully!',
//                 error: 'Failed to submit your class',
//             }
//         )
//     };
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//     };
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }
//     return (
//         <div className="">
//             <div className="my-10">
//                 <h1 className='text-center text-3xl font-bold'>Add Your Class</h1>
//             </div>


//             <form onSubmit={handleFormSubmit} className=" mx-auto p-6 bg-white rounded shadow">
//                 <div className="grid grid-cols-2 w-full gap-3">
//                     <div className="mb-6">
//                         <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
//                             Class name
//                         </label>
//                         <input
//                             className=" w-full px-4 py-2  border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//                             type="text"
//                             required
//                             placeholder='Your Class Name'
//                             name='name'
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label htmlFor="image" className="font-bold">Thumbnail Photo</label>
//                         <input
//                             type="file"
//                             required
//                             onChange={handleImageChange}
//                             name="image"
//                             className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500    file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4 " />
//                     </div>
//                 </div>
//                 <div className="">
//                     <h1 className='text-[12px] my-2 ml-2 text-secondary'>You can not change your name or email</h1>
//                     <div className="grid gap-3 grid-cols-2">
//                         <div className="mb-6">
//                             <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorName">
//                                 Instructor name
//                             </label>
//                             <input
//                                 className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//                                 type="text"
//                                 value={currentUser?.name}
//                                 readOnly
//                                 disabled
//                                 placeholder='Instructor Name'
//                                 name='instructorName'
//                             />
//                         </div>
//                         <div className="mb-6">
//                             <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorEmail">
//                                 Instructor email
//                             </label>
//                             <input
//                                 title='You can not update your email'
//                                 className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
//                                 type="email"
//                                 value={currentUser?.email}
//                                 disabled
//                                 readOnly
//                                 name='instructorEmail'
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid gap-3 md:grid-cols-2">
//                     <div className="mb-6">
//                         <label className="block text-gray-700 font-bold mb-2" htmlFor="availableSeats">
//                             Available seats
//                         </label>
//                         <input
//                             className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
//                             type="number"
//                             required
//                             placeholder='How many seats are available?'
//                             name='availableSeats'
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
//                             Price
//                         </label>
//                         <input
//                             className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
//                             type="number"
//                             required
//                             placeholder='How much does it cost?'
//                             name='price'
//                         />
//                     </div>
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
//                         Youtube Link
//                     </label>
//                     <p className='text-[12px] my-2 mt-2 text-secondary'>Only youtube videos are support</p>
//                     <input
//                         required
//                         className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
//                         type="text"
//                         placeholder='Your course intro video link'
//                         name='videoLink'
//                     />
//                 </div>
//                 <div className="mb-6">
//                     <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
//                         Description About your course 
//                     </label>
//                     <textarea placeholder='Description about your course' name="description" className='resize-none border w-full p-2 rounded-lg  border-secondary outline-none' rows="4"></textarea>
//                 </div>
//                 <div className="text-center w-full">
//                     <button
//                         className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
//                         type="submit"
//                     >
//                         Add
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddClass;











// 2nd

import React, { useRef, useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const KEY = import.meta.env.VITE_IMG_TOKEN;

const AddClass = () => {
    const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
    const axiosSecure = useAxiosSecure();
    const { currentUser, isLoading } = useUser();
    const [image, setImage] = useState(null);
    const [videoLink, setVideoLink] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleVideoLinkChange = (e) => {
        setVideoLink(e.target.value);
    };

    const getYouTubeVideoId = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
        return match ? match[1] : null;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = Object.fromEntries(formData);
        formData.append('file', image);

        toast.promise(
            fetch(API_URL, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        newData.image = data.data.display_url;
                        newData.instructorName = currentUser.name;
                        newData.instructorEmail = currentUser.email;
                        newData.status = 'pending';
                        newData.submitted = new Date();
                        newData.totalEnrolled = 0;
                        axiosSecure.post('/new-class', newData)
                            .then(res => {
                                console.log(res.data);
                            });
                    }
                }),
            {
                pending: 'Submitting your class...',
                success: 'Submitted successfully!',
                error: 'Failed to submit your class',
            }
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="my-10">
                <h1 className='text-center text-3xl font-bold'>Add Your Class</h1>
            </div>

            <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow">
                <div className="grid grid-cols-2 w-full gap-3">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Class name
                        </label>
                        <input
                            className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                            type="text"
                            required
                            placeholder='Your Class Name'
                            name='name'
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="font-bold">Thumbnail Photo</label>
                        <input
                            type="file"
                            required
                            onChange={handleImageChange}
                            name="image"
                            className="block mt-[5px] w-full border border-secondary shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 file:border-0 file:bg-secondary file:text-white file:mr-4 file:py-3 file:px-4"
                        />
                    </div>
                </div>

                <div>
                    <h1 className='text-[12px] my-2 ml-2 text-secondary'>You can not change your name or email</h1>
                    <div className="grid gap-3 grid-cols-2">
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorName">
                                Instructor name
                            </label>
                            <input
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="text"
                                value={currentUser?.name}
                                readOnly
                                disabled
                                placeholder='Instructor Name'
                                name='instructorName'
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="instructorEmail">
                                Instructor email
                            </label>
                            <input
                                title='You can not update your email'
                                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-blue-500"
                                type="email"
                                value={currentUser?.email}
                                disabled
                                readOnly
                                name='instructorEmail'
                            />
                        </div>
                    </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="availableSeats">
                            Available seats
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            required
                            placeholder='How many seats are available?'
                            name='availableSeats'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                            type="number"
                            required
                            placeholder='How much does it cost?'
                            name='price'
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="videoLink">
                        YouTube Link
                    </label>
                    <p className='text-[12px] my-2 text-secondary'>Only YouTube videos are supported</p>
                    <input
                        required
                        className="w-full border-secondary px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500"
                        type="text"
                        placeholder='Your course intro video link'
                        name='videoLink'
                        value={videoLink}
                        onChange={handleVideoLinkChange}
                    />
                    {getYouTubeVideoId(videoLink) && (
                        <div className="mt-4">
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoLink)}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                        Description About Your Course
                    </label>
                    <textarea
                        placeholder='Description about your course'
                        name="description"
                        className='resize-none border w-full p-2 rounded-lg border-secondary outline-none'
                        rows="4"
                    ></textarea>
                </div>

                <div className="text-center w-full">
                    <button
                        className="bg-secondary w-full hover:bg-red-400 duration-200 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddClass;























// import React, { useState } from 'react';
// import { useUser } from '../../../hooks/useUser';
// import { toast } from 'react-toastify';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const KEY = import.meta.env.VITE_IMG_TOKEN;

// const AddClass = () => {
//     const API_URL = `https://api.imgbb.com/1/upload?key=${KEY}&name=`;
//     const axiosSecure = useAxiosSecure();
//     const { currentUser, isLoading } = useUser();
//     const [image, setImage] = useState(null);
//     const [video, setVideo] = useState(null);
//     const [videoLink, setVideoLink] = useState('');

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleVideoChange = (e) => {
//         setVideo(e.target.files[0]);
//     };

//     const handleVideoLinkChange = (e) => {
//         setVideoLink(e.target.value);
//     };

//     const getYouTubeVideoId = (url) => {
//         const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
//         return match ? match[1] : null;
//     };

//     const uploadImageToImgBB = async (formData) => {
//         const res = await fetch(API_URL, {
//             method: 'POST',
//             body: formData
//         });
//         const data = await res.json();
//         if (data.success) {
//             return data.data.display_url;
//         } else {
//             throw new Error('Image upload failed');
//         }
//     };

//     const uploadVideoToServer = async (file) => {
//         const videoForm = new FormData();
//         videoForm.append('video', file);
//         console.log("Uploading video:", file.name);
//         const res = await axiosSecure.post('/upload-video', videoForm, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });
//         return res.data.videoUrl;
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const newData = Object.fromEntries(formData);
//         newData.instructorName = currentUser.name;
//         newData.instructorEmail = currentUser.email;
//         newData.status = 'pending';
//         newData.submitted = new Date();
//         newData.totalEnrolled = 0;

//         toast.promise(
//             (async () => {
//                 // Upload thumbnail image
//                 const imgForm = new FormData();
//                 imgForm.append('image', image);
//                 const imageUrl = await uploadImageToImgBB(imgForm);
//                 newData.image = imageUrl;

//                 // Video logic
//                 const isYouTube = getYouTubeVideoId(videoLink);
//                 if (video && !videoLink) {
//                     newData.videoLink = await uploadVideoToServer(video);
//                 } else if (!video && isYouTube) {
//                     newData.videoLink = videoLink;
//                 } else if (video && videoLink) {
//                     throw new Error('Please choose either video upload or YouTube link, not both.');
//                 } else {
//                     throw new Error('Please upload a video file or enter a valid YouTube link.');
//                 }

//                 const response = await axiosSecure.post('/new-class', newData);
//                 return response.data;
//             })(),
//             {
//                 pending: 'Submitting your class...',
//                 success: 'Class submitted successfully!',
//                 error: 'Failed to submit your class',
//             }
//         );
//     };

//     if (isLoading) return <div>Loading...</div>;

//     return (
//         <div>
//             <h1 className='text-center text-3xl font-bold my-10'>Add Your Class</h1>
//             <form onSubmit={handleFormSubmit} className="mx-auto p-6 bg-white rounded shadow max-w-4xl">
//                 <div className="grid grid-cols-2 gap-4">
//                     <div>
//                         <label className="font-bold">Class Name</label>
//                         <input name="name" required className="w-full p-2 border rounded" placeholder="Class name" />
//                     </div>
//                     <div>
//                         <label className="font-bold">Thumbnail Image</label>
//                         <input type="file" required onChange={handleImageChange} className="w-full" />
//                     </div>
//                     <div>
//                         <label className="font-bold">Available Seats</label>
//                         <input type="number" name="availableSeats" required className="w-full p-2 border rounded" />
//                     </div>
//                     <div>
//                         <label className="font-bold">Price</label>
//                         <input type="number" name="price" required className="w-full p-2 border rounded" />
//                     </div>
//                 </div>

//                 <div className="my-4">
//                     <label className="font-bold">Upload Video (optional)</label>
//                     <input type="file" accept="video/*" onChange={handleVideoChange} className="w-full" />
//                 </div>

//                 <div className="my-4">
//                     <label className="font-bold">YouTube Link (optional)</label>
//                     <input
//                         type="text"
//                         value={videoLink}
//                         onChange={handleVideoLinkChange}
//                         className="w-full p-2 border rounded"
//                         placeholder="YouTube video link"
//                     />
//                     {getYouTubeVideoId(videoLink) && (
//                         <iframe
//                             className="mt-4 w-full h-64"
//                             src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoLink)}`}
//                             title="YouTube preview"
//                             allowFullScreen
//                         />
//                     )}
//                 </div>

//                 <div className="my-4">
//                     <label className="font-bold">Description</label>
//                     <textarea name="description" rows="4" className="w-full p-2 border rounded" />
//                 </div>

//                 <div className="my-4 grid grid-cols-2 gap-4">
//                     <input type="text" value={currentUser?.name} readOnly disabled className="w-full p-2 border rounded" />
//                     <input type="email" value={currentUser?.email} readOnly disabled className="w-full p-2 border rounded" />
//                 </div>

//                 <button className="w-full bg-secondary hover:bg-red-400 text-white py-2 px-4 rounded font-bold">Add</button>
//             </form>
//         </div>
//     );
// };

// export default AddClass;


























