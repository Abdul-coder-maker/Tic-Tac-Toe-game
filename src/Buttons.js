import React from "react"
export default function Buttons(props) {
    const [firstTime, setFirsTime] = React.useState(false)
    const [disable, setDisable] = React.useState(false)
    return  (
        <button
        disabled={props.isWinner ? true : disable}
         className="w-32 h-32 border border-yellow-300 text-4xl focus:outline-none" onClick={(id) => {
            props.toggle(props.id)
            setFirsTime(true)
            setDisable(true)
            if (!props.isWinner) {
                setDisable(false)
            }
        }}>
{!firstTime ? "" : props.isClicked}
        </button>
    )
}