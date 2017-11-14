import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

/**
**NoteFound component renders a not available message and a link to the home page.
**  This component is displayed when the user uses a deleted post's path.
**/
function NoteFound(props) {

    return (
        <div className="container-fluid">
            <h2 className="display-3">The requested page is not available.</h2>
            <br/>
            <blockquote className="blockquote text-right">
                <p>
                    <Link to="/">Go to the home page</Link>
                </p>
            </blockquote>
        </div>
    )
}
export default withRouter(connect()(NoteFound));