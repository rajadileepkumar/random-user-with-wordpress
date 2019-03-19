import React from "react";
import Profile from "./component/admin/Profile";


const HelperProfile = ({ match }) => (
    <div>
        <Profile id={match.params.id}/>
    </div>
);
export default HelperProfile