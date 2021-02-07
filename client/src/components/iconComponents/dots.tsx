import React from "react";

function MoreIcon(props: React.SVGProps<SVGSVGElement>){

    return (
        <svg aria-label="More options" fill="white"  height="16" viewBox="0 0 48 48" width="16" {...props}><circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle><circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle></svg>
    );
}

export default MoreIcon;