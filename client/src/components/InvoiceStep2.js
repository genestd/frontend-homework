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
  *  Here we grab the necessary work types from the API to populate the itemization dropdown
  */
  componentWillMount = () =>{
    axios.get('/worktypes')
      .then( result => {
        this.props.actions.setWorkTypes(result.data)
      })
  }

  /*
  *  Basic handler for adding an itemized line-item.  Doesn't do much validation but ensures there are some default values
  */
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
      <div className="reveal" id="invoice-step-2" data-reveal="">
        <div className="row ">
          <div className="column small-12 text-center no-pad">
            <h4 className='form-title'>Step 2 - Itemized Invoice</h4>
          </div>

          <div className="row">
            <div className="column small-3">
              <label>Type
                <select value={this.props.invoice.formInvoiceWorkType} onChange={(event)=>{this.props.actions.setInvoiceWorkType(event.target.value)}}>
                  <option key="default" value="" id="-1"></option>
                  {this.props.invoice.workTypes.map( (item, index) => {
                    return( <option key={item._id} value={item.description} id={index}>{item.description}</option> )
                  })}
                </select>
              </label>
            </div>
            <div className="column small-3">
              <label>Quantity
                <input type="number" placeholder="Units" min="0" value={this.props.invoice.formInvoiceQty} onChange={(event)=>{this.props.actions.setInvoiceWorkQty(event.target.value)}}/>
              </label>
            </div>
            <div className="column small-4">
              <label>$ Per Unit
                <input type="number" placeholder="Per Unit" min="0" step=".01" value={this.props.invoice.formInvoiceAmt} onChange={(event)=>{this.props.actions.setInvoiceWorkAmt(event.target.value)}}/>
              </label>
            </div>
            <div className="column small-2">
              <label>Add
                <div><button className="button primary" onClick={this.handleAddItem}>+</button></div>
              </label>
            </div>
          </div>
          <hr/>
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
            <button className="button primary" data-open="invoice-step-3">Next</button>
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
