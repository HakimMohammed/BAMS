import { combineReducers } from "redux";

const logedInReducer = (state=false , action)=>{
    switch (action.type) {
        case "logIn":
            state = true ;
        case "logOut" :
            state = false        
    }
    return state
}

const signedUpReducer = (state=false , action)=>{
    switch (action.type)
    {
        case "signUp":
            state = true ;
    }
    return state
}

const userReducer = (state={} , action)=>{
    switch (action.type)
    {
        case 'identify':
            state = action.payload
        case 'quit':
            state = {}
    }
    return state
}

const popupPostCreateReducer = (state=false , action)=>{
    switch(action.type)
    {
        case 'visibile':
            state = !state
    }
    return state
}

const groupCreateReducer = (state=false , action )=>{
    switch(action.type)
    {
        case 'createVisibility':
            state = !state
    }
    return state
}


const commentReducer = (state={show:false , imgsrc:''} , action)=>{
    switch(action.type)
    {
        case 'commentvisibile':
            state = {...state , show:!state.show , imgsrc:action.payload}
            // state.show = !state.show
            // state.imgsrc = action.payload
    }
    return state
}

const videoCommentReducer = (state={show:false , videosrc:''} , action)=>{
    switch(action.type)
    {
        case 'videocommentvisibile':
            state = {...state , show:!state.show , videosrc:action.payload}
    }
    return state
}

const reducer = combineReducers({
    logedIn :logedInReducer ,
    signedIn :signedUpReducer,
    user : userReducer,
    post : popupPostCreateReducer,
    comment : commentReducer,
    videocomment : videoCommentReducer,
    groupCreate : groupCreateReducer
})
export default reducer