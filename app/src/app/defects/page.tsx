import { isLogged } from "@centrin/utils/auth"
import { redirect } from 'next/navigation';

const Defects = async () => {
    const logged = await isLogged()   
    if(!logged) {
        redirect("/login")
    }

    
        

}

export default Defects