import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Portfolio from './Portfolio/Portfolio';
import Market from './Market/Market';

const App = () => (
  <Router>
    <Container maxWidth='lg'>
      <nav>
        <ul>
          <li>
            <Link to='/'>Buy/Get Quote</Link>
          </li>
          <li>
            <Link to='/portfolio'>Portfolio</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path='/' exact>
          <Market />
        </Route>
        <Route path='/portfolio' exact>
          <Portfolio />
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default App;
