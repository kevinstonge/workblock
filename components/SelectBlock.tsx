import { NextPage } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext } from 'react';
import { Block } from '../utils/types';
import { store } from '../state/store';
interface Props {
  setSelectBlockVisible: Function;
}
const SelectBlock: NextPage<Props> = (props: Props) => {
  const { setSelectBlockVisible } = props;
  useEffect(() => {
    window.addEventListener(
      'click',
      () => {
        setSelectBlockVisible(false);
      },
      false
    );
    return () =>
      window.removeEventListener(
        'click',
        () => {
          setSelectBlockVisible(false);
        },
        false
      );
  }, [setSelectBlockVisible]);

  const { blocks }: { blocks: Block[] } = useContext(store);
  return (
    <>
      <h3>
        <span>select block</span>
        <span>
          <FontAwesomeIcon
            icon={faX}
            className="e1 button-icon"
            onClick={() => setSelectBlockVisible(false)}
          />
        </span>
      </h3>
      <ul>
        {blocks.map((b) => (
          <li>{b.title}</li>
        ))}
      </ul>
    </>
  );
};
export default SelectBlock;
