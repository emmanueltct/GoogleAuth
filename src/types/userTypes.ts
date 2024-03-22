
interface IUSER{
    name:String,
    profile:String,
    email:String
    }
    interface USER{
        id:string,
        displayName:string,
        emails:[{
            value:string
        }],
        photos:[{
            value:string
        }]
    }
    
    export { IUSER, USER}