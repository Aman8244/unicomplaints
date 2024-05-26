import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ComplaintCard from "./ComplaintCard";

const ComplaintsList = () => {
    const [activeIssues, setActiveIssues] = useState([]);
    const [resolvedIssues, setResolvedIssues] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get("http://localhost:8000/complaints").then(response => {
                setActiveIssues(() => {
                    return response.data.complaints.filter((el) => {
                        return el.status === true
                    })
                })
                setResolvedIssues(() => {
                    return response.data.complaints.filter((el) => {
                        return el.status === false
                    })
                })
            })
        }
        fetchData();
    }, [])
    activeIssues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    resolvedIssues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return (
        <div>

            {activeIssues && activeIssues[0] ?
                <div>
                    <h2 className='text-xl font-bold'>Active Complaints</h2><br />
                    <div className='flex flex-row'>
                        {activeIssues.map((el) => {
                            return <ComplaintCard el={el} />
                        })}
                    </div>
                </div> :
                <div>
                    <h2 className='text-xl font-bold'>Active Complaints</h2><br />
                    <div className='m-auto max-w-fit'>
                        <img className='w-full h-40' src="https://media.istockphoto.com/id/157725161/photo/illustration-of-a-wooden-box-used-for-complaint-slips.jpg?s=612x612&w=0&k=20&c=TJaiWOup1KlRK3DMBrMiSC2MT37axJaH0b1F99NTkTU=" alt="box" />
                    </div>
                </div>}
            <br />
            {resolvedIssues && resolvedIssues[0] ?
                <div>
                    <h2 className='text-xl font-bold'>Resolved Complaints</h2><br />
                    <div className='flex flex-row'>
                        {resolvedIssues.map((el) => {
                            return <ComplaintCard el={el} />
                        })}
                    </div>
                </div> : <div>
                    <h2 className='text-xl font-bold'>Resolved Complaints</h2><br />
                    <div className='m-auto max-w-fit'>
                        <img className='w-full h-40' src="https://media.istockphoto.com/id/157725161/photo/illustration-of-a-wooden-box-used-for-complaint-slips.jpg?s=612x612&w=0&k=20&c=TJaiWOup1KlRK3DMBrMiSC2MT37axJaH0b1F99NTkTU=" alt="box" />
                    </div>
                </div>}

        </div>
    )
}

export default ComplaintsList
