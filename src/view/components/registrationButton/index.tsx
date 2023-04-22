import {Button} from "view/components/button";
import {LoginPopup} from "view/module/loginPopup";
import {useState} from "react";

export const RegistrationButton = () => {
    const [showPopup, setShowPopup] = useState(false)

    return (
        <>
            <Button text={`Создать аккаунт`} modes={[`red`,`uppercase`, `maxWidth`]} click={() => setShowPopup(true)}/>
            {showPopup && <LoginPopup mode={'registration'} close={()=>setShowPopup(false)}/>}
        </>
    );
};
