import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import  Posts  from './Posts';

/**
**Category component renders the category detail and the all the posts (through the Posts component) associated with the category.
**  Props
**      category - the name of the category for which the detail is rendered.
**/
function Category(props) {
    console.log('Category params: ', props);
    const categoryId = props.category;

    //get the category detail
    const category = props.categories.find(category => category.name === categoryId);

    //if there is not category found, don't render the main page. render a temp <div>.
    //This is useful when the user refreshes the category page.
    if (!category) {
        return (<div>Loading......</div>);
    }

    const src = `${category.image}/800x450`;
    return (
        <div>
            <div className = "row">
                <div className="col">
                </div>
                <div className="col">
                    <div
                        className="card"
                    >
                        <img className="card-img-top mt-4" src={src} alt={category.name}/>
                        <div className="card-body">
                            <div className="card-title">
                                {category.name}
                            </div>
                            <div className="card-text">
                                {category.path}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
            <Posts category={category.name}></Posts>
        </div>
    )
}
function mapStateToProps({ categories }) {
    return {
        categories
    }
}
export default withRouter(connect(mapStateToProps)(Category));