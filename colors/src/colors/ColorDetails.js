import React, {useState, useEffect, useContext} from "react";
import { Button, List } from "reactstrap";
import axios from "axios";

import ColorsApi from "../api";
import UserContext from "../auth/UserContext";


/**
 * Display details about a specific color, designated by its 6-digit hex value.
 *
 * Fetches and displays details about the given color.
 *
 * TEMP! If a user is logged in, fetches and displays collection data for that current user.
 *
 * Props
 *  - hex (string): hex value for a color to retrieve data for
 * State
 *  - colorData (object): data fetched from external API for current color
 *  - TEMP! collections (list): all collections data fetched for current user, if any
 */
function ColorDetails({hex}) {
    const EXTERN_URL = "https://www.thecolorapi.com/id";

    const {currentUser} = useContext(UserContext);
    const [colorData, setColorData] = useState(null);
    const [collections, setCollections] = useState(null);

    useEffect(() => {
        async function fetchColorDataOnMount() {
            console.log("FETCHING COLOR DETAILS...");
            try {
                const data = await axios.get(`${EXTERN_URL}/?hex=${hex}`);
                setColorData(data.data);
                console.log("COLOR DATA RESULT:", data.data);
            } catch(err) {
                console.log("ERROR FETCHING COLOR DATA:", err);
            }

            console.log("COLOR DETAILS LOADED");
        }

        async function fetchCollectionsOnMount() {
            console.log("FETCHING COLLECTIONS DATA...");

            try {
                const data = await ColorsApi.getCollsByUser(currentUser.username);
                setCollections(data);
                console.log("COLLECTIONS DATA RESULT:", data);
            } catch(err) {
                console.log("ERROR FETCHING COLLECTIONS:", err);
            }

            console.log("COLLECTIONS DATA FETCHED");
        }

        fetchColorDataOnMount();
        if (currentUser) fetchCollectionsOnMount();
    }, [hex]);

    function displayColorInfo() {
        return (<>
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
        </>);
    }

    function displayCollectionInfo() {
        return (<>
            <div>Collection data:</div>

            <List>
                {collections.map((coll) => {
                    return <li key={coll.id}>
                        <div>ID: {coll.id}</div>
                        <List>
                            <li>Title: {coll.title}</li>
                            <li>Username: {coll.username}</li>
                        </List>
                    </li>
                })}
            </List>

            <div>
                <Button color="primary">Add to a collection (temp button)</Button>
            </div>
        </>);
    }

    if (!currentUser && !colorData) return <div>LOADING...</div>
    if (currentUser && (!colorData || !collections)) return <div>LOADING...</div>

    return (
        <div className="ColorDetails">

            {displayColorInfo()}
            {currentUser ? displayCollectionInfo() : <></>}

        </div>
    );
}


export default ColorDetails;
