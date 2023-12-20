import { FC } from "react";
import "./modal.scss"

interface Props {
    content: string
}
 
const Modal: FC<Props> = ({content}) => {
    return ( 
        <div className="container__modal">
            <div className="container__modal--overlay"></div>
            <div className="container__model__content">
                    <p>{content}</p>
            </div>
        </div>
     );
}
 
export default Modal;