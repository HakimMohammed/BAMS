import React from "react";

// JSON Data and State
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//CSS
import './Post.css'

//Comments
import { useDispatch } from "react-redux";


export default function PostImages() {

    const dispatch = useDispatch()

    //State
    const [posts, setPosts] = useState([]);

    //Getting Data
    useEffect(() => {
        fetch('http://localhost:8000/posts_images')
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
                    const content = require("./Assets/Images/" + post.post)
                    const image = post.post
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
                                <img src={content} alt="" />
                            </div>

                            <div className="post-bottom">
                                <div className="action">
                                    <i className="far fa-thumbs-up"></i>
                                    <span>Like</span>
                                </div>
                                <div className="action">
                                    <i  className="far fa-comment"></i>
                                    <button onClick={()=>{dispatch({ type: 'commentvisibile' , payload : image })}} style={{ backgroundColor:'initial' , border:'initial' , color:'initial'}}>Comment</button>
                                    {/* <span onClick={()=>{ 
                                        dispatch({ type: 'commentvisibile' , payload : content })
                                    }} >Comment</span> */}
                                </div>
                                <div className="action">
                                    <i className="fa fa-share"></i>
                                    <span>Share</span>
                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </InfiniteScroll>
        </div>


    )

}