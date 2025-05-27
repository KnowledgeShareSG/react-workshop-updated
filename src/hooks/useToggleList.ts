import { useMemo, useReducer } from 'react';

interface ToggleListState { all: boolean, list: Record<string, boolean>};
type ToggleListAction =
  | {
      type: 'TOGGLE_ONE';
      symbol: string;
      value: boolean;
    }
  | {
      type: 'TOGGLE_ALL';
      value?: boolean;
    }
  | {
      type: 'UPDATE_SYMBOLS';
      symbols: Array<string>;
    };

function toggleListReducer (state: ToggleListState, action: ToggleListAction): ToggleListState {
  const newState = { ...state };

  if (action.type === 'TOGGLE_ONE') {
    newState.list[action.symbol] = action.value;
    newState.all =  Object.values(newState.list).every((value) => value);
  } else if (action.type === 'TOGGLE_ALL') {
    // new value to toggle all based on either action.value of the state of the list
    const newValueForToggleAll =
      action.value === true || action.value === false
        ? action.value
        : !Object.values(state).every((value) => value);

    Object.keys(newState.list).map((key) => {
      newState.list[key] = newValueForToggleAll;
    });
    newState.all = newValueForToggleAll;
  } else if (action.type === 'UPDATE_SYMBOLS') {
    newState.list = {};
    action.symbols.map((symbol) => {
      newState.list[symbol] = false;
    });
  } else {
    throw new Error('INVALID ACTION');
  }

  return JSON.parse(JSON.stringify(newState));
};

export function useToggleList(symbols: string[]) {
  // craft the initial state
  const symbolsAsList = useMemo<ToggleListState['list']>(() => {
    const output: ToggleListState['list'] = {};
    symbols.forEach(symbol => {output[symbol] = false})
    return output;
  }, [symbols]);

  const [state, dispatch] = useReducer(toggleListReducer, {all: false, list: symbolsAsList})

  const toggleAll = (toggleValue?: boolean) =>
    dispatch({ type: 'TOGGLE_ALL', value: toggleValue });
  const toggleOne = (symbol: string, toggleValue: boolean) =>
    dispatch({ type: 'TOGGLE_ONE', symbol, value: toggleValue });

  const updateSymbols = (symbols: Array<string>) =>
    dispatch({ type: 'UPDATE_SYMBOLS', symbols });

  const allSelected = state.all;
  const listOfSymbolToggles = state.list;

  return {
   toggleAll,
   toggleOne,
   updateSymbols,
   allSelected,
   listOfSymbolToggles,
  }
}

