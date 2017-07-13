import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../store/actions'
import axios from 'axios'

class InvoiceStep2 extends React.Component{
  constructor(props){
    super(props)
  }

  /*
  *  Save the new invoice to the DB.  Should do more validation here, but
  *  in the interest of time, all fields are required.
  *  If you skip a field, you get an alert, and you get sent back to step 1
  */
  saveInvoice = () => {
    var valid = false
    var formDetails = this.props.invoice
    if (formDetails.selectedClient.name != '' &&
        formDetails.formServiceDate != '' &&
        formDetails.formInvoiceDate != '' &&
        formDetails.formInvoiceDue != '' &&
        formDetails.formInvoiceItems.length > 0){

      var invoice = {
        client: { name: formDetails.selectedClient.name,
                  acctNumber: formDetails.selectedClient.acctNumber},
        serviceDate: formDetails.formServiceDate,
        invoiceDate: formDetails.formInvoiceDate,
        dueDate: formDetails.formInvoiceDue,
        workItems: formDetails.formInvoiceItems,
        details: formDetails.formInvoiceDetails,
        status: 'New'
      }

      axios.post('/saveinvoice', invoice)
        .then( result => {
          console.log('save result', result.data)
          this.props.actions.updateInvoiceList(result.data)
          this.props.actions.resetForm()

        })
    } else {
      alert('All fields required')
      $('#invoice-step-1').foundation('open')
    }

  }

  /* Connect form to redux store */
  handleAddItem = () => {
    var item = {
      "description": this.props.invoice.formInvoiceWorkType || 'Other',
      "quantity": this.props.invoice.formInvoiceQty || '1',
      "amount": (+this.props.invoice.formInvoiceAmt || 0 ) * (+this.props.invoice.formInvoiceQty || 1)
    }
    this.props.actions.addInvoiceItem(item)
    this.props.actions.setInvoiceWorkType('')
    this.props.actions.setInvoiceWorkQty('')
    this.props.actions.setInvoiceWorkAmt('')
  }

  render(){
    return(
      <div className="reveal" id="invoice-step-3" data-reveal="">
        <div className="row ">
          <div className="column small-12 text-center no-pad">
            <h4 className='form-title'>Step 3 - Final Details</h4>
          </div>

          <div className="row">
            <div className="column small-12">
              <label>Special Instructions
                <textarea placeholder="Add special instructions - payment info, mailing address, etc." value={this.props.invoice.formInvoiceDetails} onChange={(event)=>{this.props.actions.setFormInvoiceDtl(event.target.value)}}>
                </textarea>
              </label>
            </div>
          </div>
        </div>

          <div className="row">
            <div className="column small-12 text-mono">
              <div>Client Name....: {this.props.invoice.selectedClient.name}</div>
              <div>Acct #.........: {this.props.invoice.selectedClient.acctNumber}</div>
              <div>Service Date...: {this.props.invoice.formServiceDate}</div>
              <div>Invoice Date...: {this.props.invoice.formInvoiceDate}</div>
              <div>Invoice Due....: {this.props.invoice.formInvoiceDue}</div>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="column small-4 text-mono">
              <div>Item:</div>
              <div>-----</div>
              {this.props.invoice.formInvoiceItems.map( (item,index )=> {
                return( <div key={index+item.description+item.quantity+item.amount}>{item.description}</div>)
              })}
            </div>
            <div className="column small-4 text-mono">
              <div>Quantity:</div>
              <div>---------</div>
              {this.props.invoice.formInvoiceItems.map( (item,index) => {
                return( <div key={index+item.description+item.quantity+item.amount}>{item.quantity}</div>)
              })}
            </div>
            <div className="column small-4 text-mono">
              <div>Amount:</div>
              <div>-------</div>
              {this.props.invoice.formInvoiceItems.map( (item,index) => {
                return( <div key={index+item.description+item.quantity+item.amount}>{item.amount}</div>)
              })}
            </div>
            <div className="column small-12 text-mono">
              <div>------</div>
              <div>Total:{this.props.invoice.formInvoiceItems.reduce( ( acc, cur ) =>
                  { return acc + cur.amount},0)}</div>
            </div>
          </div>

        <div className="row">
          <div className="column small-6 text-center">
            <button className="button primary" data-close="" onClick={this.saveInvoice}>Save</button>
          </div>
          <div className="column small-6 text-center">
            <button className="button secondary" data-close="" onClick={()=>this.props.actions.resetForm()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceStep2)
