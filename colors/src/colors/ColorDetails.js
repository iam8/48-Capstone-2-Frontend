import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Button, List } from "reactstrap";
import axios from "axios";

import ColorsApi from "../api";
import UserContext from "../auth/UserContext";
import CollectionsContext from "../collections/CollectionsContext";


/**
 * Display details about a specific color, designated by its 6-digit hex value.
 *
 * Fetches and displays details about the given color.
 *
 * Props
 *  - hex (string): hex value for a color to retrieve data for
 * State
 *  - colorData (object): data fetched from external API for current color
 *  - isDataFetched (bool): true if color data has been fetched, false otherwise
 *  - fetchErrors (object): contains error info if API call failed; null otherwise
 */
function ColorDetails({hex}) {
    const EXTERN_URL = "https://www.thecolorapi.com/id";

    const history = useHistory();
    const {currentUser} = useContext(UserContext);
    const {collections} = useContext(CollectionsContext);
    const [colorData, setColorData] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [fetchErrors, setFetchErrors] = useState(null);

    console.log("RENDERING ColorDetails COMPONENT");

    useEffect(() => {

        /** Fetch color details. */
        async function fetchColorData() {
            console.log("FETCHING COLOR DATA...");
            try {
                const data = await axios.get(`${EXTERN_URL}/?hex=${hex}`);
                setColorData(data.data);
            } catch(err) {
                console.log("ERROR FETCHING COLOR DATA:", err);
                setFetchErrors(err);
            }

            setIsDataFetched(true);
        }

        fetchColorData();
    }, [hex]);

    /** Return to colors search bar. */
    function backToSearch() {
        history.push("/colors");
    }

    /** Add current color (hex) to the collection with the given ID. */
    async function addColorToCollection(id) {
        try {
            await ColorsApi.addColor(id, {colorHex: hex});
            console.log(`Successfully added color ${hex} to collection ${id}`);
        } catch(err) {
            console.log("ERROR ADDING COLOR TO COLLECTION:", err);
        }
    }

    /** Display details on current color. */
    function displayColorInfo() {
        return (<>
            <img src={colorData.image.bare} alt={colorData.name.value}/>

            <List>
                <li>Name: {colorData.name.value}</li>
                <li>RGB: {colorData.rgb.value.replace("rgb", "")}</li>
                <li>HSL: {colorData.hsl.value.replace("hsl", "")}</li>
                <li>HSV: {colorData.hsv.value.replace("hsv", "")}</li>
                <li>CMYK: {colorData.cmyk.value.replace("cmyk", "")}</li>
                <li>XYZ: {colorData.XYZ.value.replace("XYZ", "")}</li>
            </List>
        </>);
    }

    /** Display details on collections of current user, if current user exists. */
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
                        <div>
                            {coll.title}
                            <Button
                                color="info"
                                size="sm"
                                onClick={() => {addColorToCollection(coll.id)}}>
                                    Add to this collection
                            </Button>
                        </div>
                    </li>
                })}
            </List>
        </>);
    }

    // RENDER -------------------------------------------------------------------------------------

    if (fetchErrors) return <div>
        ERROR in calling API(s): {fetchErrors[0]}. Please try again later.
    </div>

    if (!isDataFetched) return <div>FETCHING DATA...</div>

    return (
        <div className="ColorDetails">

            <h1>Hex: {hex}</h1>

            {displayColorInfo()}
            {currentUser ? displayCollectionInfo() : <></>}

            <div>
                <Button color="secondary" onClick={backToSearch}>Return to color search</Button>
            </div>

        </div>
    );
}


export default ColorDetails;
