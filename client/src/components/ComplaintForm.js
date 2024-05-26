import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Resemble from 'resemblejs';

const ComplaintForm = () => {
    const [imageData, setImageData] = useState('');
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    const {user} = useUser();
    const [complaintData, setComplaintData] = useState({
        details: '',
        name: user?.fullName,
        title: ''
    });
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!user){
            navigate("/signin")
        }
        const fetchData = async () => {
            await axios.get("http://localhost:8000/complaints").then(response => {
                setData(() => {
                    return response.data.complaints.filter((el) => {
                        return el.status === true
                    })
                })  
            })
        }
        fetchData();
    },[navigate,user])
    const handleImageChange = (event) => {
        setLoading(true);
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                PlagarismCheck(reader.result);
                setImageData(reader.result);
            };

            reader.readAsDataURL(file);
        }
        setLoading(false)
    };
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const PlagarismCheck = async(imageToCheck)=>{
        data.forEach(el=>{
            
            if (imageToCheck && el.image) {
                console.log("horaha hai")
                Resemble(imageToCheck).compareTo(el.image).onComplete((res) => {
                    if(res.rawMisMatchPercentage <= 50){
                        console.log("here")
                        alert(`"This issue has been already raised by @${el.user} with complaint id ${el.complaintId}`);
                        navigate("/");
                    }
                });
            }
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;

        setComplaintData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = {
                text: complaintData.details,
                image: imageData,
                user: complaintData.name,
                title: complaintData.title,
                status: true
            };
            const response = await axios.post('http://localhost:8000/complaints', formData);
            console.log(response);
        } catch (error) {
            console.error('Error submitting complaint:', error);
        } finally {
            setLoading(false);
            navigate("/")
        }
    };

    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5 mt-4">
                    <img src={user?.imageUrl} alt="userdp" className='mx-auto rounded-full max-h-24' />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={complaintData.title}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                        Details
                    </label>
                    <textarea
                        name="details"
                        value={complaintData.details}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>

                <div className="mb-5">
                    <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
                        Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>
                    {loading ? 'Checking Image for Plagarism...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default ComplaintForm;
