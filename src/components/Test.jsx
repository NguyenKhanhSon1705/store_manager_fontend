import { memo } from "react";

function Test() {
    console.log("Test: Rerender");
    
    return ( 
        <div></div>
     );
}

export default memo (Test);