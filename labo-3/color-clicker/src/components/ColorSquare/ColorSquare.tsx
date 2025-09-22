interface ColorSquare{
    prop: string
}
function ClickAllert(prop: string) {
    alert(prop)
}
function ColorSquare({prop} : ColorSquare) {

    return (
            <div
                style={{background: prop, width: "100px", height: "100px"}}
                onClick={() => ClickAllert(prop)}
            >
            </div>
    );
}
export default ColorSquare;