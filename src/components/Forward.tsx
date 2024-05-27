import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Forward = () => {
    const { link } = useParams();

    useEffect(() => {
        axios.get("http://localhost:4000/" + link).then((res) => {
            window.location.href = res.data
        }).catch(() => {
            window.location.href = "/"
        })
    }, [])

    return <></>;
}

export default Forward;