import React, { useRef, FC } from 'react';
import { useDispatch } from '../../services/store';
import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { UPDATE_ITEMS } from '../../services/actions';
import styles from '../burger-constructor/burger-constructor.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { TBurgerElementProps } from "../../utils/types";

export const BurgerFilling: FC<TBurgerElementProps> = (props: TBurgerElementProps) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null);
    const [{ isDrag }, drag] = useDrag({
        type: 'item',
        item: props.index,
        collect: (monitor) => ({
            isDrag: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: 'item',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = props.item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const elementPos = ref?.current?.getBoundingClientRect();
            const elementMiddle = (elementPos.bottom - elementPos.top) / 2;
            const userCursorOffset =
                monitor!.getClientOffset()!.y - elementPos.top;
            if (dragIndex! < hoverIndex && userCursorOffset < elementMiddle) {
                return;
            }
            if (dragIndex! > hoverIndex && userCursorOffset > elementMiddle) {
                return;
            }
            dispatch({
                type: UPDATE_ITEMS,
                fromIndex: dragIndex,
                toIndex: hoverIndex,
            });
            props.item.index = hoverIndex;
        },
    });
    const opacity = isDrag ? 0.5 : 1;
    drag(drop(ref));

    return (
        <li
            className={`${styles.item} pb-4 pr-2`}
            ref={ref}
            style={{ opacity }}
        >
            <div className="mr-2">
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={props.item.name}
                price={props.item.price}
                thumbnail={props.item.image}
                handleClose={() => props.handleClose(props.item)}
            />
        </li>
    );
}
