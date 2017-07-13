/*
* The forms were getting large, so I split them into multiple components/steps
*/
import React from 'react'
import InvoiceStep1 from '../components/InvoiceStep1'
import InvoiceStep2 from '../components/InvoiceStep2'
import InvoiceStep3 from '../components/InvoiceStep3'

class FormContainer extends React.Component{
  constructor(props){
    super(props)
  }

/* This call is needed to initialize the foundation components (Reveal) */
  componentDidMount = () => {
    $(document).foundation()
  }

  render(){
    return(
      <div className="form-container">
        <div className="grid-x">
          <div className="cell small-centered small-8 medium-6 text-center">
            <button className="button primary button-center" data-open="invoice-step-1">Start an Invoice</button>
          </div>
        </div>
        <InvoiceStep1 />
        <InvoiceStep2 />
        <InvoiceStep3 />
      </div>
    )
  }
}

export default FormContainer
