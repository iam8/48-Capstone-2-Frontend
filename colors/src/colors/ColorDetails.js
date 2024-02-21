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
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [fetchErrors, setFetchErrors] = useState(null);

    useEffect(() => {

        /** Fetch color details and collection data for current user (if any). */
        async function fetchDataOnMount() {
            try {
                const requests = [
                    axios.get(`${EXTERN_URL}/?hex=${hex}`)
                ];

                if (currentUser) requests.push(ColorsApi.getCollsByUser(currentUser.username));
                // if (currentUser) requests.push(ColorsApi.getCollsByUser("TRIGGER ERROR"));

                const results = await Promise.all(requests);

                setColorData(results[0].data);
                setCollections(results[1]);
                setIsDataFetched(true);
            } catch(err) {
                console.log("ERROR FETCHING DATA:", err);
                setFetchErrors(err);
            }
        }

        fetchDataOnMount();
    }, [hex, currentUser]);

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
        if (!collections.length) {
            return (<>
                <div>
                    You have no collections.
                </div>
            </>);
        }

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

    if (fetchErrors) return <div>
        ERROR in calling API(s): {fetchErrors[0]}. Please try again later.
    </div>

    if (!isDataFetched) return <div>FETCHING DATA...</div>

    return (
        <div className="ColorDetails">

            {displayColorInfo()}
            {currentUser ? displayCollectionInfo() : <></>}

        </div>
    );
}


export default ColorDetails;
