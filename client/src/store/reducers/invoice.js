import {SET_CLIENTS, SET_FORM_CLIENT, SET_FORM_SRVCDATE, SET_FORM_INVCDATE, SET_FORM_INVCDUE,
        RESET_FORM, SET_WORK_TYPES, SET_INVOICE_WORK_QTY, SET_INVOICE_WORK_AMT, SET_INVOICE_WORK_TYPE,
        ADD_INVOICE_ITEM, SET_INVOICE_DTL, LOAD_INVOICES, UPDATE_INVOICE_LIST, SET_SELECTED_INVOICE,
        SEND_INVOICE, OPEN_INVOICE, CLOSE_INVOICE} from '../actions'
import update from 'immutability-helper'

const INITIAL_STATE = {
  invoices: [],
  clients: [],
  selectedClient: {name: '',
                   acctNumber: ''},
  formServiceDate: '',
  formInvoiceDate: '',
  formInvoiceDue: '',
  formInvoiceItems: [],
  workTypes: [],
  formInvoiceWorkType: '',
  formInvoiceQty: '',
  formInvoiceAmt: '',
  formInvoiceDetails: '',
  selectedInvoice: {name: ''}
}

function invoice(state=INITIAL_STATE, action){

  switch(action.type){
    case SET_CLIENTS:
      return Object.assign({}, state, {clients: action.payload})
      break

    case SET_FORM_CLIENT:
      var formClient = {name:'', acctNumber:''}
      for(var i=0;i<state.clients.length;i++){
        if(state.clients[i].name === action.payload){
          formClient = state.clients[i]
        }
      }
      return Object.assign({}, state, {selectedClient: formClient})
      break

    case SET_FORM_SRVCDATE:
      return Object.assign({}, state, {formServiceDate: action.payload})
      break

    case SET_FORM_INVCDATE:
      return Object.assign({}, state, {formInvoiceDate: action.payload})
      break

    case SET_FORM_INVCDUE:
      return Object.assign({}, state, {formInvoiceDue: action.payload})
      break

   case SET_WORK_TYPES:
     return Object.assign({}, state, {workTypes: action.payload})
     break

    case SET_INVOICE_WORK_TYPE:
      return Object.assign({}, state, {formInvoiceWorkType: action.payload})
      break

    case SET_INVOICE_WORK_QTY:
      return Object.assign({}, state, {formInvoiceQty: action.payload})
      break

    case SET_INVOICE_WORK_AMT:
      return Object.assign({}, state, {formInvoiceAmt: action.payload})
      break

    case RESET_FORM:
      return Object.assign({}, state, {
        selectedClient: {name: '',
                         acctNumber: ''},
        formServiceDate: '',
        formInvoiceDate: '',
        formInvoiceDue: '',
        formInvoiceItems: [],
        formInvoiceWorkType: '',
        formInvoiceQty: '',
        formInvoiceAmt: '',
        formInvoiceDetails: ''
      })
      break

    case ADD_INVOICE_ITEM:
      return update(state, {formInvoiceItems: {$push: [action.payload]}})
      break

    case SET_INVOICE_DTL:
      return Object.assign({}, state, {formInvoiceDetails: action.payload})
      break

    case LOAD_INVOICES:
      return Object.assign({}, state, {invoices: action.payload})
      break

    case UPDATE_INVOICE_LIST:
      return update(state, {invoices: {$push: [action.payload]}})
      break

    case SET_SELECTED_INVOICE:
      return Object.assign({}, state, {selectedInvoice: action.payload})
      break

    /**
    *  TODO: connect these actions to the server.  Currently just changes the status in
    *   the individual invoice view...
    **/
    case SEND_INVOICE:
      console.log('Sending Invoice')
      return update(state, {selectedInvoice: {status: {$set: 'SENT'}}})
      break

    case OPEN_INVOICE:
      console.log('Opening Invoice')
      return update(state, {selectedInvoice: {status: {$set: 'NEW'}}})
      break

    case CLOSE_INVOICE:
      console.log('Closing Invoice')
      return update(state, {selectedInvoice: {status: {$set: 'PAID'}}})
      break

    default:
      return state
  }
}
export default invoice;
