import React, {useState} from "react";
import {Button, Form, Label, Input, Row, Col} from "reactstrap";


/**
 * Search bar. Used exclusively to submit 6-digit hex values.
 *
 * Calls the onSubmit method (passed by parent), which performs some action using the hex value
 * submitted in the search bar.
 */
function SearchBar({onSubmit}) {
    const [searchValue, setSearchValue] = useState("");

    /** Update search bar field. */
    const handleChange = (evt) => {
        setSearchValue(evt.target.value);
    }

    /** Call onSubmit() to perform some action using the submitted hex value. */
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(searchValue);
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
                        <Button type="submit" color="primary" size="lg">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}


export default SearchBar;
