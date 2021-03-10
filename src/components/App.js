import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Container, AppBar, Button, Typography } from '@material-ui/core';
import Portfolio from './Portfolio/Portfolio';
import SearchContainer from './Market/SearchContainer';
import styles from './App.module.scss';

const App = () => (
  <Router>
    <AppBar className={styles.topBar} position='static'>
      <div className={styles.buttonWrapper}>
        <Typography variant='h6' component='h1'>
          <Link to='/'>The Stock App</Link>
        </Typography>
        <Button variant='contained' color='primary'>
          <Link to='/'>Buy/Get Quote</Link>
        </Button>
        <Button variant='contained' color='primary'>
          <Link to='/portfolio'>Portfolio</Link>
        </Button>
      </div>
    </AppBar>
    <Container maxWidth='lg'>
      <Switch>
        <Route path='/' exact>
          <SearchContainer />
        </Route>
        <Route path='/portfolio' exact>
          <Portfolio />
        </Route>
      </Switch>
    </Container>
  </Router>
);

export default App;
