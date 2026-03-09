let state: any;

export const useStateCustom = (initialValue: any) => {
    state = state ?? initialValue;

    function useStateCustom(newValue: any) {
        state = newValue;
        render();
    }

  return [state, useStateCustom];
}
