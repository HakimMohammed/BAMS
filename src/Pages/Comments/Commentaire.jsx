




const Commentaire = () => {

    const User = require('../Home/Componenets/Assets/Profiles/User 10.jpg')

    return (
        <div>
            <div className='Image m-2'>
                <img src={User}/>
            </div>
            <div className='comment-body'>
                <span className='Name'>
                    User --1 :
                </span>
                &nbsp; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum error,
                officiis ex architecto magnam expedita, volupt,

                <br />

                <div className='muted'>
                    <span>
                        2 Days
                    </span>
                    <span>
                        <b>
                            &nbsp; 1 Like
                        </b>
                    </span>
                </div>
            </div>
            <div className='heart-outline'>
                <span className='heart-outline'>
                    <ion-icon name="heart-outline"></ion-icon>
                </span>
            </div>
        </div>

    );
}

export default Commentaire;