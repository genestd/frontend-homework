import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'
import {Link} from 'react-router-dom'

class ListContainer extends React.Component{
  constructor(props){
    super(props)
  }

  /* When the component mounts, we grab the list of invoices from the API */
  /* New invoices are added directly to the redux store (and the DB) and appear in the list */
  componentWillMount = () => {
    axios.get('/getinvoices')
      .then( result =>{
        this.props.actions.loadInvoices(result.data)
      })
  }

  render(){
    return(
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Invoice Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { this.props.invoice.invoices.map( item=> {
            return( <tr key={item._id}>
            <td><Link to={"/invoice/"+item._id} data={item}>{item.client.name}</Link></td>
            <td>{item.dueDate}</td>
            <td>{item.workItems.reduce( ( acc, cur ) =>
                { return acc + cur.amount},0)}</td>
            <td>{item.status}</td>
            </tr>)
          })}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return({
    invoice: state.invoice
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    actions: bindActionCreators(Actions, dispatch)
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
