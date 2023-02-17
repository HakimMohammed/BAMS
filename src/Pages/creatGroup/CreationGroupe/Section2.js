
import React, {useState, useEffect} from "react";

import { storage } from  '../../../FireBase/config';
import { ref, uploadBytes, getDownloadURL ,  deleteObject } from "firebase/storage";
import { arrayUnion } from 'firebase/firestore';
import {collection ,onSnapshot,query ,addDoc, doc , setDoc, deleteDoc ,getDocs ,getDoc , updateDoc, Firestore }  from "firebase/firestore" ;
import {db} from '../../../FireBase/config' ; 
import { async } from "@firebase/util";




const Section2 = (props) => {

    const [ListAmis , setListeAmis ]= useState([]) ;
    const [Test, setTest] = useState(false);
   
    const [ListData , setListData] = useState([]);

    // const DonnerChackedMembre = (e) => {
    //     console.log(e.target.chacked);
    // }

//    const Ref = doc(db,'Utilisateur','User_1') ;
//      getDoc(doc(db,'Utilisateur','User_1')).then((snapDoc) => {
//                 {
                    
                   
//                     setListeAmis(snapDoc.data.ListAmis);
                    
//                 }
//             })
//     onSnapshot(Ref,(doc) => {
//         console.log(Doc.data())
//     })

    // const arg = null ;
    useEffect(() => {
        ;(async () => {
            const DocRef = doc(db,'Utilisateur','User_1');
            const snapShot = await getDoc(DocRef);
            const ListAmis_3 = [] ;
            // console.log(snapShot.data().ListAmis);
            // setListeAmis(snapShot.data().ListAmis);
            const ListAmis_2 = snapShot.data().ListAmis;
            let i = 0 ;
            ListAmis_2.forEach(async(Element) => {
            
                const DocRef_2 = doc(db,'Utilisateur',Element);
                const snapShot = await getDoc(DocRef_2);
                
                const Data = {
                    id : Element ,
                    Nom : snapShot.data().Nom ,
                    Prenom : snapShot.data().Prenom ,
                    image : snapShot.data().Image ,
                    Chacked : false ,
                }
                ListAmis_3.push(Data) ;
                i++ ;
                if(i == 4 && Test == false){
                    setTest(true);
                    setListeAmis(ListAmis_3);
                    props.setChackedListe(ListAmis_3);
                    setListData(ListAmis_3)
                }
                
            });
           
            

           
           
        })()
    },[ListAmis]
    )

   

    // const MakeData = (Data) => {
    //     console.log(ListAmis);
    //     setListeAmis(Data);

    // }
    // console.log(ListAmis);

    // const Doc = query(getDoc(doc(db,"Utilisateur","User_1"))) ;
    // const Test = Doc.data();
    
    
    
     
     const Search = (e) => {
        const Typing  =  e.target.value ;
    
        const Test = ListAmis.filter((User) => {
            const CompletNom = User.Nom +' '+User.Prenom
            return(
                CompletNom.startsWith(Typing)
            )
        });
        console.log(Test)
        setListData(Test) ;
     }
       

     const ValiderSelection = (e) => {
        
        let Action = e.target.value ;
        let ListData_2 = ListData ;
        console.log(ListData_2 );
        let ListData_3 = ListData_2.map(User => {
            let NewVal = User.Chacked ;
            if(User.id == Action){
                NewVal = !User.Chacked ;
                console.log(User.Chacked) ;

            }
            return (
              {
                id : User.id,
                Nom : User.Nom ,
                Prenom : User.Prenom ,
                image : User.image ,
                Chacked : NewVal ,
              }      
             ) ;
        
            
        });


        let ListData_4 = props.Liste_Chacked ;
        console.log('Liste Data 3 =>   ' );
        console.log(ListData_3);
        console.log('Liste Data 4 =>   ' );
        console.log(ListData_4) ;
        
        let ListData_5 = ListData_4.map(User => {
            let NewVal = User.Chacked ;
            if(User.id == Action){
                NewVal = !User.Chacked ;
                console.log(User.Chacked);
                User.Chacked = !User.Chacked ;
                console.log(User.Chacked) ;
            }
            return {
                id : User.id ,
                Nom : User.Nom ,
                Prenom : User.Prenom ,
                image : User.image ,
                Chacked : NewVal ,
              }       ;
            
        });

        console.log('Liste Data 5 =>   ' );
        console.log(ListData_5) ;




        AjouterLesSelectors(ListData_3,ListData_5)
      

     }


     const AjouterLesSelectors = (ListData_3,ListData_5) => {
        
        setListData(ListData_3);
        props.setChackedListe(ListData_5);
     }


    return(
        <div className="Section-2">
        <div className='Search mt-2'>
        <input 
        type='text'
        className='form-control border border-4 rounded-pill px-3' 
        placeholder='Type to search friend ...'
        onChange={Search}
        />
        <div className='search-outline me-2'> <ion-icon name="search-outline"></ion-icon> </div>
        </div>

        <div className="Titre ms-4">
        <h4>
        Selectionner les membres de groupe
        </h4>
        
        </div>
        <div className="ApresTitre ">
        <hr className=" w-50"/>
        </div>

        <div className='autocom-box mt-5'>
        { 
           ListAmis.length == 0? '' : ListData.map((User) =>
         
               
        <li> 
        <div className="Profil">
        <div className='ImageProfil'>
        <img  src={User.image} /> 
        </div>
        <div className='Name '>
        <span className="fw-bold">
        {User.Nom} {User.Prenom} 
        </span>
        </div>
        </div>
        <div className='checkbox'>
        <span className='checkbox_span'>
        <input onChange={ValiderSelection} value = {User.id} type="checkbox" checked = { User.Chacked == true ? true : false} className="Checkbox_input" /> 
        </span>
        </div>
        </li>
          
         )}
        </div>
        



        </div>

       
    );
}



export default Section2 ;