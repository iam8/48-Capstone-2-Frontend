import React, {useState, useEffect} from "react";
import axios from "axios";


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
    const EXTERN_URL = "https://www.thecolorapi.com/id";
    const [colorData, setColorData] = useState(null);

    useEffect(() => {
        async function fetchColorDataOnMount() {
            try {
                const data = await axios.get(`${EXTERN_URL}/?hex=${hex}`);
                setColorData(data.data);
                console.log("COLOR DATA RESULT:", data.data);
            } catch(err) {
                console.log("ERROR FETCHING COLOR DATA:", err);
            }
        }

        fetchColorDataOnMount();
    }, [hex]);

    if (!colorData) return <div>LOADING...</div>

    return (
        <div className="ColorDetails">
            This is in the ColorDetails component.
            Retrieved hex value of color: {colorData.hex.clean}
        </div>
    );
}


export default ColorDetails;
