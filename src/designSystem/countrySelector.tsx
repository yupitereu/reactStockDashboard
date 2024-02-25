import classNames from 'classnames';

import { CountryCode, CountryItem } from '../types/category';

export const CountrySelector = (props: SelectorItemProps) => {
  return (
    <div className={props.wrapClassName}>
      {props.items.map(item => (
        <button
          key={item.key}
          className={classNames(
            'bg-emerald-100',
            'h100',
            'px-2',
            'mx-1',
            'rounded',
            ...(props.itemClassNames ?? []),
            { grayscale: item.key !== props.selectedItemKey },
          )}
          onClick={() => props.onSelect(item.key)}>
          {item.name}
        </button>
      ))}
    </div>
  );
};

type SelectorItemProps = {
  items: CountryItem[];
  wrapClassName: string;
  itemClassNames?: classNames.ArgumentArray;
  selectedItemKey: string;
  onSelect: (key: CountryCode) => void;
};
