import React from "react";

// JSON Data and State
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//CSS
import './Post.css'

// Comments
import { useDispatch } from "react-redux";


export default function PostVideos() {
    const dispatch = useDispatch()

    //State
    const [posts, setPosts] = useState([]);

    //Getting Data
    useEffect(() => {
        fetch('http://localhost:8000/posts_videos')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setPosts(data)
            })
    }, [])


    return (
        <div className="Post">
            <InfiniteScroll dataLength={posts.length} height={700} className="scroll">
                {posts.map((post) => {
                    const userimg = require("./Assets/Profiles/" + post.profile_picture)
                    const content = require("./Assets/Videos/" + post.post)
                    const video = post.post
                    return (
                        <div key={post.id} className="post">
                            <div className="post-top">
                                <div className="dp">
                                    <img src={userimg} alt="" />
                                </div>
                                <div className="post-info">
                                    <p className="name">{post.nom} {post.prenom}</p>
                                    <span className="time">2 days ago</span>
                                </div>
                                <i className="fas fa-ellipsis-h"></i>
                            </div>

                            <div className="post-content">
                                {post.description}
                                <video controls width="380px">
                                    <source src={content} type="video/mp4" />
                                </video>
                            </div>

                            <div className="post-bottom">
                                <div className="action">
                                    <i className="far fa-thumbs-up"></i>
                                    <span>Like</span>
                                </div>
                                <div className="action">
                                    <i className="far fa-comment"></i>
                                    <button onClick={()=>{dispatch({ type: 'videocommentvisibile' , payload : video })}} style={{ backgroundColor:'initial' , border:'initial' , color:'initial'}}>Comment</button>
                                </div>
                                <div className="action">
                                    <i className="fa fa-share"></i>
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </InfiniteScroll>
        </div>
        //Infinite Scroll

    )

}