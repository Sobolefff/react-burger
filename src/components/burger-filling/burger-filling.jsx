import React, {useRef} from "react";
import { useDispatch } from "react-redux";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { UPDATE_ITEMS } from "../../services/actions";
import styles from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";

export default function BurgerFilling({ item, index, handleClose }) {
const dispatch = useDispatch();
const ref = useRef();
const [{ isDrag }, drag] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
        isDrag: monitor.isDragging(),
    }),
});
const [, drop] = useDrop({
    accept: "item",
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
    const dragIndex = item.index;
    const hoverIndex = index;
    if (dragIndex === hoverIndex) {
        return;
    }
    const elementPos = ref.current.getBoundingClientRect();
    const elementMiddle = (elementPos.bottom - elementPos.top) / 2;
    const userCursorOffset = monitor.getClientOffset().y - elementPos.top;
    if (dragIndex < hoverIndex && userCursorOffset < elementMiddle) {
        return;
    }
    if (dragIndex > hoverIndex && userCursorOffset > elementMiddle) {
        return;
    }
    dispatch({
        type: UPDATE_ITEMS,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
    });
    item.index = hoverIndex;
    },
});
const opacity = isDrag ? 0.5 : 1;
drag(drop(ref));

return (
    <li className={`${styles.item} pb-4 pr-2`} key={item._id} ref={ref} style={{ opacity }}>
        <div className='mr-2'><DragIcon type="primary" /></div>
        <ConstructorElement
            isLocked={false}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
            handleClose={() => handleClose()}
            index={index}
        />
    </li>
);
}