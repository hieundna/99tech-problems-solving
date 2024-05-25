import Modal from "react-modal";
import { IModal } from "../types/types";
import CloseBtn from "./CloseBtn";
const FormModal = (props: IModal) => {
  const { modalIsOpen, onClose, customStyles, children } = props;
  return (
    <Modal
      className="form-modal"
      overlayClassName="form-overlay"
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <button className="close-modal" onClick={onClose}>
        <CloseBtn />
      </button>
      <div>{children}</div>
    </Modal>
  );
};

export default FormModal;
