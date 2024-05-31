import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Forward = () => {
    const { id: id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:4000/" + id).then((res) => {
            window.location.href = res.data
        }).catch(() => {
            window.location.href = "/"
        })
    }, [])

    return null;
}

export default Forward;