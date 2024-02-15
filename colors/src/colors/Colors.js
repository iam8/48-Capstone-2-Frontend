import React from "react";
import { useHistory } from "react-router-dom";

import useQuery from "../hooks/useQuery";
import SearchBar from "../shared/SearchBar";
import ColorDetails from "./ColorDetails";

/**
 * Component to render when route /colors is reached.
 *
 * If no query string exists in the current URL, display colors search bar.
 *
 * If a query string exists and it contains the 'hex' key, display the details for that color.
 */
function Colors() {
    const history = useHistory();
    const query = useQuery();

    const redirectToColorDetails = (hex) => {
        history.push(`/colors/?hex=${hex}`);
    }

    const getHexFromQuery = () => {
        return query.get("hex");
    }

    return (
        <div className="Colors">
            <h1>Search for a color!</h1>

            {query.size && query.has("hex") ?
                <ColorDetails hex={getHexFromQuery()}/>
            :
                <SearchBar onSubmit={redirectToColorDetails} />
            }
        </div>
    );
}


export default Colors;
