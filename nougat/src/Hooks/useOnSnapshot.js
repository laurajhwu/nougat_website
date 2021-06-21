import { useRef } from "react";
import { useDispatch } from "react-redux";

export default function useOnSnapshot(props) {
  const init = useRef(true);
  const dispatch = useDispatch();

  return (snapshot) => {
    if (init.current) {
      const result =
        props.type === "object"
          ? snapshot.docs.reduce(
              (obj, doc) => ({ ...obj, [doc.id]: doc.data() }),
              {}
            )
          : snapshot.docs.map((product) => product.data());
      props.getFunc && dispatch(props.getFunc(result));
      init.current = false;
    } else {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          props.addFunc &&
            dispatch(props.addFunc(change.doc.data(), change.doc));
        }
        if (change.type === "modified") {
          props.modifyFunc &&
            dispatch(props.modifyFunc(change.doc.data(), change.doc));
        }
        if (change.type === "removed") {
          props.removeFunc &&
            dispatch(props.removeFunc(change.doc.data(), change.doc));
        }
      });
    }
  };
}
