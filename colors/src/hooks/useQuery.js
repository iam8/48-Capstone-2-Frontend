import { useMemo } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom hook designed to parse a query string returned by useLocation.
 *
 * Returns a URLSearchParams object corresponding to the current location. This value is cached
 * between renders if the location does not change.
 *
 * Written using guidance from this docs page:
 * https://v5.reactrouter.com/web/example/query-parameters
 */
function useQuery() {
    const {search} = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}


export default useQuery;
