import React from 'react'
import { connect } from 'react-redux'
import { hideModalAction } from '../../store/actions/modalAction'

const Modal = ({ text, btnConfirm, hideModalAction }) => {
    
    return (
        <div className="info-modal">
            <div className="info-modal-fade" onClick={() => hideModalAction()}></div>
            <div className="info-modal-body">
                <div className="info-modal-text">{text}</div>
                {btnConfirm && 
                    <div className="info-modal-btns d-flex justify-content-center align-items-center">
                        <span className="link" onClick={() => hideModalAction()}>Cancel</span>
                        <button className="btn action_btn small" onClick={btnConfirm.onClick}>{btnConfirm.text}</button>
                    </div>
                 }    
            </div>  
        </div>
    )
}


const mapStateToProps = function ({ modal }) {
  return {
    text: modal.data.text,
    btnConfirm: modal.data.btnConfirm
  }
}


export default connect(mapStateToProps, { hideModalAction })(Modal)
