import { useUser } from '@clerk/clerk-react'
import axios from 'axios';
import React, { useState } from 'react'

const Comment = ({ commentData }) => {
    const userData = useUser();
    const userId = userData ? userData.user?.id : "";
    const [data,setData] = useState(commentData)
    const handleDelete = async (message) => {
        await axios.post(`http://localhost:8000/post/comment/delete`, {
            userId: userId,
            comment: message
        })
        setData((prev)=>{
            return prev.filter((el)=>{
                return (el.userId === userId && el.comment !== message) || (el.userId !== userId)
            })
        })
    }

    return (
        <div>
            {data?.map((el) => {
                return <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                <img className="mr-2 w-6 h-6 rounded-full" src="https://img.icons8.com/fluency-systems-filled/48/user.png" alt="user" />
                                {el.user}
                            </p>
                        </div>
                    </footer>
                    <p className="text-gray-500 dark:text-gray-400">
                        {el.comment}
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                        {userId === el.userId && <button onClick={() => handleDelete(el.comment)} type="button"
                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                            <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 20 18">
                                <path stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round" stroke-width="2"
                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                            </svg>
                            delete
                        </button>}
                    </div>
                </article>
            })}
        </div>
    )
}

export default Comment
