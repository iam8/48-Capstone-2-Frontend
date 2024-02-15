import React, {useState, useEffect} from "react";


/**
 * Display details about a specific color, designated by its 6-digit hex value.
 *
 * Calls external API at thecolorapi.com to get detailed info about a color, then displays
 * selected data from the result.
 *
 * Props
 *  - hex (string): hex value for a color to retrieve data for
 * State
 *  - colorData (object): data fetched from external API for current color
 */
function ColorDetails({hex}) {
    const [colorData, setColorData] = useState(null);

    useEffect(() => {
        async function fetchColorData() {

        }
    })


    return (
        <div className="ColorDetails">
            This is in the ColorDetails component.
            The current color is: {hex}
        </div>
    );
}


export default ColorDetails;
