import React, {Fragment} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Todolist } from './components/list';
import 'bootstrap/dist/css/bootstrap.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Fragment>
<Todolist/>
</Fragment>
);


