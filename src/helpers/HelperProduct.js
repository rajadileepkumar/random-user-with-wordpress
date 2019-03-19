import React from "react";
import Products from "./../component/Products";


const HelperProfile = ({ match }) => (
    <div>
        <Products id={match.params.id}/>
    </div>
);
export default HelperProfile