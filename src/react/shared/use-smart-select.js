import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';
import { f7ready, f7 } from './f7';
import { extend } from './utils';

export const useSmartSelect = (smartSelect, smartSelectParams, f7SmartSelect, getEl) => {
  const onMount = () => {
    f7ready(() => {
      if (smartSelect) {
        const ssParams = extend({ el: getEl() }, smartSelectParams || {});
        f7SmartSelect.current = f7.smartSelect.create(ssParams);
      }
    });
  };
  const onDestroy = () => {
    if (f7SmartSelect.current && f7SmartSelect.current.destroy) {
      f7SmartSelect.current.destroy();
    }
    f7SmartSelect.current = null;
  };
  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  });
};
