import {GlobalStyles} from "./styles/GlobalStyles";

import * as React from "react";
import {History} from "history";
import {ConnectedRouter} from "connected-react-router";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import routes from "./infra/routes";

library.add(faTrashAlt, faPencilAlt)
interface AppProps {
    history: History;
}

const App = ({ history }: AppProps) => (
    <>
        <GlobalStyles />
        <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </>
);

export default App;