import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { RootContainer } from '../containers'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={RootContainer} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes