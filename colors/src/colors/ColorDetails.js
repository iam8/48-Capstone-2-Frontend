import React, {useState, useEffect} from "react";


/**
 * Display details about a specific color, designated by its 6-digit hex value.
 *
 * Calls external API at thecolorapi.com to get detailed info about a color
 */
function ColorDetails({hex}) {
    return (
        <div className="ColorDetails">
            This is in the ColorDetails component.
            The current color is: {hex}
        </div>
    );
}


export default ColorDetails;
