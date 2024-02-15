import React, {useState} from "react";
import { useHistory } from "react-router-dom";

import useQuery from "../hooks/useQuery";
import SearchBar from "../shared/SearchBar";

/**
 * Component to render when route /colors is reached. Displays colors search bar if no query
 * string exists in current URL, and displays color details if query string exists.
 */
function Colors() {
    const history = useHistory();
    const query = useQuery();

    const redirectToColorDetails = (hex) => {
        history.push(`/colors/?hex=${hex}`);
    }

    return (
        <div className="Colors">
            <h1>Search for a color!</h1>

            {query.size ?
                <>A query string is present: {query.toString()}</>
                :
                <SearchBar onSubmit={redirectToColorDetails} />
            }
        </div>
    );
}


export default Colors;
