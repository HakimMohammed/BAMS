import React from 'react';
import { useState } from 'react';

import './AjouterPublication.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



// import Menu from './Menu/Menu' ;


function AjouterPublication() {

    const dispatch = useDispatch()

    const formVsibility = useSelector(state => state.post)

    const [DefaultBtn, setDefaultBtn] = useState(<input id='default-btn' type="file" onChange={(e) => { Changer1(e) }} hidden />);
    const [DefaultBtn1, setDefaultBtn1] = useState(<input id='default-btn1' type="file" onChange={(e) => { Changer2(e) }} hidden />);
    const [AddVideoBtn, setAddVideoBtn] = useState(<button onClick={() => { DefaultBtnActive1() }} className='choix-button2 mt-3 ms-2 '><span className='button__icon_1 mt-1 ms-1'> <ion-icon name="videocam-outline"></ion-icon></span></button>);
    const [AddImageBtn, setAddImageBtn] = useState(<button className='choix-button  ms-5' onClick={() => { DefaultBtnActive() }}> <span className='mt-1 button__icon_1  ms-1'> <ion-icon name="image-outline"></ion-icon></span></button>);

    const [Lien, setLien] = useState();
    const [Lien1, setLien1] = useState();

    const [Element, setElement] = useState('');


    const Changer1 = (e) => {
        setLien(URL.createObjectURL(e.target.files[0]));
        setElement('Image');
    }

    const Changer2 = (e) => {
        setLien1(URL.createObjectURL(e.target.files[0]));
        setElement('Video');
    }

    const DefaultBtnActive = (e) => {
        console.log('Done');
        document.querySelector('#default-btn').click();
        console.log('Done 1');

    }
    const DefaultBtnActive1 = (e) => {
        console.log('Done');
        document.querySelector('#default-btn1').click();
        console.log('Done 1');

    }




    const Skeep = () => {
        setElement('');
        dispatch({ type: 'visibile' })
    }

    if (formVsibility === true) {
        document.getElementById('pop').style.display = 'flex';
    }
    return (


        <div id='pop' className='popup'>

            <div className='AjouterPublication container p-4'>
                <br className='m-4' />
                <div className='AddPub m-5 pe-2 pb-3'>
                    <div className='cancel-btn1' onClick={() => {
                        Skeep()
                        document.getElementById('pop').style.display = 'none';
                        let posts = document.querySelectorAll('Post');
                                    for (let post of posts) {
                                        // set the font size to 20px
                                        post.classList.remove('PointerState')
                                      }
                    }} ><span><ion-icon name="close-circle-outline"></ion-icon> </span> </div>

                    <div className='wrapper m-5 '>

                        <div className='image'>

                            {Element == 'Image' ? <img className='me-4' src={Lien} /> : ''}
                            {Element == 'Video' ? <video className='me-4' controls><source src={Lien1} type="video/mp4" /> </video> : ''}




                        </div>
                        {Element != '' ? '' : <div className='content'>
                            <div className='icon ms-3' > <ion-icon name="cloud-upload-outline"></ion-icon> </div>
                            <div className='text'><span className='me-3 fst-italic'>No file chosen , yet !</span>  </div>
                        </div>}
                        <div className='cancel-btn' onClick={() => { Skeep() }} ><span><ion-icon name="close-circle-outline"></ion-icon> </span> </div>
                        <div className='file-name text text-center'> File name here </div>
                    </div>
                    <div >
                        <div className='d-flex ms-5'>
                            <textarea placeholder='Ecrire Votre Message ici ...' className='form-control w-75 ms-3'></textarea>
                            <button className='Envoyer-button mt-4 ms-4  '><span className='button__icon_3 ms-2 mt-1'><ion-icon name="send-outline"></ion-icon></span></button>

                        </div>

                        <div className='ms-3'>
                            {AddImageBtn}
                            {AddVideoBtn}
                            {DefaultBtn}
                            {DefaultBtn1}

                        </div>


                    </div>


                    <div className=''>

                    </div>

                </div>





            </div>
        </div>

    );
}


export default AjouterPublication;
