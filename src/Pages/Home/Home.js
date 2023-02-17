import React from "react";

import Menu from '../Menu/Menu'
import PostImages from "./Componenets/PostImages";
import PostVideos from "./Componenets/PostVideos";
import AjouterPublication from "../createPost/AjouterPublication";
import Publication from "../Comments/Publication";
import PublicationVideo from "../Comments/PublicationVideo";
import CreationGroupe from "../creatGroup/CreationGroupe/CreationGroupe";

import './Home.css'


export default function Home()
{
    
    return(
        <div className="Home">
            <Menu />
            <div className="container">
                <CreationGroupe />
                <PublicationVideo />
                <Publication />
                <AjouterPublication/>
                <PostImages />
                <PostVideos />
            </div>
        </div>
    )
}