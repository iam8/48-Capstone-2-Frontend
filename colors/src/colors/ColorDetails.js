import React, {useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import { Button, List, ListInlineItem, Spinner } from "reactstrap";
import axios from "axios";

import UserContext from "../auth/UserContext";
import CollectionsContext from "../collections/CollectionsContext";


/**
 * Display details about a specific color, designated by its 6-digit hex value.
 *
 * Fetches and displays details about the given color.
 *
 * (TEMP) Displays collection data for current user and allows user to add current color to any
 *      collection.
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
    const {collections, addColor} = useContext(CollectionsContext);
    const [colorData, setColorData] = useState(null);
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [fetchErrors, setFetchErrors] = useState(null);

    console.log("RENDERING ColorDetails...");

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
                                onClick={() => {addColor(hex, coll.id)}}>
                                    Add to this collection
                            </Button>

                            <div>
                                <List type="inline">
                                    {"Colors: "}
                                    {coll.colors.map((hex) => {
                                        return <ListInlineItem key={hex}>
                                            {`| ${hex.toUpperCase()} |`}
                                        </ListInlineItem>
                                    })}
                                </List>
                            </div>
                        </div>
                    </li>
                })}
            </List>
        </>);
    }

    // RENDER -------------------------------------------------------------------------------------

    if (fetchErrors) return <div>
        ERROR in calling API(s): {fetchErrors.message ? fetchErrors.message : fetchErrors}.
    </div>

    if (!isDataFetched) {
        return <Spinner color="primary" className="m-5">
                    FETCHING COLOR DATA...
                </Spinner>
    }

    return (
        <div className="ColorDetails">

            <h1>Hex: {hex.toUpperCase()}</h1>

            {displayColorInfo()}

            <div>
                <Button color="secondary" onClick={backToSearch}>Return to color search</Button>
            </div>

            {currentUser ? displayCollectionInfo() : <></>}
        </div>
    );
}


export default ColorDetails;
