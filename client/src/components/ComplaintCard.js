import React from 'react'
import { useNavigate } from 'react-router-dom';
const ComplaintCard = ({ el }) => {

    const navigate = useNavigate();
    return (
        <>
            <div key={el.complaintId} onClick={() => navigate(`/complaint/${el.complaintId}`)} className='inline-block border w-1/5 min-h-36 border-gray-400 m-1'>
                <img src={`${el.image}`} alt="complaint" className=' w-full max-h-32 min-h-32' />
                <h2 className='text-center capitalize text-lg font-semi-bold border-b border-b-gray-900'>
                    {el.title}
                </h2>
                <div className='overflow-hidden p-2 capitalize flex flex-col'>
                    <p className='min-h-12'>
                        {el.text}
                    </p>
                    <p className=' text-gray-400 text-sm '>
                        complaint made by @{el.user}
                    </p>
                </div>
            </div>

        </>
    )
}

export default ComplaintCard
