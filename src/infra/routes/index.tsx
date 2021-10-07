import * as React from "react";
import {Route, Switch} from "react-router";
import Home from "../../features/Home";
import NoMatch from "../../common/components/404/404";

const routes = (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NoMatch} />
    </Switch>
);

export default routes;
