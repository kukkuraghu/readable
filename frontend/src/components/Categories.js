import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  Posts  from './Posts';

/**
**Categories component renders all the categories and the all the posts (through the Posts component) associated with the categories.
**  The default sort order for the posts is the voteScore (Descending)
**/
function Categories(props) {
    console.log('Categories render props: ', props);
    const { categories } = props;
    return (
        <div>
            <div className="header">
                <h2>Categories</h2>
            </div>
            <div className="card-deck">
                {
                    categories.map(category => {
                        const src = `${category.image}/800x450`;
                        return (
                            <div
                                key={category.name}
                                className="card cursorPointer"
                                onClick={ () => props.history.push(`/category/${category.name}`)}
                            >
                                <img className="card-img-top" src={src} alt={category.name}/>
                                <div className="card-body">
                                    <div className="card-title">
                                        {category.name}
                                    </div>
                                    <div className="card-text">
                                        {category.path}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Posts/>
        </div>
    );
}

function mapStateToProps({ categories }) {
    console.log('Categories mapStateToProps categories: ', categories);
    return {
        categories
    }
}
export default withRouter(connect(mapStateToProps)(Categories));
