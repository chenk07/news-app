import React, { Component } from "react";
import debounce from "debounce-promise";
import AsyncSelect from "react-select/lib/Async";
import { withRouter } from 'react-router-dom';
import { AUTO_SUGGESTION_API_ROOT, AUTO_SUGGESTION_API_KEY } from "../Constants";

class AutoSuggest extends Component {

    handleSearchChange = async (inputValue) => {
        try {
            const response = await fetch(
                `${AUTO_SUGGESTION_API_ROOT}${inputValue}`,
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": `${AUTO_SUGGESTION_API_KEY}`
                    }
                }
            );
            const data = await response.json();
            const resultsRaw = data.suggestionGroups[0].searchSuggestions;
            return resultsRaw.map(result => ({
                value: result.displayText,
                label: result.displayText,
                url: result.url }));
        } catch (error) {
            console.error(`Error fetching search ${inputValue}`);
        }
    };

    handleChange = (val) => {
        console.log(val);
        this.props.history.push({
            pathname: '/search',
            search: '?q=' + val.value
        });
    };

    render() {
        return (
            <div className="AutoSuggest">
               <AsyncSelect
                   cacheOptions
                   loadOptions={debounce(this.handleSearchChange, 1000)}
                   defaultOptions
                   placeholder="Enter keyword .."
                   onChange={this.handleChange}
               />
            </div>
        );
    }
}

export default withRouter(AutoSuggest);
