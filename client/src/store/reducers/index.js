import {combineReducers} from 'redux'
import invoice from '../reducers/invoice'


const rootReducer = combineReducers({
  invoice: invoice,
})

export default rootReducer
