import {Button} from "view/components/button";
import {LoginPopup} from "view/module/loginPopup";
import {useState} from "react";

type PropsType = {
    text: string
}
export const LoginButton = (props: PropsType) => {
    const {text} = props

    const [showPopup, setShowPopup] = useState(false)

    return (
        <>
            <Button text={text} modes={[`uppercase`, `maxWidth`]} click={() => setShowPopup(true)}/>
            {showPopup && <LoginPopup mode={'login'} close={()=>setShowPopup(false)}/>}
        </>
    );
};
