import { useContext } from "react";
import { LineContext } from "../context/LineContext";

export default function FourthLine() {
    const { text } = useContext(LineContext);
    return <p>{text}</p>;
}
