import React from "react";
import "./CreationGroupe.css"

import { useState } from "react";


import Section from "./Section";

import Section2 from "./Section2";
import { collection, addDoc, doc, setDoc, deleteDoc, getDoc, updateDoc, Firestore } from "firebase/firestore";
import { db } from '../../../FireBase/config';
// import { Firestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { arrayUnion } from 'firebase/firestore';
import { storage } from '../../../FireBase/config';


import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { useRef } from "react";


const CreationGroupe = () => {

  

  const [LienImage, setLienImage_1] = useState([]);
  const [NomGroupe, setNomGroupe] = useState()
  const [AutrePage, setAutrePage] = useState(false);
  const [DescriptionGroupe, setDescriptionGroupe] = useState();
  const [Url, setUrl] = useState();
  const [Ref, setRef] = useState();
  const [Liste_Chacked, setChackedListe] = useState([]);
  const [IdGroupePublication_2, setIdGroupePublication] = useState();


  const dispacth = useDispatch();
  const groupState = useSelector(state=>state.groupCreate)

  const groupRef = useRef(null);

  if( groupState === true)
  {
    groupRef.current.style.display = 'flex' ;
  }

  const ValiderCreation = () => {

    if (AutrePage == false) {
      const IdGroupePublication = "GroupePublication " + Math.random() * 100;
      setIdGroupePublication(IdGroupePublication);
      const LinkImageProfilGroupe = "Groupe/ GroupePublication / " + IdGroupePublication + " / Profil / ProfilGroupe " + Math.random() * 1000;



      const imageRef = ref(storage, LinkImageProfilGroupe);

      console.log('imageRef => :' + imageRef);

      setRef(imageRef);
      uploadBytes(imageRef, LienImage).then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            console.log(url);
            setUrl(url);
            EnregistrerValidation(url, IdGroupePublication)
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });

      })
        .catch((error) => {
          console.log(error.message);
        });

      const EnregistrerValidation = (url, IdGroupePublication) => {
        setDoc(doc(db, "GroupePublication", IdGroupePublication),
          {
            NomGroupe: NomGroupe,
            DescriptionGroupe: DescriptionGroupe,
            ImageDeGroupe: url,
          }
        )
      }
      setAutrePage(true);

    } else {

      const ListeMembreDeGroupe = [];

      Liste_Chacked.forEach(User => {
        if (User.Chacked == true) {
          ListeMembreDeGroupe.push(User.id);
        }
      });

      console.log(ListeMembreDeGroupe);



      updateDoc(doc(db, "GroupePublication", IdGroupePublication_2),
        {
          Admin: 'User_1',
          ListeDesMembre: ListeMembreDeGroupe,
        }
      )

    }
  }
  return (
    // <div ref={groupRef} className="popup CreationGroupe">
      <div ref={groupRef} className="CreationGroupe fst-italic p-5 popup" >
        <div className="EmplacementCreationGroupe m-1 pt-1 rounded-3">
          <div className="Header">
            <div className='cancel-btn' onClick={()=>{ groupRef.current.style.display="none"}}><span><ion-icon name="close-circle-outline"></ion-icon> </span> </div>
            <div className="Titre ms-4 ">
              <h3>
                Créer un groupe :
              </h3>
            </div>
          </div>
          <hr />

          {AutrePage ? <Section2

            setChackedListe={setChackedListe}
            Liste_Chacked={Liste_Chacked}

          /> : <Section

            setNomGroupe={setNomGroupe}
            setDescriptionGroupe={setDescriptionGroupe}
            setLienImage_1={setLienImage_1}

          />}

          <hr />
          <div className="footer">
            <div className="Envoyer">

              <button className='Envoyer-button' onClick={ValiderCreation}><span className='button__icon_3 ms-2 mt-1'><ion-icon name="send-outline"></ion-icon></span></button>

            </div>
          </div>
        </div>
      </div>
    // </div>


  );
}


export default CreationGroupe;