import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class InvoiceStep1 extends React.Component{
  constructor(props){
    super(props)
  }

  /*
  *  When this component is mounted, it will fetch the existing clients from the API
  *  The app doesn't allow you to add new clients at this time
  */
  componentWillMount = () =>{
    axios.get('/clients')
      .then( result => {
        this.props.actions.setClients(result.data)
      })
  }

  /* Handler for the connected form to connect it to redux store*/
  handleOption = (event) => {
    this.props.actions.setFormClient(event.target.value)
  }

  render(){
    return(
      <div className="reveal" id="invoice-step-1" data-reveal="">
        <div className="row ">
          <div className="column small-12 text-center no-pad">
            <h4 className='form-title'>Step 1 - Account Details</h4>
          </div>
          <div className="column small-centered small-8 medium-6">
            <label>Client Name
              <select value={this.props.invoice.selectedClient.name} onChange={(event)=>{this.handleOption(event)}}>
                <option key="default" value="" id="-1"></option>
                {this.props.invoice.clients.map( (item, index) => {
                  return( <option key={item.acctNumber} value={item.name} id={index}>{item.name}</option> )
                })}
              </select>
            </label>
          </div>
          <div className="column small-centered small-8 medium-6">
            <label>Acct Number
              <input type="text" placeholder="Acct #" value={this.props.invoice.selectedClient.acctNumber} disabled/>
            </label>
          </div>
          <div className="column small-centered small-8 medium-6">
            <label>Service Date
              <input type="date" placeholder="Service Date" value={this.props.invoice.formServiceDate} onChange={(event)=>{this.props.actions.setFormServiceDate(event.target.value)}}/>
            </label>
          </div>
          <div className="column small-centered small-8 medium-6">
            <label>Invoice Created Date
              <input type="date" placeholder="Invoice Date" value={this.props.invoice.formInvoiceDate} onChange={(event)=>{this.props.actions.setFormInvoiceDate(event.target.value)}}/>
            </label>
          </div>
          <div className="column small-centered small-8 medium-6">
            <label>Invoice Due Date
              <input type="date" placeholder="Due Date" value={this.props.invoice.formInvoiceDue} onChange={event=>{this.props.actions.setFormInvoiceDue(event.target.value)}}/>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column small-6 text-center">
            <button className="button primary" data-open="invoice-step-2">Next</button>
          </div>
          <div className="column small-6 text-center">
            <button className="button secondary" data-close="" onClick={()=>this.props.actions.resetForm()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    invoice: state.invoice
  })
}

const mapDispatchToProps = (dispatch) => {
  return({
    actions: bindActionCreators(Actions, dispatch)
  })
}
export default connect(mapStateToProps,mapDispatchToProps)(InvoiceStep1)
