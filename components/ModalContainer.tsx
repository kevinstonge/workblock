import { NextPage } from "next";
import styles from "../styles/ModalContainer.module.scss";
const ModalContainer: NextPage = (props) => {
  return <div className={styles.modalContainer}>{props.children}</div>;
};
export default ModalContainer;
