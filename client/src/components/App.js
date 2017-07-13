import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Invoice from '../components/Invoice'
import Header from '../components/Header'
import FormContainer from '../components/FormContainer'
import ListContainer from '../components/ListContainer'

const App = (props) => {
  return (
      <Router>
        <div>
          <Header title="Invoice Generator"/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/invoice/:id" component={Invoice}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </div>
    </Router>
  )
}

const Home = (props) => {
  return(
    <div>
      <FormContainer />
      <ListContainer />
    </div>
  )
}

const NotFound = () => {
  return (<h1>Not Found</h1>)
}

export default App
