import React from "react";
import {Navigate, useLocation} from "react-router-dom";

export const RemoveTrailingSlash = ({...rest}) => {
    const location = useLocation();
    console.log(location.pathname.match('/.*/$'))

    // If the last character of the url is '/'
    if (location.pathname.match('/.*/$')) {
        return <Navigate replace {...rest} to={{
            pathname: location.pathname.replace(/\/+$/, ""),
            search: location.search
        }}/>
    } else return null
}