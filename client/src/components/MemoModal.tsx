import "../scss/modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface UserRowProps {
  closeModal: Function;
  userId: number;
  accessToken: string;
  getAllUsers: Function;
}

export interface IApprovalForm {
  is_active: boolean;
  memo: string;
}

function MemoModal(Props: UserRowProps) {
  const { closeModal, userId, accessToken, getAllUsers } = Props;
  const [memo, setMemo] = useState("");

  async function handleRejectButton() {
    let approvalForm: IApprovalForm = {
      is_active: true,
      memo: `${memo}`,
    };
    try {
      console.log(approvalForm);
      await fetch(`/users/activate/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(approvalForm),
      });
      await fetch(`/users/blacklist/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ blacklisted: true }),
      });
      getAllUsers();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          onClick={() => {
            closeModal();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="xl" />
        </button>
        <textarea
          className="modal__textarea"
          id="memo"
          value={memo}
          onChange={(e) => {
            setMemo(e.target.value);
          }}
        />
        <button onClick={handleRejectButton}>Submit</button>
      </div>
      <div
        onClick={() => {
          closeModal();
        }}
        className="modal__overlay"
      />
    </div>
  );
}

export default MemoModal;
