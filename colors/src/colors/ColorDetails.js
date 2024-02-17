import React, {useState, useEffect, useContext} from "react";
import { Button, List } from "reactstrap";
import axios from "axios";

import UserContext from "../auth/UserContext";


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
    const {currentUser} = useContext(UserContext);
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

            <img src={colorData.image.bare} alt={colorData.name.value}/>

            <List>
                <li>Name: {colorData.name.value}</li>
                <li>Hex: {colorData.hex.clean}</li>
                <li>RGB: {colorData.rgb.value.replace("rgb", "")}</li>
                <li>HSL: {colorData.hsl.value.replace("hsl", "")}</li>
                <li>HSV: {colorData.hsv.value.replace("hsv", "")}</li>
                <li>CMYK: {colorData.cmyk.value.replace("cmyk", "")}</li>
                <li>XYZ: {colorData.XYZ.value.replace("XYZ", "")}</li>
            </List>

            <div>
                {currentUser ?
                    <Button color="primary">Add to a collection (temp button)</Button> : <></>}
            </div>

        </div>
    );
}


export default ColorDetails;
