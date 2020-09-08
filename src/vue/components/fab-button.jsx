import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  fabClose? : boolean;
  label? : string;
  target? : string;
  tooltip? : string;
  tooltipTrigger? : string;
  onClick? : (event?: any) => void;
  COLOR_PROPS
*/

const FabButton = forwardRef((props, ref) => {
  const { className, id, style, children, fabClose, label, target } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  const classes = classNames(
    className,
    {
      'fab-close': fabClose,
      'fab-label-button': label,
    },
    colorClasses(props),
  );

  let labelEl;
  if (label) {
    labelEl = <span className="fab-label">{label}</span>;
  }

  return (
    <a
      id={id}
      style={style}
      target={target}
      className={classes}
      ref={elRef}
      {...extraAttrs}
      onClick={onClick}
    >
      {children}
      {labelEl}
    </a>
  );
});

FabButton.displayName = 'f7-fab-button';

export default FabButton;
