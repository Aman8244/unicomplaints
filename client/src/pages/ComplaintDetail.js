import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import Comment from '../components/Comment';
import Footer from '../components/Footer';

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [detail, setDetail] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [resolvedImage, setResolvedImage] = useState("");
  const [comment, setComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const findDetail = async () => {
      await axios.get(`http://localhost:8000/complaint/${complaintId}`).then(res => {
        setDetail(res.data.findData);
      })
    }
    findDetail();
  }, [complaintId])

  const handleResolve = async () => {
    setLoading(true)
    await axios.put("http://localhost:8000/complaints", {
      status: false,
      image: resolvedImage,
      complaintId: complaintId
    }) 
    setDetail({});
    await axios.get(`http://localhost:8000/complaint/${complaintId}`).then(res => {
      setDetail(res.data.findData);
    })
    setLoading(false)
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setResolvedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const PostComment = async (e) => {
    setCommentLoading(true)
    if (!user) {
      navigate("/signin");
    }
    e.preventDefault();
    await axios.post("http://localhost:8000/post/comment", {
      user: user.fullName,
      comment: comment,
      userId: user.id,
      complaintId: complaintId
    });
    setComment("");
    setDetail({});
    await axios.get(`http://localhost:8000/complaint/${complaintId}`).then(res => {
      setDetail(res.data.findData);
    })
    setCommentLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className='p-4 flex capitalize flex-row'>
        <div className='w-2/5'>
          <img className='max-h-36 w-4/5 m-auto' src={`${detail.image}`} alt="complaintImage" />
          {detail.status === false && <div>
            <br /><hr className='h-0 border-gray-600 border' />
            <h2 className='text-2xl mt-4 mb-4'>
              Resolved Image <hr className='w-1/5 h-0 border border-gray-400' />
            </h2>
            <div>
              <img className='max-h-36 w-4/5 m-auto' src={`${detail.resolvedImage}`} alt="resolved" />
            </div>
          </div>}
        </div>
        <div className='p-4 text-wrap'>
          <h2 className='text-2xl font-bold'>
            {detail.title}
          </h2><br />
          <p>
            {detail.text}
          </p><br />
          {detail.status ?
            <p className='bg-red-700 text-white text-center p-2 inline-block text-xl text-bold'>
              Active
            </p> : <p className='bg-green-700 text-white text-center p-2 inline-block text-xl text-bold'>
              Resolved
            </p>}
          <br />
          <p className='text-gray-400 mt-4'>
            complaint raised by @{detail.user}
          </p>
          {user && user.unsafeMetadata.isAdmin &&
            <div>
              {detail.status === false ?
                <></>
                : <div>
                  <p>Mark as Complete?</p>
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
                  <button onClick={handleResolve} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={loading}>
                    {loading ? 'Attaching Image...' : 'Attach Image'}
                  </button>
                </div>}
            </div>}
        </div>
      </div>
      <div className='m-6'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion</h2>
        </div>
        <form onSubmit={PostComment} className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              onChange={(e) => { setComment(e.target.value) }}
              value={comment}
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          {commentLoading ?
            <button
              type="disabled"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Posting comment
            </button> : <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>}
        </form>
        <div>
          {detail.comments && detail.comments[0] && detail.comments[0].user &&
            <div>
              <Comment commentData={detail.comments} />
            </div>}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ComplaintDetail
