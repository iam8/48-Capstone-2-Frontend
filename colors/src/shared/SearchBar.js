import React, {useState} from "react";
import {Button, Form, Label, Input, Row, Col} from "reactstrap";


/**
 * Search bar. Used on /colors and /schemes pages to retrieve color and scheme data.
 *
 * Calls the searchFor method (passed by parent), which performs the data retrieval.
 */
function SearchBar({searchFor}) {
    const [searchValue, setSearchValue] = useState("");

    /** Update search bar field. */
    const handleChange = (evt) => {
        setSearchValue(evt.target.value);
    }

    /** Call searchFor() to redirect and retrieve color data. */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchFor(searchValue || undefined);
        setSearchValue("");
    }

    return (
        <div className="SearchBar">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Label
                            className="visually-hidden"
                            htmlFor="search-input"
                        >
                            Search
                        </Label>

                        <Input
                            id="search-input"
                            name="searchValue"
                            type="search"
                            minLength={6}
                            maxLength={6}
                            placeholder="Enter a 6-digit hex value"
                            value={searchValue}
                            onChange={handleChange}
                            bsSize="lg"
                        />
                    </Col>
                    <Col>
                        <Button type="submit" color="primary" size="lg">Retrieve data</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}


export default SearchBar;
