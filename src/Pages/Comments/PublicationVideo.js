// import react from 'react' ;

import Commentaire from './Commentaire';
import './Publication.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const PublicationVideo = () => {

    const commentShow = useSelector(state => state.videocomment)
    console.log(commentShow.videosrc)

    const video = commentShow.videosrc;
    var videosrc = ""


    if (commentShow.show === true) {
        document.getElementById('videoComment').style.display = 'flex'
        videosrc = require("../Home/Componenets/Assets/Videos/" + video)
    }



    const ListExemple = [1, 2, 3, 4, 5];

    return (

        <div className='popUpComment' id='videoComment'>
            <div className='ms-5'>
                <div className='Publication  card w-75 m-5'>

                    <div className='Post'>
                         <video controls width="380px">
                            <source src={videosrc} type="video/mp4" />
                        </video>
                    </div>
                    <div className='Commentaire fst-italic'>
                        <header style={{ display: 'flex' }}>
                            <span className='title' style={{ paddingLeft: '200px' }}> Comments </span>
                            <div className='cancel-btn1' onClick={() => {
                                document.getElementById('videoComment').style.display = 'none';
                                let posts = document.querySelectorAll('Post');
                                for (let post of posts) {
                                    // set the font size to 20px
                                    post.classList.remove('PointerState')
                                }
                            }} ><span><ion-icon name="close-circle-outline"></ion-icon> </span> </div>
                        </header>
                        <section className='Section'>
                            {ListExemple.map(() => <Commentaire />)}

                        </section>
                        <footer>
                            <div>
                                <section>
                                    <div className='icons'>
                                        <div className='ms-3'>
                                            <ion-icon name="heart-outline"></ion-icon>
                                        </div>
                                        <div className='chatbubble-outline ms-3'>
                                            <ion-icon name="chatbubble-outline"></ion-icon>
                                        </div>
                                        <div className='share-outline ms-3'>
                                            <ion-icon name="share-outline"></ion-icon>
                                        </div>
                                    </div>
                                    <div className='me-2' >
                                        <span>
                                            11 123 J'aime  &nbsp;
                                        </span>

                                        <span>
                                            NOVEMBRE 16
                                        </span>
                                    </div>
                                </section>
                                <div className='Envoyer'>
                                    <textarea className='form-control w-75  ms-2'>

                                    </textarea>
                                    <button className='Envoyer-button m-2 '><span className='button__icon_3 ms-2 mt-1'><ion-icon name="send-outline"></ion-icon></span></button>

                                </div>
                            </div>
                        </footer>


                    </div>

                </div>
            </div>
        </div> 
    //     <video controls width="380px">
    //     <source src={videosrc} type="video/mp4" />
    // </video>



    );
}

export default PublicationVideo;