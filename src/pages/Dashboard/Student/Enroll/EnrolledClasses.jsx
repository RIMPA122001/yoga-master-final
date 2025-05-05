// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useUser } from '../../../../hooks/useUser';
// import { Pagination, ThemeProvider, createTheme } from '@mui/material';
// import { v4 } from 'uuid';
// import { ScaleLoader } from 'react-spinners';
// const EnrolledClasses = () => {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [paginatedData, setPaginatedData] = useState([]); 
//     const [loading, setLoading] = useState(true);
//     const { currentUser } = useUser();
//     let itemPerPage = 2;
//     const totalPage = Math.ceil(data.length / itemPerPage);
//     const axiosSecure = useAxiosSecure();
//     const theme = createTheme({
//         palette: {
//             primary: {
//                 main: '#ff0000', // Set the primary color
//             },
//             secondary: {
//                 main: '#00ff00', // Set the secondary color
//             },
//         },
//     });


//     useEffect(() => {
//         axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
//             .then(res => {
//                 setData(res.data)
//                 setLoading(false)
//             })
//             .catch(err => console.log(err))
//     }, [])

//     // Pagination
//     useEffect(() => {
//         let lastIndex = page * itemPerPage;
//         let firstIndex = lastIndex - itemPerPage;

//         // Adjust lastIndex if it exceeds the total number of items
//         if (lastIndex > data.length) {
//             lastIndex = data.length;
//         }

//         const currentData = data.slice(firstIndex, lastIndex);
//         setPaginatedData(currentData);
//     }, [page, totalPage]);




//     const handleChange = (event, value) => setPage(value);
//     if (loading) { // [2
//         return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
//     }
//     return (
//         <div>
//             <div className="text-center  my-10">
//                 <h1 className="text-2xl font-bold text-gray-700">Enrolled Classes</h1>

//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//                 {
//                     paginatedData.map(item => <div key={item.classes._id + v4()} className="
//                 bg-white
//                 shadow-md
//                 h-96
//                 mx-3
//                 rounded-3xl
//                 flex flex-col
//                 justify-around
//                 items-center
//                 overflow-hidden
//                 sm:flex-row sm:h-52 sm:w-3/5
//                 md:w-96
//               ">
//                         <img
//                             className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
//                             src={item.classes.image}
//                             alt="image"
//                         />

//                         <div className="flex-1
//                   w-full
//                   flex flex-col
//                   items-baseline
//                   justify-around h-1/2
//                   pl-6
//                   sm:h-full sm:items-baseline sm:w-1/2
//                 ">
//                             <div className="flex flex-col justify-start items-baseline">
//                                 <h1 title={item.classes.name} className="text-lg font-normal mb-0 text-gray-600 font-sans">
//                                     {item.classes.name.length > 20 ? item.classes.name.slice(0, 20) + '...' : item.classes.name}
//                                 </h1>
//                                 <span className="text-xs text-indigo-300 mt-0">by <span className='text-black'>{item.classes.instructorName}</span></span>
//                             </div>
//                             <p className="text-xs text-gray-500 w-4/5">
//                                 {item.classes.description?.length > 100 ? item.classes.description.slice(0, 100) + '...' : item.classes.description}
//                             </p>
//                             <div className="w-full flex justify-between items-center">
//                                 <h1 className="font-bold text-gray-500">₹{item.classes.price}</h1>
//                                 <button
//                                     className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md"
//                                 >
//                                     View
//                                 </button>
//                             </div>
//                         </div>
//                     </div>)
//                 }
//             </div>
//             <ThemeProvider theme={theme}>
//                 <div className="w-full h-full flex justify-center items-center my-10">
//                     <Pagination onChange={handleChange} count={totalPage} color="primary" />
//                 </div>
//             </ThemeProvider>
//             <div className="">
//                 <p className='text-center'>Showing result <span className='text-secondary font-bold'>{page} <span className='text-black font-medium'>of</span> {totalPage}</span></p>
//             </div>
//         </div>
//     );
// };

// export default EnrolledClasses;




















// 2nd

import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useUser } from '../../../../hooks/useUser';
import { Pagination, ThemeProvider, createTheme } from '@mui/material';
import { v4 } from 'uuid';
import { ScaleLoader } from 'react-spinners';

const EnrolledClasses = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const { currentUser } = useUser();
    const axiosSecure = useAxiosSecure();
    const itemPerPage = 2;
    const totalPage = Math.ceil(data.length / itemPerPage);

    const theme = createTheme({
        palette: {
            primary: { main: '#ff0000' },
            secondary: { main: '#00ff00' },
        },
    });

    useEffect(() => {
        axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const lastIndex = Math.min(page * itemPerPage, data.length);
        const firstIndex = lastIndex - itemPerPage;
        setPaginatedData(data.slice(firstIndex, lastIndex));
    }, [page, data]);

    const getYouTubeVideoId = (url) => {
        const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
        return match ? match[1] : null;
    };

    const handleViewClick = (videoLink) => {
        const videoId = getYouTubeVideoId(videoLink);
        if (videoId) {
            setSelectedVideo(`https://www.youtube.com/embed/${videoId}`);
        }
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    if (loading) {
        return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center my-10 text-gray-700">Enrolled Classes</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {paginatedData.map(item => (
                    <div key={item.classes._id + v4()} className="bg-white shadow-md h-96 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96">
                        <img className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover" src={item.classes.image} alt="class" />
                        <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:w-1/2">
                            <div>
                                <h1 title={item.classes.name} className="text-lg font-normal mb-0 text-gray-600">
                                    {item.classes.name.length > 20 ? item.classes.name.slice(0, 20) + '...' : item.classes.name}
                                </h1>
                                <span className="text-xs text-indigo-300 mt-0">by <span className='text-black'>{item.classes.instructorName}</span></span>
                            </div>
                            <p className="text-xs text-gray-500 w-4/5">
                                {item.classes.description?.length > 100 ? item.classes.description.slice(0, 100) + '...' : item.classes.description}
                            </p>
                            <div className="w-full flex justify-between items-center">
                                <h1 className="font-bold text-gray-500">₹{item.classes.price}</h1>
                                <button
                                    onClick={() => handleViewClick(item.classes.videoLink)}
                                    className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ThemeProvider theme={theme}>
                <div className="w-full h-full flex justify-center items-center my-10">
                    <Pagination onChange={(e, val) => setPage(val)} count={totalPage} color="primary" />
                </div>
            </ThemeProvider>

            <p className='text-center'>Showing result <span className='text-secondary font-bold'>{page}</span> <span className='text-black font-medium'>of</span> <span className='text-secondary font-bold'>{totalPage}</span></p>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="relative bg-white rounded-lg shadow-xl p-4 max-w-3xl w-full">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                        >
                            ✕
                        </button>
                        <iframe
                            width="100%"
                            height="400"
                            src={selectedVideo}
                            title="Class Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EnrolledClasses;


















// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useUser } from '../../../../hooks/useUser';
// import { Pagination, ThemeProvider, createTheme } from '@mui/material';
// import { v4 } from 'uuid';
// import { ScaleLoader } from 'react-spinners';

// const EnrolledClasses = () => {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [paginatedData, setPaginatedData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedVideo, setSelectedVideo] = useState(null); // { type: 'youtube' | 'file', src: string }

//     const { currentUser } = useUser();
//     const axiosSecure = useAxiosSecure();
//     const itemPerPage = 2;
//     const totalPage = Math.ceil(data.length / itemPerPage);

//     const theme = createTheme({
//         palette: {
//             primary: { main: '#ff0000' },
//             secondary: { main: '#00ff00' },
//         },
//     });

//     useEffect(() => {
//         axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
//             .then(res => {
//                 setData(res.data);
//                 setLoading(false);
//             })
//             .catch(err => console.error(err));
//     }, []);

//     useEffect(() => {
//         const lastIndex = Math.min(page * itemPerPage, data.length);
//         const firstIndex = lastIndex - itemPerPage;
//         setPaginatedData(data.slice(firstIndex, lastIndex));
//     }, [page, data]);

//     const getYouTubeVideoId = (url) => {
//         const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
//         return match ? match[1] : null;
//     };

//     const handleViewClick = (videoLink) => {
//         const videoId = getYouTubeVideoId(videoLink);
//         if (videoId) {
//             setSelectedVideo({ type: 'youtube', src: `https://www.youtube.com/embed/${videoId}` });
//         } else if (videoLink) {
//             setSelectedVideo({ type: 'file', src: videoLink });
//         }
//     };

//     const handleCloseModal = () => {
//         setSelectedVideo(null);
//     };

//     if (loading) {
//         return (
//             <div className='h-full w-full flex justify-center items-center'>
//                 <ScaleLoader color="#FF1949" />
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h1 className="text-2xl font-bold text-center my-10 text-gray-700">Enrolled Classes</h1>

//             <div className="grid md:grid-cols-2 gap-8">
//                 {paginatedData.map(item => (
//                     <div
//                         key={item.classes._id + v4()}
//                         className="bg-white shadow-md h-96 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96"
//                     >
//                         <img
//                             className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
//                             src={item.classes.image}
//                             alt="class"
//                         />
//                         <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:w-1/2">
//                             <div>
//                                 <h1
//                                     title={item.classes.name}
//                                     className="text-lg font-normal mb-0 text-gray-600"
//                                 >
//                                     {item.classes.name.length > 20
//                                         ? item.classes.name.slice(0, 20) + '...'
//                                         : item.classes.name}
//                                 </h1>
//                                 <span className="text-xs text-indigo-300 mt-0">
//                                     by <span className='text-black'>{item.classes.instructorName}</span>
//                                 </span>
//                             </div>
//                             <p className="text-xs text-gray-500 w-4/5">
//                                 {item.classes.description?.length > 100
//                                     ? item.classes.description.slice(0, 100) + '...'
//                                     : item.classes.description}
//                             </p>
//                             <div className="w-full flex justify-between items-center">
//                                 <h1 className="font-bold text-gray-500">₹{item.classes.price}</h1>
//                                 <button
//                                     onClick={() => handleViewClick(item.classes.videoLink)}
//                                     className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md"
//                                 >
//                                     View
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <ThemeProvider theme={theme}>
//                 <div className="w-full h-full flex justify-center items-center my-10">
//                     <Pagination onChange={(e, val) => setPage(val)} count={totalPage} color="primary" />
//                 </div>
//             </ThemeProvider>

//             <p className='text-center'>
//                 Showing result <span className='text-secondary font-bold'>{page}</span>{' '}
//                 <span className='text-black font-medium'>of</span>{' '}
//                 <span className='text-secondary font-bold'>{totalPage}</span>
//             </p>

//             {/* Video Modal */}
//             {selectedVideo && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//                     <div className="relative bg-white rounded-lg shadow-xl p-4 max-w-3xl w-full">
//                         <button
//                             onClick={handleCloseModal}
//                             className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                         >
//                             ✕
//                         </button>

//                         {selectedVideo.type === 'youtube' ? (
//                             <iframe
//                                 width="100%"
//                                 height="400"
//                                 src={selectedVideo.src}
//                                 title="Class Video"
//                                 frameBorder="0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                             />
//                         ) : (
//                             <video width="100%" height="400" controls>
//                                 <source src={selectedVideo.src} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EnrolledClasses;
























// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useUser } from '../../../../hooks/useUser';
// import { Pagination, ThemeProvider, createTheme } from '@mui/material';
// import { v4 } from 'uuid';
// import { ScaleLoader } from 'react-spinners';

// const EnrolledClasses = () => {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [paginatedData, setPaginatedData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const { currentUser } = useUser();
//     const axiosSecure = useAxiosSecure();

//     const itemPerPage = 2;
//     const totalPage = Math.ceil(data.length / itemPerPage);

//     const theme = createTheme({
//         palette: {
//             primary: {
//                 main: '#ff0000',
//             },
//             secondary: {
//                 main: '#00ff00',
//             },
//         },
//     });

//     useEffect(() => {
//         axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
//             .then(res => {
//                 setData(res.data);
//                 setLoading(false);
//             })
//             .catch(err => console.log(err));
//     }, []);

//     useEffect(() => {
//         const lastIndex = Math.min(page * itemPerPage, data.length);
//         const firstIndex = lastIndex - itemPerPage;
//         setPaginatedData(data.slice(firstIndex, lastIndex));
//     }, [page, data]);

//     const handleChange = (event, value) => setPage(value);

//     const getYouTubeVideoId = (url) => {
//         const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
//         return match ? match[1] : null;
//     };

//     if (loading) {
//         return (
//             <div className='h-full w-full flex justify-center items-center'>
//                 <ScaleLoader color="#FF1949" />
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="text-center my-10">
//                 <h1 className="text-2xl font-bold text-gray-700">Enrolled Classes</h1>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//                 {
//                     paginatedData.map(item => {
//                         const videoLink = item.classes.videoLink;

//                         return (
//                             <div key={item.classes._id + v4()} className="bg-white shadow-md h-96 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96">
//                                 <img
//                                     className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover"
//                                     src={item.classes.image}
//                                     alt="thumbnail"
//                                 />

//                                 <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2">
//                                     <div className="flex flex-col justify-start items-baseline">
//                                         <h1 title={item.classes.name} className="text-lg font-normal mb-0 text-gray-600 font-sans">
//                                             {item.classes.name.length > 20 ? item.classes.name.slice(0, 20) + '...' : item.classes.name}
//                                         </h1>
//                                         <span className="text-xs text-indigo-300 mt-0">by <span className='text-black'>{item.classes.instructorName}</span></span>
//                                     </div>
//                                     <p className="text-xs text-gray-500 w-4/5">
//                                         {item.classes.description?.length > 100 ? item.classes.description.slice(0, 100) + '...' : item.classes.description}
//                                     </p>
//                                     <div className="w-full flex justify-between items-center">
//                                         <h1 className="font-bold text-gray-500">₹{item.classes.price}</h1>
//                                         <button
//                                             onClick={() => setSelectedClass(item.classes)}
//                                             className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md"
//                                         >
//                                             View
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 }
//             </div>

//             {/* Modal */}
//             {selectedClass && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//                     <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl relative">
//                         <h2 className="text-xl font-bold mb-4">{selectedClass.name}</h2>
//                         {getYouTubeVideoId(selectedClass.videoLink) ? (
//                             <iframe
//                                 width="100%"
//                                 height="315"
//                                 src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedClass.videoLink)}`}
//                                 title="YouTube video player"
//                                 frameBorder="0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                             ></iframe>
//                         ) : (
//                             <video controls width="100%">
//                                 <source src={selectedClass.videoLink} type="video/mp4" />
//                                 Your browser does not support the video tag.
//                             </video>
//                         )}
//                         <button
//                             onClick={() => setSelectedClass(null)}
//                             className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1 text-sm"
//                         >
//                             ✕
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <ThemeProvider theme={theme}>
//                 <div className="w-full h-full flex justify-center items-center my-10">
//                     <Pagination onChange={handleChange} count={totalPage} color="primary" />
//                 </div>
//             </ThemeProvider>
//             <div className="text-center">
//                 <p>Showing result <span className='text-secondary font-bold'>{page}</span> <span className='text-black font-medium'>of</span> <span className='text-secondary font-bold'>{totalPage}</span></p>
//             </div>
//         </div>
//     );
// };

// export default EnrolledClasses;





















// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useUser } from '../../../../hooks/useUser';
// import { Pagination, ThemeProvider, createTheme } from '@mui/material';
// import { v4 } from 'uuid';
// import { ScaleLoader } from 'react-spinners';

// const EnrolledClasses = () => {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [paginatedData, setPaginatedData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedVideo, setSelectedVideo] = useState(null); // { type: 'youtube' | 'upload', url: string }

//     const { currentUser } = useUser();
//     const axiosSecure = useAxiosSecure();
//     const itemPerPage = 2;
//     const totalPage = Math.ceil(data.length / itemPerPage);

//     const theme = createTheme({
//         palette: {
//             primary: { main: '#ff0000' },
//             secondary: { main: '#00ff00' },
//         },
//     });

//     useEffect(() => {
//         axiosSecure.get(`/enrolled-classes/${currentUser.email}`)
//             .then(res => {
//                 setData(res.data);
//                 setLoading(false);
//             })
//             .catch(err => console.error(err));
//     }, []);

//     useEffect(() => {
//         const lastIndex = Math.min(page * itemPerPage, data.length);
//         const firstIndex = lastIndex - itemPerPage;
//         setPaginatedData(data.slice(firstIndex, lastIndex));
//     }, [page, data]);

//     const getYouTubeVideoId = (url) => {
//         const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
//         return match ? match[1] : null;
//     };

//     const handleViewClick = (videoLink) => {
//         const videoId = getYouTubeVideoId(videoLink);
//         if (videoId) {
//             setSelectedVideo({ type: 'youtube', url: `https://www.youtube.com/embed/${videoId}` });
//         } else {
//             setSelectedVideo({ type: 'upload', url: videoLink });
//         }
//     };

//     const handleCloseModal = () => {
//         setSelectedVideo(null);
//     };

//     if (loading) {
//         return <div className='h-full w-full flex justify-center items-center'><ScaleLoader color="#FF1949" /></div>;
//     }

//     return (
//         <div>
//             <h1 className="text-2xl font-bold text-center my-10 text-gray-700">Enrolled Classes</h1>

//             <div className="grid md:grid-cols-2 gap-8">
//                 {paginatedData.map(item => (
//                     <div key={item.classes._id + v4()} className="bg-white shadow-md h-96 mx-3 rounded-3xl flex flex-col justify-around items-center overflow-hidden sm:flex-row sm:h-52 sm:w-3/5 md:w-96">
//                         <img className="h-1/2 w-full sm:h-full sm:w-1/2 object-cover" src={item.classes.image} alt="class" />
//                         <div className="flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:w-1/2">
//                             <div>
//                                 <h1 title={item.classes.name} className="text-lg font-normal mb-0 text-gray-600">
//                                     {item.classes.name.length > 20 ? item.classes.name.slice(0, 20) + '...' : item.classes.name}
//                                 </h1>
//                                 <span className="text-xs text-indigo-300 mt-0">by <span className='text-black'>{item.classes.instructorName}</span></span>
//                             </div>
//                             <p className="text-xs text-gray-500 w-4/5">
//                                 {item.classes.description?.length > 100 ? item.classes.description.slice(0, 100) + '...' : item.classes.description}
//                             </p>
//                             <div className="w-full flex justify-between items-center">
//                                 <h1 className="font-bold text-gray-500">₹{item.classes.price}</h1>
//                                 <button
//                                     onClick={() => handleViewClick(item.classes.videoLink)}
//                                     className="bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md"
//                                 >
//                                     View
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <ThemeProvider theme={theme}>
//                 <div className="w-full h-full flex justify-center items-center my-10">
//                     <Pagination onChange={(e, val) => setPage(val)} count={totalPage} color="primary" />
//                 </div>
//             </ThemeProvider>

//             <p className='text-center'>Showing result <span className='text-secondary font-bold'>{page}</span> <span className='text-black font-medium'>of</span> <span className='text-secondary font-bold'>{totalPage}</span></p>

//             {/* Video Modal */}
//             {selectedVideo && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//                     <div className="relative bg-white rounded-lg shadow-xl p-4 max-w-3xl w-full">
//                         <button
//                             onClick={handleCloseModal}
//                             className="absolute top-2 right-2 text-red-500 font-bold text-xl"
//                         >
//                             ✕
//                         </button>
//                         {selectedVideo.type === 'youtube' ? (
//                             <iframe
//                                 width="100%"
//                                 height="400"
//                                 src={selectedVideo.url}
//                                 title="Class Video"
//                                 frameBorder="0"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                             />
//                         ) : (
//                             <video
//                                 width="100%"
//                                 height="400"
//                                 controls
//                                 src={selectedVideo.url}
//                                 className="rounded"
//                             >
//                                 Your browser does not support the video tag.
//                             </video>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EnrolledClasses;

