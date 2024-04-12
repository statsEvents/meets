import { useEffect } from "react";

const ModalClose = ({ modal, setModal, refButton, refModal, refButton2 }) => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal === true) {
      setModal((prev) => (prev = false));
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refModal.current &&
        !refModal.current.contains(event.target) &&
        refButton &&
        !refButton.current.contains(event.target) &&
        refButton2 &&
        !refButton2.current.contains(event.target)
      ) {
        setModal((prev) => (prev = false));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [refButton, refModal, setModal, refButton2]);
};

export default ModalClose;
