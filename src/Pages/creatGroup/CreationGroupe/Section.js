import React, {useState} from "react";






const Section = (props) => {

    const [LienImage , setLienImage ] = useState() ;
    const [Existe,setExiste] = useState(false) ;
    
    const AddImage = () => {
        document.querySelector('#AddImage').click() ;
    }

    const Change1 = (e) => {
        
        console.log(e.target.files[0]);
        props.setLienImage_1(e.target.files[0]) ;
        setLienImage(URL.createObjectURL(e.target.files[0]));
        setExiste(true) ;

    }

    return(
        <div className="section">
        <label className="ms-2">
        Nom de groupe :
        </label> 
        <input type="text" onChange={(e) => props.setNomGroupe(e.target.value)} placeholder="Taper le nom du groupe" className="form-control mt-2 w-75 ms-5"  />
        <label className="mt-2 ms-2">
        Donner une description :
        </label>
        <textarea onChange={(e) => props.setDescriptionGroupe(e.target.value) } placeholder="Donner une description sur le groupe" className="form-control mt-2 w-75 ms-5">
        </textarea>
        <div className="AddImage">
        <div className="EmplacementImage mt-3" onClick={AddImage}>
        {Existe == true ? <div className="Image"> <img src={LienImage} /> </div>  : ''}
        </div>
        <div className="add-circle-outline" onClick={AddImage}>
        <span className="add-circle-outline">
        <ion-icon name="add-circle-outline"></ion-icon>
        </span>
        <input type = "file" id="AddImage" onChange={Change1}  hidden/>
        </div>
       
        </div>    
        </div>
    );
}



export default Section ;