/* Empty actions file */
export const SET_CLIENTS = 'SET_CLIENTS'
export const SET_FORM_CLIENT = 'SET_FORM_CLIENT'
export const SET_FORM_SRVCDATE = 'SET_FORM_SRVCDATE'
export const SET_FORM_INVCDATE = 'SET_FORM_INVCDATE'
export const SET_FORM_INVCDUE = 'SET_FORM_INVCDUE'
export const RESET_FORM = 'RESET_FORM'
export const SET_WORK_TYPES = 'SET_WORK_TYPES'
export const SET_INVOICE_WORK_TYPE = 'SET_INVOICE_WORK_TYPE'
export const SET_INVOICE_WORK_QTY = 'SET_INVOICE_WORK_QTY'
export const SET_INVOICE_WORK_AMT = 'SET_INVOICE_WORK_AMT'
export const ADD_INVOICE_ITEM = 'ADD_INVOICE_ITEM'
export const SET_INVOICE_DTL = 'SET_INVOICE_DTL'
export const LOAD_INVOICES = 'LOAD_INVOICES'
export const UPDATE_INVOICE_LIST = 'UPDATE_INVOICE_LIST'
export const SET_SELECTED_INVOICE = 'SET_ELECTED_INVOICE'
export const SEND_INVOICE = 'SEND_INVOICE'
export const OPEN_INVOICE = 'OPEN_INVOICE'
export const CLOSE_INVOICE = 'CLOSE_INVOICE'

export function setClients(clients){
  return({
    type: SET_CLIENTS,
    payload: clients
  })
}

export function setFormClient(client){
  return({
    type: SET_FORM_CLIENT,
    payload: client
  })
}

export function setFormServiceDate(date){
  return({
    type: SET_FORM_SRVCDATE,
    payload: date
  })
}

export function setFormInvoiceDate(date){
  return({
    type: SET_FORM_INVCDATE,
    payload: date
  })
}

export function setFormInvoiceDue(date){
  return({
    type: SET_FORM_INVCDUE,
    payload: date
  })
}

export function resetForm(){
  return({
    type: RESET_FORM
  })
}

export function setWorkTypes(types){
  return({
    type: SET_WORK_TYPES,
    payload: types
  })
}

export function setInvoiceWorkType(type){
  return({
    type: SET_INVOICE_WORK_TYPE,
    payload: type
  })
}

export function setInvoiceWorkQty(qty){
  return({
    type: SET_INVOICE_WORK_QTY,
    payload: qty
  })
}

export function setInvoiceWorkAmt(amt){
  return({
    type: SET_INVOICE_WORK_AMT,
    payload: amt
  })
}

export function addInvoiceItem(item){
  return({
    type: ADD_INVOICE_ITEM,
    payload: item
  })
}

export function setFormInvoiceDtl(dtl){
  return({
    type: SET_INVOICE_DTL,
    payload: dtl
  })
}

export function loadInvoices(invcs){
  return({
    type: LOAD_INVOICES,
    payload: invcs
  })
}

export function updateInvoiceList(inv){
  return({
    type: UPDATE_INVOICE_LIST,
    payload: inv
  })
}

export function setSelectedInvoice(inv){
  return({
    type: SET_SELECTED_INVOICE,
    payload: inv
  })
}

export function sendInvoice(id){
  return({
    type: SEND_INVOICE,
    payload: id
  })
}

export function openInvoice(id){
  return({
    type: OPEN_INVOICE,
    payload: id
  })
}

export function closeInvoice(id){
  return({
    type: CLOSE_INVOICE,
    payload: id
  })
}
