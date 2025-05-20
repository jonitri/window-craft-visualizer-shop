
export interface WindowType {
  id: string;
  name: string;
  description: string;
  leafCount: number;
}

export interface OpeningDirection {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const windowTypes: WindowType[] = [
  {
    id: 'single-leaf',
    name: 'Single-Leaf Window',
    description: 'A classic window with one operable sash',
    leafCount: 1
  },
  {
    id: 'double-leaf',
    name: 'Double-Leaf Window',
    description: 'Window with two operable sashes side by side',
    leafCount: 2
  },
  {
    id: 'triple-leaf',
    name: 'Triple-Leaf Window',
    description: 'Window with three operable sashes',
    leafCount: 3
  },
  {
    id: 'fixed',
    name: 'Fixed Window',
    description: 'Non-operable window for light and views only',
    leafCount: 1
  }
];

export const openingDirections: OpeningDirection[] = [
  {
    id: 'left',
    name: 'Left Opening',
    icon: '←',
    description: 'Opens from the left side'
  },
  {
    id: 'right',
    name: 'Right Opening',
    icon: '→',
    description: 'Opens from the right side'
  },
  {
    id: 'top',
    name: 'Top Opening',
    icon: '↑',
    description: 'Opens from the top (awning)'
  },
  {
    id: 'top-left',
    name: 'Top and Left',
    icon: '↖',
    description: 'Can open from both the top and left'
  },
  {
    id: 'top-right',
    name: 'Top and Right',
    icon: '↗',
    description: 'Can open from both the top and right'
  }
];
