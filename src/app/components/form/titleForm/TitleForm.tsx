import { FC } from "react";
import "./TitleForm.scss"

interface Props {
    text: string
}

const Title: FC<Props> = ({text}) => {

    return (
            <h1 className="titleForm">{text}</h1>
    )
}

export default Title