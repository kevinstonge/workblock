import { NextPage } from "next";
interface Props {
    setDeleteConfirmationVisible: Function;
    blockID: string;
  }
const DeleteConfirmation : NextPage<Props> = (props: Props) => {
    return(
        <>
            <p>are you sure?</p>
            <span><button>yes</button><button>no</button></span>
        </>
    )
}
export default DeleteConfirmation;