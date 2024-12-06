import './globalStyles.css'
import propTypes from 'prop-types'

function GlobalStyles({ children }){
    return children
}

GlobalStyles.propsType = {
    children: propTypes.node.isRequired
}

export default GlobalStyles 