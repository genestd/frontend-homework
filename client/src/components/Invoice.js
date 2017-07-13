import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Invoice extends React.Component{

  constructor(props){
    super(props)
  }

  /*
  * Here we fetch the details for our invoice from the API and load it into our redux store
  */
  componentWillMount(){
    axios.post('/getinvoice', {id: this.props.match.params.id})
      .then( result=>{
        this.props.actions.setSelectedInvoice(result.data)
      })
  }

  /*
  *  Lots of JSX here, but it is just building out the attributes of the invoice.
  */
  render(){
    if(!this.props.invoice.selectedInvoice.client){
      return( <h3 className='text-center'>Invoice Details</h3>)
    } else {
      return(
        <div>
        <h3 className='text-center'>Invoice Details</h3>
          <div className='text-mono small-pad'>
            Client Name..............: {this.props.invoice.selectedInvoice.client.name}
          </div>
          <div className='text-mono small-pad'>
            Account Number...........: {this.props.invoice.selectedInvoice.client.acctNumber}
          </div>
          <div className='text-mono small-pad'>
            Service Date.............: {this.props.invoice.selectedInvoice.serviceDate}
          </div>
          <div className='text-mono small-pad'>
            Invoice Date.............: {this.props.invoice.selectedInvoice.invoiceDate}
          </div>
          <div className='text-mono small-pad'>
            Invoice Due Date.........: {this.props.invoice.selectedInvoice.dueDate}
          </div>
          <div className='text-mono small-pad'>
            Details/Notes............: {this.props.invoice.selectedInvoice.details}
          </div>
          <div className='text-mono small-pad'>
            Status...................: {this.props.invoice.selectedInvoice.status}
          </div>
          <hr/>
          <h5 className='text-mono text-center'>Itemized Details</h5>
          <div className="row">
            <div className="column small-4">
              <div className='text-mono'>Description</div>
              <div className='text-mono'>-----------</div>
            </div>
            <div className="column small-4">
              <div className='text-mono'>Quantity</div>
              <div className='text-mono'>--------</div>
            </div>
            <div className="column small-4">
              <div className='text-mono'>Amount</div>
              <div className='text-mono'>------</div>
            </div>
          </div>
          {this.props.invoice.selectedInvoice.workItems.map( (item,index)=> {
            return(
              <div className="row" key={index}>
                <div className="column small-4 text-mono">
                  {item.description}
                </div>
                <div className="column small-4 text-mono">
                  {item.quantity}
                </div>
                <div className="column small-4 text-mono">
                  {item.amount}
                </div>
              </div>)
          })}

          <div className="row">
            <div className='column small-4 text-mono'>
              <div>-----------</div>
              <div>Total.....: {this.props.invoice.selectedInvoice.workItems.reduce( ( acc, cur ) =>
                  { return acc + cur.amount},0)}</div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="column small-6">
              <Link to='/'><button className="button primary">Back</button></Link>
            </div>
            <div className="column small-6">
              <ActionButton type={this.props.invoice.selectedInvoice.status} actions={this.props.actions} invoice={this.props.invoice.selectedInvoice._id}/>
            </div>
          </div>
        </div>
      )
    }
  }

}

/*
* Simple little component to dynamically render an action button for the different lifecycle stages of the invoice
* When status is NEW, you can SEND the invoice
* When status is SEND, you can CLOSE the invoice (i.e. make it PAID)
* When status is PAID, you can reopen the invoice
*/
const ActionButton = (props) => {
  let name, action
  switch(props.type){
    case 'NEW':
      name='Send Invoice'
      action=props.actions.sendInvoice
      break

    case 'SENT':
      name='Close Invoice'
      action=props.actions.closeInvoice
      break

    case 'PAID':
      name='Reopen Invoice'
      action=props.actions.openInvoice
      break

    default:
      name='Send Invoice'
      action=props.actions.sendInvoice

  }
  return( <button className="button primary" onClick={(event)=>action(props.invoice)}>{name}</button>)
}

const mapStateToProps = state => {
  return({
    invoice: state.invoice
  })
}

const mapDispatchToProps = dispatch => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
