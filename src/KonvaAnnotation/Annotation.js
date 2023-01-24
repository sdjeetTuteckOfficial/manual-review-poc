import React, { useEffect, useState } from "react";
import { Rect, Transformer, Group } from "react-konva";
import { Popover, Typography } from "@material-ui/core";
import Konva from "konva";

const Annotation = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onOpenPopover,
  onClick,
}) => {
  const shapeRef = React.useRef();
  const transformRef = React.useRef();
  const anchorRef = React.useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  // console.log("shape props", shapeProps.id);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      transformRef.current.setNode(shapeRef.current);
      transformRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  const onMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "move";
  };

  const onMouseLeave = (event) => {
    event.target.getStage().container().style.cursor = "crosshair";
  };

  return (
    <Group>
      <Rect
        fill="transparent"
        stroke="#C70039"
        onMouseDown={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        rotation={0}
        strokeWidth={1}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragEnd={(event) => {
          onChange(
            {
              ...shapeProps,
              x: event.target.x(),
              y: event.target.y(),
            },
            event
          );
          // onOpenPopover(event);
        }}
        onTransformEnd={(event) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange(
            {
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            },
            event
          );
          // onOpenPopover(event);
        }}
      />
      {isSelected && <Transformer ref={transformRef} rotateEnabled={false} />}
    </Group>
  );
};

export default Annotation;
